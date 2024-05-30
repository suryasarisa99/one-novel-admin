import React, { useState, useEffect, useRef } from "react";
import useData from "../hooks/useData";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";

export default function Payments() {
  const { manualPayments, setManualPayments, token } = useData();
  const [openPayment, setOpenPayment] = useState<string | null>(null);

  function confirmPayment(id: string, status: string) {
    axios
      .get(
        import.meta.env.VITE_SERVER + `/confirm-m-pay/${id}/?status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {});
  }

  return (
    <div className="transactions-page page">
      <h1>Payments</h1>
      <div className="transactions">
        {manualPayments.map((payment) => {
          return (
            <div key={payment._id} className="transaction">
              <div className="top">
                <p>{payment.userId}</p>
                <FaChevronDown
                  size={22}
                  onClick={() => {
                    if (openPayment === payment._id) {
                      setOpenPayment(null);
                    } else {
                      setOpenPayment(payment._id);
                    }
                  }}
                />
              </div>
              {openPayment === payment._id && (
                <div className="bottom">
                  <p>{payment.date.toString()}</p>
                  <div className="btns">
                    <button
                      onClick={() => {
                        confirmPayment(payment._id, "rejected");
                      }}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        confirmPayment(payment._id, "accepted");
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
