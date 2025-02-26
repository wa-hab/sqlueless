import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { queryConfigUser } from "@/lib/hooks/user";
import { useEffect } from "react";
import { useUploadDatabase } from "@/lib/hooks/data";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "./-sidebar";
import { DatabaseView } from "./-database-view";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  loader: async ({ context }) =>
    await context.queryClient.prefetchQuery(queryConfigUser),
});

function RouteComponent() {
  const navigate = useNavigate();
  const userQuery = useQuery(queryConfigUser);
  const { isPending, isError, data } = useUploadDatabase();

  useEffect(() => {
    if (!userQuery.isPending && !userQuery.data?.id) {
      navigate({ to: "/auth" });
    }
  }, [userQuery.isPending, userQuery.data?.id, navigate]);

  if (userQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-lg text-gray-900 uppercase tracking-wider">
          loading...
        </div>
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-lg text-gray-900 uppercase tracking-wider">
          uploading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex grow justify-around bg-yellow-300 items-center gap-6 w-full px-10">
      <Sidebar className="h-[96vh] max-w-2xl" />
      <div className="grow">
        {data && (
          <div className="bg-green-100 text-green-900 px-4 py-3 mb-4 border-2 border-green-900">
            upload successful
          </div>
        )}
        {isError && (
          <div className="bg-red-100 text-red-900 px-4 py-3 mb-4 border-2 border-red-900">
            upload error
          </div>
        )}
        {isPending && (
          <div className="bg-yellow-100 text-yellow-900 px-4 py-3 mb-4 border-2 border-yellow-900">
            upload pending...
          </div>
        )}

        <DatabaseView />
      </div>
    </div>
  );
}
