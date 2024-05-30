import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import useData from "../hooks/useData";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token, setToken, manualPayments, setManualPayments } = useData();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(import.meta.env.VITE_SERVER);
    axios
      .post(`${import.meta.env.VITE_SERVER}/login`, { id, password })
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          setToken(res.data.token);
          setManualPayments(res.data.payments);
          navigate("/payments");
        }
      })
      .catch((err) => {})
      .finally(() => {});
  }
  return (
    <div className="login-page page">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="id"
          placeholder="Admin Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
