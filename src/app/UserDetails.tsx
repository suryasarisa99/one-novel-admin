import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import useData from "../hooks/useData";

export default function UserDetails() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const { user, setUser } = useData();

  return (
    <div className="user-details-page page">
      <div className="left">
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
          placeholder="Search by Id or Phone"
        />
        <button
          onClick={() => {
            axios
              .get(`${import.meta.env.VITE_SERVER}/user/${type}/${value}`)
              .then((res) => {
                console.log(res.data);
                console.log(res.data);
                setUser(res.data);
              });
          }}
        >
          submit
        </button>
        <p>{type}</p>
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
              {/* <div className="field">
            <p className="label">Level </p>
            <p className="value">Member</p>
          </div> */}
              <div className="field">
                <p className="label">Email </p>
                <p className="value"> {user.email} </p>
              </div>
              <div className="field">
                <div className="label">UPI: </div>
                <div className="value"> {user.upi}</div>
              </div>
            </div>
            <div className="details">
              <div className="field">
                <div className="label">Balance </div>
                <div className="value"> {user.balance} </div>
              </div>
              <div className="field">
                <div className="label">Withdrawn </div>
                <div className="value"> 500 </div>
              </div>
              <div className="field">
                <div className="label">Pending </div>
                <div className="value"> 500 </div>
              </div>
              <div className="field">
                <div className="label"> Referrals </div>
                <div className="value"> </div>
              </div>
              <div className="field">
                <div className="label">Valid ref </div>
                <div className="value"> 5 </div>
              </div>
              <div className="field">
                <div className="label">Total </div>
                <div className="value"> 2000 </div>
              </div>
            </div>
            <div className="sections">
              <div className="title">Parents</div>
              <div className="title">Referals</div>
              <div className="title">Transactions</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
