import { Link, useNavigate, useLocation } from "@remix-run/react";
import { useLogout, useUser } from "~/lib/hooks/user";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userQuery = useUser(navigate);
  const logoutMutation = useLogout(navigate);

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="bg-white flex items-center justify-center top-4 w-full z-50 min-h-[10vh] ">
      <div className="max-w-screen-lg w-full mx-auto px-8">
        <div className="border-2 border-black bg-white flex items-center justify-between h-14">
          <Link
            to="/"
            className="font-bold text-sm tracking-tight px-4 hover:-rotate-2 transition-transform"
          >
            PROJECT NAME
          </Link>

          <div className="flex items-center font-mono text-sm border-l-2 border-black">
            <Link
              to="/public"
              className={`px-4 h-full flex items-center border-r-2 border-black hover:bg-yellow-100 transition-colors ${
                location.pathname === "/goods" ? "bg-yellow-50" : ""
              }`}
            >
              browse
            </Link>

            {!userQuery.data?.id ? (
              <Link
                to="/auth"
                className={`px-4 h-full flex items-center hover:bg-black hover:text-white transition-colors ${
                  location.pathname === "/auth" ? "bg-black text-white" : ""
                }`}
              >
                login
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`px-4 h-full flex items-center border-r-2 border-black hover:bg-yellow-100 transition-colors ${
                    location.pathname === "/dashboard" ? "bg-yellow-50" : ""
                  }`}
                >
                  dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-4 h-full flex items-center hover:bg-black hover:text-white transition-colors"
                >
                  logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
