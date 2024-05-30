import React, { useState, useEffect, useRef } from "react";
import useData from "../hooks/useData";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate, useNavigation } from "react-router-dom";

export default function WithdrawlsPage() {
  const { manualPayments, setManualPayments, withDrawls, token } = useData();
  const [openPayment, setOpenPayment] = useState<string | null>(null);
  console.log(manualPayments, token);
  //   const navigator = useNavigation();
  const navigate = useNavigate();

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
        {withDrawls.map((payment) => {
          return (
            <div
              key={payment._id}
              className="withdrawl-item"
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
                <FaChevronRight size={22} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
