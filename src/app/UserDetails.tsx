import React, { useState, useEffect, useRef } from "react";

export default function UserDetails() {
  return (
    <div className="user-details-page page">
      <div className="left">
        <div className="bio">
          <div className="field">
            <p className="label">Id </p>
            <p className="value">s812345</p>
          </div>
          <div className="field">
            <p className="label">Name </p>
            <p className="value">John Doe</p>
          </div>
          <div className="field">
            <p className="label">Phone </p>
            <p className="value"> 1234567890 </p>
          </div>
          <div className="field">
            <div className="label">Pass </div>
            <div className="value"> ******** </div>
          </div>
          <div className="field">
            <p className="label">Level </p>
            <p className="value">Member</p>
          </div>
          <div className="field">
            <p className="label">Email </p>
            <p className="value"> @gmail.com </p>
          </div>
          <div className="field">
            <div className="label">Withdrawl UPI: </div>
            <div className="value"> example gpay </div>
          </div>
        </div>
        <div className="details">
          <div className="field">
            <div className="label">Balance </div>
            <div className="value"> 1000 </div>
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
            <div className="value"> 5 </div>
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
    </div>
  );
}
