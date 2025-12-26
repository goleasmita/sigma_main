import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = import.meta.env.VITE_API_AUTH_URL;

    try {
      const res = await axios.post(`${API_URL}/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        alert(res.data && res.data.message);
        //auth state

        navigate("/login");
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
        style={{ height: "80vh" }}>
        <h1>Reset Password</h1>
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
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your New Password"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              required
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              placeholder="What is your fav color"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
