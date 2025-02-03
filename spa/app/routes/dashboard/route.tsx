import { useUser } from "~/lib/hooks/user";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const userQuery = useUser(navigate);

  useEffect(() => {
    if (!userQuery.isPending && !userQuery.data?.id) {
      navigate("/auth");
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
