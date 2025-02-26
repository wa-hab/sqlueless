import { getUserDatabases, getDatabaseWorkflows } from "@/lib/hooks/data";
import { useSelectedDatabase } from "@/lib/state/selectedDatabase";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatabaseUploader } from "./-file-upload";
import { cn } from "@/lib/utils";

export function Sidebar({ className }: { className?: string }) {
  const userDatabaseQuery = getUserDatabases();
  const [selectedDatabaseId, setSelectedDatabaseId] = useSelectedDatabase();

  return (
    <div className={cn("flex gap-2", className)}>
      <ScrollArea className="w-96 bg-background border-4 border-black overflow-y-auto">
        <h2 className="text-xl font-bold mb-3 p-4">your databases</h2>
        <div className="px-4">
          <DatabaseUploader />
        </div>
        {userDatabaseQuery.isLoading ? (
          <div className="text-sm font-mono">loading databases...</div>
        ) : userDatabaseQuery.isError ? (
          <div className="text-sm text-red-900 font-mono">
            error loading databases.
          </div>
        ) : (
          <ul className="list-none p-4 mt-4 w-full">
            {userDatabaseQuery.data?.map((db: any) => (
              <li key={db.id} className="my-6">
                <button
                  className={`block w-full text-left group  `}
                  onClick={() => setSelectedDatabaseId(db.id)}
                >
                  <div
                    className={` w-full text-left bg-background text-foreground font-bold py-2 px-4 border-2 border-black group group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-r-4 group-hover:border-b-4 transition-all duration-100 group-active:translate-x-0 group-active:translate-y-0 ${
                      selectedDatabaseId === db.id
                        ? "bg-purple-300 hover:bg-purple-300"
                        : ""
                    }`}
                  >
                    {db.description}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
      {selectedDatabaseId ? <Workflows /> : null}
    </div>
  );
}

const Workflows = () => {
  const [selectedDatabaseId] = useSelectedDatabase();

  const workflowsQuery = getDatabaseWorkflows(selectedDatabaseId);
  console.log(workflowsQuery.data);
  if (workflowsQuery.isLoading) {
    return (
      <div className="w-96 bg-background border-4 border-black p-4">
        Loading workflows...
      </div>
    );
  }
  if (workflowsQuery.isError) {
    return (
      <div className="w-96 bg-background border-4 border-black p-4 text-red-900">
        Error loading workflows.
      </div>
    );
  }
  return (
    <ScrollArea className="w-96 bg-background border-4 border-black">
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">Workflows</h3>
        {workflowsQuery.data?.map((workflow) => (
          <div
            key={workflow.id}
            className="mb-2 p-2 border border-gray-300 rounded"
          >
            {workflow.naturalLanguageQuery}
          </div>
        ))}
        {workflowsQuery.data?.length === 0 && <div>No Workflows</div>}
      </div>
    </ScrollArea>
  );
};
