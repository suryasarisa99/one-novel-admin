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
    console.log("token is added, ", token);
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
      <div className="transactions">
        <SearchBar
          value={search}
          onChange={(value) => setSearch(value)}
          onClear={() => setSearch("")}
          options={["Amount Desc", "Amount Asc", "name", "userId", "number"]}
          sortOn={sortOn}
          setSortOn={setSortOn}
        />
        {withDrawls
          .filter((p) => {
            if (sortOn == "name") {
              return p.userName.toLowerCase().includes(search.toLowerCase());
            } else if (sortOn == "userId") {
              return p.userId.includes(search);
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
                        payment.type
                    );
                  }}
                >
                  <p>{payment.userName}</p>
                  <div className="right">
                    <p>{payment.amount}</p>
                    <FaChevronDown
                      size={22}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (openPayment === payment._id) {
                          setOpenPayment(null);
                        } else {
                          setOpenPayment(payment._id);
                        }
                      }}
                    />
                  </div>
                </div>

                {openPayment === payment._id && (
                  <div>
                    <p>{payment.userId}</p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
