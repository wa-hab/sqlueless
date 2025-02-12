import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { queryConfigUser } from "@/lib/hooks/user";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  loader: async ({ context }) =>
    await context.queryClient.prefetchQuery(queryConfigUser),
});

function RouteComponent() {
  const navigate = useNavigate();
  const userQuery = useQuery(queryConfigUser);

  useEffect(() => {
    if (!userQuery.isPending && !userQuery.data?.id) {
      navigate({ to: "/auth" });
    }
  }, [userQuery.isPending, userQuery.data?.id, navigate]);

  if (userQuery.isLoading) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-sm text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8">
      <div className="max-w-screen-lg mx-auto">
        <div className="mb-12">
          <div className="text-xs text-gray-500 mb-1">welcome back</div>
          <div className="text-lg">{userQuery.data?.name}</div>
        </div>
      </div>
    </div>
  );
}
