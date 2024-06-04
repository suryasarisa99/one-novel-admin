import React, { useState, useEffect, useRef } from "react";
import useData from "../hooks/useData";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Parentspage() {
  const { user } = useData();
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <div className="parents-page page">
      <div className="title-with-btns">
        <div className="icon" onClick={() => navigate("/user")}>
          <FaChevronLeft />
        </div>
        <h1>Parents</h1>
        <div className="icon"></div>
      </div>
      <div className="parents">
        {user.parents.map((p) => (
          <div className="parent-item" key={p}>
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
