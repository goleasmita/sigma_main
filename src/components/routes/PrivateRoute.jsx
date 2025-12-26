import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!auth?.token) {
        return <Spinner />; // wait for auth to load
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_AUTH_URL}/user-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setOk(Boolean(res.data?.ok));
      } catch (err) {
        console.error(
          "PrivateRoute: user auth check failed:",
          err?.response?.data || err.message
        );
        setOk(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spinner />;
}
