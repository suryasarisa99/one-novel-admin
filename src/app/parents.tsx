import React, { useState, useEffect, useRef } from "react";
import useData from "../hooks/useData";

export default function Parentspage() {
  const { user } = useData();
  if (!user) return null;
  return (
    <div className="parents-page page">
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
