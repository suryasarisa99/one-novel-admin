import React, { useState, useEffect, useRef } from "react";
import TransactionPopup from "./TransactionPopup";
import "../add-transactions.scss";
import TransactionItem from "./TransactionItem";
import { FaPlus, FaSave } from "react-icons/fa";
import useData from "../../hooks/useData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type TransactionType = {
  _id: string;
  status: string;
  transaction_type: string;
  amount: number;
  date: string;
  is_debit: boolean;
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [popup, setPopup] = useState(false);
  const { user, setUser, token } = useData();
  const [popupDetails, setPopupDetails] = useState<
    TransactionType | undefined
  >();
  const handleAddRef = useRef<(t: TransactionType) => void>((t) => {
    console.log("emtpy");
  });

  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/user");
  }, []);

  return (
    <div
      className="add-transactions page"
      style={{
        backdropFilter: popup ? "blur(10px)" : "none",
      }}
    >
      <div className="title">
        <h1>Transactions</h1>

        <div className="btns">
          {transactions.length > 0 && (
            <button
              onClick={() => {
                axios
                  .post(
                    `${import.meta.env.VITE_SERVER}/edit/transactions/${
                      user?._id
                    }`,
                    {
                      transactions,
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
              }}
            >
              <FaSave />
            </button>
          )}
          <button
            onClick={() => {
              setEditMode(false);
              setPopupDetails(undefined);
              setPopup(true);
              handleAddRef.current = (t: TransactionType) => {
                setTransactions((prv) => [...prv, t]);
              };
            }}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="transactions">
        {user?.transactions.map((t, i) => (
          <TransactionItem
            key={"x" + i}
            t={t}
            onClick={() => {
              setEditMode(true);
              setPopupDetails({ ...t });
              handleAddRef.current = (x) => {
                const newTransactions = [...user.transactions];
                newTransactions[i] = x;
                setUser({ ...user, transactions: newTransactions });
                axios
                  .put(
                    `${import.meta.env.VITE_SERVER}/edit/transaction/${
                      user._id
                    }`,
                    {
                      status: x.status,
                      type: x.transaction_type,
                      is_debit: x.is_debit,
                      amount: x.amount,
                      tid: t._id,
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
              };
              setPopup(true);
            }}
          />
        ))}
        {transactions.map((t, i) => (
          <TransactionItem key={i} t={t} onClick={() => {}} />
        ))}
      </div>

      <TransactionPopup
        show={popup}
        setPopup={setPopup}
        setTransactions={setTransactions}
        handleAdd={handleAddRef.current}
        editMode={editMode}
        editDetails={editMode ? popupDetails : undefined}
      />
    </div>
  );
}
