import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = import.meta.env.VITE_API_AUTH_URL;

    try {
      const res = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true } // ✅ important for CORS + cookies
      );
      if (res && res.data.success) {
        alert(res.data && res.data.message);
        //auth state
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Somethong went wrong");
    }
  };

  return (
    <div>
      <div
        className="register d-flex flex-column justify-content-center align-items-center "
        style={{ height: "88vh" }}>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={() => navigate("/forgot-password")}>
              FORGOT PASSWORD
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
