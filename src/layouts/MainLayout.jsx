import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Sidebar } from "../components/widgets/Sidebar";
import { Header } from "../components/widgets/Header";

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { auth, isLoading } = useAuth();

  if (isLoading) return <p>Cargando...</p>;

  return (
    <>
      {auth._id ? (
        <div className="min-h-screen flex">
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div className="flex-1">
            <Header setShowSidebar={setShowSidebar} />
            <main className="h-[92vh] p-5 lg:p-8 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};

export default MainLayout;
