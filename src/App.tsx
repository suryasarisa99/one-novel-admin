import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./app/Home";
import NavBar from "./components/NavBar";
import UserDetails from "./app/UserDetails";
import AdminLogin from "./app/Login";
import QrCodePage from "./app/QrCodePage";
import Payments from "./app/Payments";
import WithdrawlsPage from "./app/Withdrawls";
import AddTransactions from "./app/AddTransactions";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/user" element={<UserDetails />} />
        <Route path="/" element={<AdminLogin />} />
        <Route path="/qrcode" element={<QrCodePage />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/withdrawls" element={<WithdrawlsPage />} />
        <Route path="/add-transactions" element={<AddTransactions />} />
      </Routes>
      {location.pathname !== "/" && <NavBar />}
    </div>
  );
}
