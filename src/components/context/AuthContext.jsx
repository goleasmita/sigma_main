import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ user: null, token: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsed = JSON.parse(data);
      setAuth(parsed);
      axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
    }
    setLoading(false); // auth state is ready
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
