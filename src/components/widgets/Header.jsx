import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// eslint-disable-next-line react/prop-types
export const Header = ({ setShowSidebar }) => {
  const { auth } = useAuth();

  return (
    <header className="h-[8vh] flex items-center justify-between px-5 lg:px-8">
      <section>
        <button onClick={() => setShowSidebar(true)} className="lg:hidden">
          <i className="fi fi-rr-apps"></i>
        </button>
      </section>
      <nav>
        <ul>
          <li>
            <Link to="/profile" className="flex items-center gap-4">
              {auth.avatar.url !== "" ? (
                <img
                  src={auth.avatar.url}
                  alt={auth.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <span className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full font-bold">
                  {auth.name.charAt(0)}
                  {auth.lastName.charAt(0)}
                </span>
              )}
              <div>
                <h5 className="font-bold">
                  {auth.name}
                  {` `}
                  {auth.lastName}
                </h5>
                <p className="text-sm text-gray-500">{auth.email}</p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
