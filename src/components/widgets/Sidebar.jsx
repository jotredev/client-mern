import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { cn } from "../../lib/Utils";

// eslint-disable-next-line react/prop-types
export const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { pathname } = useLocation();

  const { logout } = useAuth();

  return (
    <>
      <aside
        className={cn(
          "bg-gray-100 fixed z-50 h-full lg:h-auto lg:left-0 top-0 lg:static w-64 flex flex-col justify-between p-5 transition-all duration-300 ease-in-out",
          showSidebar ? "left-0" : "-left-full"
        )}
      >
        <section>
          <div className="text-center mb-10">
            <Link to="/" className="font-medium text-2xl">
              HelpDesk
            </Link>
          </div>
          <nav>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className={cn(
                    "flex items-center gap-4 hover:bg-white py-3 px-4 rounded-md transition-colors",
                    pathname === "/" && "bg-white font-medium"
                  )}
                >
                  {pathname === "/" ? (
                    <i className="fi fi-sr-chart-pie-alt"></i>
                  ) : (
                    <i className="fi fi-rr-chart-pie-alt"></i>
                  )}
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tickets"
                  className={cn(
                    "flex items-center gap-4 hover:bg-white py-3 px-4 rounded-md transition-colors",
                    pathname.startsWith("/tickets") && "bg-white font-medium"
                  )}
                >
                  {pathname.startsWith("/tickets") ? (
                    <i className="fi fi-sr-ticket"></i>
                  ) : (
                    <i className="fi fi-rr-ticket"></i>
                  )}
                  <span>Tickets</span>
                </Link>
              </li>
            </ul>
          </nav>
        </section>
        <section>
          <ul>
            <li>
              <button
                onClick={() => logout()}
                className="w-full flex items-center justify-center gap-4 hover:bg-gray-200 transition-colors duration-300 py-3 px-4 rounded-md"
              >
                <i className="fi fi-rr-exit mt-1"></i>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </section>
      </aside>
      <div
        role="button"
        onClick={() => setShowSidebar(false)}
        className={cn(
          "fixed z-40 left-0 top-0 w-full h-full bg-black/50",
          showSidebar ? "block" : "hidden"
        )}
      />
    </>
  );
};
