import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useLogout, queryConfigUser } from "@/lib/hooks/user";
import { useQuery } from "@tanstack/react-query";
import { Home, LogIn, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userQuery = useQuery(queryConfigUser);
  const logoutMutation = useLogout(navigate);

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="bg-white w-20 flex flex-col h-screen border-r-2 border-black">
      <div className="p-4">
        <Link
          to="/"
          className="font-bold text-sm tracking-tight hover:-rotate-2 transition-transform block"
        >
          SQLueless
        </Link>
      </div>

      <div className="flex flex-col items-start">
        <IconWithTooltip
          icon={<Home />}
          tooltip="Home"
          href={userQuery.data?.id ? "/dashboard" : "/"}
        />

        {!userQuery.data?.id ? (
          <IconWithTooltip
            icon={<LogIn />}
            tooltip="Login"
            href="/auth"
            extraClasses={location.pathname === "/auth" ? "bg-yellow-50" : ""}
          />
        ) : (
          <button
            onClick={logout}
            className="hover:bg-yellow-100 transition-colors rounded-md"
          >
            <IconWithTooltip icon={<LogOut />} tooltip="Logout" />
          </button>
        )}
      </div>
    </nav>
  );
}

// helper function, CAPITALIZED bc it returns a component. a "hook" if you will
const IconWithTooltip = ({
  icon,
  tooltip,
  href,
  extraClasses,
}: {
  icon: React.ReactNode;
  tooltip: string;
  href?: string;
  extraClasses?: string;
}) => {
  const baseClasses = `p-4 hover:bg-yellow-100 transition-colors rounded-md ${extraClasses}`;
  return (
    <div className="group relative flex items-center">
      {href ? (
        <Link to={href} className={baseClasses}>
          {icon}
        </Link>
      ) : (
        <div className={baseClasses}>{icon}</div>
      )}

      {/* tooltip. "group-hover" is the IMPORTANT part */}
      <span className="absolute left-14 top-1/2 -translate-y-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-gray-100 group-hover:scale-100">
        {tooltip}
      </span>
    </div>
  );
};
