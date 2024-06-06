import axios from "axios";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import useData from "../hooks/useData";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const { user, setUser, token, setToken } = useData();
  const [type, setType] = useState(user?._id ? "_id" : "");
  const [value, setValue] = useState(user?._id || "");

  const navigate = useNavigate();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .get(`${import.meta.env.VITE_SERVER}/user/${type}/${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data);
        setUser(res.data);
      });
  };

  return (
    <div className="user-details-page page">
      <div className="left">
        <form action="">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              if (/^[0-9]+$/.test(e.target.value)) {
                setType("number");
              } else if (e.target.value.includes("@")) {
                setType("email");
              } else if (/^[\w\W]+$/.test(e.target.value)) {
                setType("_id");
              } else {
                setType("");
              }
              setValue(e.target.value);
            }}
            placeholder="Id / Phone / Email"
          />
          <button onClick={onSubmit}>submit</button>
        </form>
        {user && (
          <div>
            <div className="bio">
              <div className="field">
                <p className="label">Id </p>
                <p className="value">{user._id}</p>
              </div>
              <div className="field">
                <p className="label">Name </p>
                <p className="value">{user.name}</p>
              </div>
              <div className="field">
                <p className="label">Phone </p>
                <p className="value"> {user.number} </p>
              </div>
              <div className="field">
                <div className="label">Pass </div>
                <div className="value"> {user.password} </div>
              </div>
              <div className="field">
                <p className="label">Email </p>
                <p className="value"> {user.email} </p>
              </div>
              <div className="field">
                <div className="label">UPI </div>
                <div className="value"> {user.upi}</div>
              </div>
              <div className="field">
                <div className="label">Pos </div>
                <div className="value"> {user.level}</div>
              </div>
            </div>
            <div className="details">
              <div className="field">
                <div className="label">Balance </div>
                <div className="value">₹ {user.balance} </div>
              </div>
              <div className="field">
                <div className="label">Withdrawn </div>
                <div className="value">
                  ₹{" "}
                  {user.transactions
                    .filter(
                      (t) =>
                        t.transaction_type == "withdrawl" &&
                        t.status == "accepted"
                    )
                    .reduce((acc, t) => acc + t.amount, 0)}
                </div>
              </div>
              <div className="field">
                <div className="label">Pending </div>
                <div className="value">
                  ₹{" "}
                  {user.transactions
                    .filter(
                      (t) =>
                        t.transaction_type == "withdrawl" &&
                        t.status == "pending"
                    )
                    .reduce((acc, t) => acc + t.amount, 0)}
                </div>
              </div>
              <div className="field">
                <div className="label"> Referrals </div>
                <div className="value">{user.children.level1.length}</div>
              </div>
              <div className="field">
                <div className="label">Valid ref </div>
                <div className="value">
                  {user.children.level1.filter((c) => c.valid).length}
                </div>
              </div>
              <div className="field">
                <div className="label">Gift Price </div>
                <div className="value">
                  ₹{" "}
                  {user.transactions
                    .filter((t) => t.transaction_type == "Gift")
                    .reduce((acc, t) => acc + t.amount, 0)}
                </div>
              </div>
            </div>
            <div className="sections">
              <div
                className="section"
                onClick={() => {
                  navigate("/parents");
                }}
              >
                <div className="title">Parents</div>
                <div className="icon">
                  <FaChevronRight />
                </div>
              </div>
              <div className="section" onClick={() => navigate("/referals")}>
                <div className="title">Referals</div>
                <div className="icon">
                  <FaChevronRight />
                </div>
              </div>
              <div
                className="section"
                onClick={() => {
                  navigate("/transactions");
                }}
              >
                <div className="title">Transactions</div>
                <div className="icon">
                  <FaChevronRight />
                </div>
              </div>
              <div
                className="section"
                onClick={() => navigate("/profile-uploads")}
              >
                <div className="title">Uploads</div>
                <div className="icon">
                  <FaChevronRight />
                </div>
              </div>
              <div
                className="section"
                onClick={() => {
                  navigate("/edit");
                }}
              >
                <div className="title">Edit</div>
                <div className="icon">
                  <FaChevronRight />
                </div>
              </div>
              <div
                className="section"
                onClick={() => {
                  localStorage.removeItem("token");
                  setToken("");
                  setUser(null);
                  navigate("/");
                }}
              >
                <div className="title">Signout</div>
                <div className="icon">
                  <FaChevronRight />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
