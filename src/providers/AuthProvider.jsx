import { createContext, useEffect, useState } from "react";
import api from "../lib/Axios";
import { toast } from "sonner";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token-MERN");

      if (!token) {
        setIsLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await api.get("/users/session/session-user", config);
        setAuth(data);
      } catch (error) {
        setAuth({});
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Upload avatar
  const uploadAvatar = async ({ id, file }) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token-MERN");

      if (!token) {
        return;
      }

      const form = new FormData();
      form.append("image", file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.post(
        `/users/upload-avatar/${id}`,
        form,
        config
      );

      setAuth({ ...auth, avatar: data.avatar });
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuth({});
    localStorage.removeItem("token-MERN");
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isLoading, setIsLoading, logout, uploadAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
