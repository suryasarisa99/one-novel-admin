import React, { useState, useEffect, useRef } from "react";
import qrcode from "qrcode";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import useData from "../hooks/useData";
export default function QrCodePage() {
  const [Qr, setQr] = useState("");
  const [searchParams] = useSearchParams();
  const { token } = useData();
  const [message, setMessage] = useState("");

  const userId = searchParams.get("userId");
  const amount = searchParams.get("amount");
  const userName = searchParams.get("userName");
  const date = searchParams.get("date");
  const type = parseInt(searchParams.get("type") ?? "");
  const upi = searchParams.get("upi");
  const withdrawlId = searchParams.get("withdrawlId");
  const bank = searchParams.get("bank");

  console.log(userId, amount, userName, date, type);

  useEffect(() => {
    if (type == 1) {
      qrcode.toDataURL(
        // `upi://pay?pa=${upi}&pn=${userName}&mc=0000&tid=123456&tr=123456&tn=Payment&am=${amount}&cu=INR&url=https://example.com`,
        `upi://pay?pa=${upi}&pn=YourName&am=${amount}&cu=INR`,
        (err, url) => {
          if (err) {
            console.error(err);
          }
          setQr(url);
        }
      );
    }
  }, [type, userId, amount, userName, date]);

  function handleSubmit(status: string) {
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/confirm-withdrawl/${withdrawlId}`,
        {
          status,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <div className="qrcode-page page">
      <p className="amount">{amount}</p>
      <h3>QR Code </h3>
      {type == 1 && Qr && <img src={Qr} className="qrcode" alt="QR Code" />}
      <div className="btns">
        <button
          onClick={() => {
            handleSubmit("rejected");
          }}
        >
          Invalid Upi ID
        </button>
        <button
          onClick={() => {
            handleSubmit("accepted");
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
