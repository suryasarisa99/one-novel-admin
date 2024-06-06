import React, { useState, useEffect, useRef } from "react";
import useData from "../hooks/useData";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate, useNavigation } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function WithdrawlsPage() {
  const { manualPayments, setManualPayments, withDrawls, token } = useData();
  const [openPayment, setOpenPayment] = useState<string | null>(null);
  console.log(manualPayments, token);
  //   const navigator = useNavigation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortOn, setSortOn] = useState("name");

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

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
      <h1>Withdrawls</h1>
      <SearchBar
        value={search}
        onChange={(value) => setSearch(value)}
        onClear={() => setSearch("")}
        // options={["Amount Desc", "Amount Asc", "name", "userId", "number"]}
        options={["name", "userId"]}
        sortOn={sortOn}
        setSortOn={setSortOn}
      />
      <div className="transactions">
        {withDrawls
          .filter((p) => {
            const searchStr = search.toLowerCase();
            if (sortOn == "name") {
              return p.userName.toLowerCase().includes(searchStr);
            } else if (sortOn == "userId") {
              return p.userId.toLowerCase().includes(searchStr);
            } else return true;
          })
          .map((payment) => {
            return (
              <div>
                <div
                  className="withdrawl-item"
                  key={payment._id}
                  onClick={() => {
                    // n("/");
                    navigate(
                      "/qrcode?userId=" +
                        payment.userId +
                        "&amount=" +
                        payment.amount +
                        "&userName=" +
                        payment.userName +
                        "&date=" +
                        payment.date +
                        "&status=" +
                        payment.status +
                        "&withdrawlId=" +
                        payment._id +
                        "&type=" +
                        payment.type +
                        "&upi=" +
                        payment.upi
                    );
                  }}
                >
                  <div className="left">
                    <p>{payment.userName}</p>
                    <p className="id">{payment.userId}</p>
                  </div>
                  <div className="right">
                    <span className="type">
                      {payment.type == 1 ? "upi" : "bank"}
                    </span>
                    <span className="amount">{payment.amount}</span>
                    {/* <FaChevronDown
                      size={22}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (openPayment === payment._id) {
                          setOpenPayment(null);
                        } else {
                          setOpenPayment(payment._id);
                        }
                      }}
                    /> */}
                  </div>
                </div>
                {/* 
                {openPayment === payment._id && (
                  <div>
                    <p>{payment.userId}</p>
                  </div>
                )} */}
              </div>
            );
          })}
      </div>
    </div>
  );
}
