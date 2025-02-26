import { getQueryStatus } from "@/lib/hooks/data";
import { useQueryClient } from "@tanstack/react-query";
import { useGenerateSQL } from "@/lib/hooks/ai";
import { useSelectedDatabase } from "@/lib/state/selectedDatabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  nlQuery: z.string().min(2, {
    message: "Query must be at least 2 characters.",
  }),
});

export function DatabaseView() {
  const [selectedDatabaseId] = useSelectedDatabase();
  const getQueryStatusMutation = getQueryStatus();
  const generateSQLMutation = useGenerateSQL();
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<
    { type: "user" | "assistant"; content: string }[]
  >([]);

  const selectedDatabase = queryClient
    .getQueryData<any>(["userDatabases"])
    ?.find((db: any) => db.id === selectedDatabaseId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nlQuery: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setMessages((prev) => [...prev, { type: "user", content: values.nlQuery }]);
    generateSQLMutation.mutate(
      {
        id: selectedDatabase?.id,
        query: values.nlQuery,
      },
      {
        onSuccess: (data) => {
          setMessages((prev) => [
            ...prev,
            { type: "assistant", content: data?.sql },
          ]);
          getQueryStatusMutation.mutate(data.workflowId);
        },
      },
    );
  }
  if (!selectedDatabaseId || !selectedDatabase) {
    return (
      <div className="p-6 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center h-48">
        <h2 className="text-xl font-semibold text-gray-500 mb-2">
          No Database Selected
        </h2>
        <p className="text-gray-400 text-sm">
          Please select a database from the sidebar to view details and generate
          SQL queries.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background border-4 border-black h-[96vh] flex flex-col">
      <h2 className="text-lg font-mono p-6">
        <span className="font-bold">{selectedDatabase.description}</span>
      </h2>
      <ScrollArea className="flex-grow px-4 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-4 border-2 border-black rounded-none ${
              message.type === "user"
                ? "bg-white text-black ml-auto w-fit border-r-4 border-b-4"
                : "bg-zinc-200 text-black mr-auto w-fit border-l-4 border-b-4"
            }`}
          >
            {message.content}
          </div>
        ))}
      </ScrollArea>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 items-end px-6 pb-4"
        >
          <FormField
            control={form.control}
            name="nlQuery"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormMessage className="p-2" />

                <FormControl>
                  <Input
                    placeholder="ask a question about your data"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full p-2 basis-1/4"
            disabled={
              generateSQLMutation.isPending || form.watch("nlQuery") === ""
            }
          >
            {generateSQLMutation.isPending ? "Generating..." : "generate sql"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
