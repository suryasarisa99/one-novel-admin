import React, { useState, useEffect, useRef } from "react";
import useData from "../hooks/useData";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
export default function Payments() {
  const { manualPayments, setManualPayments, token } = useData();
  const [openPayment, setOpenPayment] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortOn, setSortOn] = useState("utr");
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
        <SearchBar
          value={search}
          onChange={(value) => setSearch(value)}
          onClear={() => setSearch("")}
          options={["utr", "name", "userId", "number"]}
          sortOn={sortOn}
          setSortOn={setSortOn}
        />
        {manualPayments
          .filter((p) => {
            if (sortOn == "utr") return p._id.startsWith(search);
            else if (sortOn == "name")
              return p.userName.toLowerCase().includes(search.toLowerCase());
            else if (sortOn == "userId") return p.userId.includes(search);
            else if (sortOn == "number") return p.number.includes(search);
          })
          .map((payment) => {
            return (
              <div key={payment._id} className="transaction">
                <div className="top">
                  <p>
                    {{
                      utr: payment._id,
                      name: payment.userName,
                      userId: payment.userId,
                      number: payment.number,
                    }[sortOn] || "utr"}
                  </p>
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
                    {sortOn != "name" && (
                      <p className="name">{payment.userName}</p>
                    )}
                    {sortOn != "number" && (
                      <p className="number">{payment.number}</p>
                    )}
                    {sortOn != "userId" && (
                      <p className="userId">{payment.userId}</p>
                    )}
                    {sortOn != "utr" && <p className="utr">{payment._id}</p>}

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
