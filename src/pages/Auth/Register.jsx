import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = import.meta.env.VITE_API_AUTH_URL;

    try {
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        alert(res.data && res.data.message);
        navigate("/login");
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <div
        className="register d-flex flex-column justify-content-center align-items-center "
        style={{ height: "80vh" }}>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
              placeholder="enter your name"
            />
          </div>
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
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              placeholder="Phone Number"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              placeholder="Address"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              required
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              placeholder="What is your favourate color?"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
