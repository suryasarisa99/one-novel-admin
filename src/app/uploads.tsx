import React, { useState, useEffect, useRef } from "react";
import { UploadType } from "../context/Data/DataContextTypes";
import useData from "../hooks/useData";
import axios from "axios";

export default function UploadsPage() {
  const { uploads, setUploads, token } = useData();

  function hadnle(status: string, money: number, id: string, userId: string) {
    console.log("hello");
    console.log(status, money, id, userId);
    axios
      .post(
        `${import.meta.env.VITE_SERVER}/confirm-upload/${userId}`,
        {
          status,
          amount: money,
          id,
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
  // const [uploads, setUploads] = useState<UploadType[]>([
  //   {
  //     _id: "1",
  //     userId: "u1fdafdfd",
  //     userName: "Jaya Surya",
  //     url: "https://google.com",
  //     status: "pending",
  //   },
  //   {
  //     _id: "2",
  //     userId: "u2fjdfagdf",
  //     userName: "Jaya Surya",
  //     url: "https://google.com",
  //     status: "pending",
  //   },
  //   {
  //     _id: "1",
  //     userId: "hj3ahf32",
  //     userName: "Someone Surya",
  //     url: "https://google.com",
  //     status: "pending",
  //   },
  // ]);
  return (
    <div className="transactions-page uploads-page page">
      <h1>Uploads</h1>
      <div className="transactions">
        {uploads.map((u, i) => (
          <div className="upload-item" key={i}>
            <p>{u.userName}</p>
            <p>{u.userId}</p>
            <div className="btns">
              <button
                onClick={() => {
                  open(u.url, "_blank");
                }}
              >
                Open
              </button>
              <button
                onClick={() => {
                  hadnle("rejected", 0, u._id, u.userId);
                }}
              >
                Reject
              </button>
              <button
                onClick={() => {
                  const x = window.prompt("Enter Money");
                  if (!x) return;
                  const amount = parseInt(x);
                  if (isNaN(amount)) return;
                  hadnle("accepted", amount, u._id, u.userId);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
