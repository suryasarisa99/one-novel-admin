import React, { useState, useEffect, useRef, useCallback } from "react";
import TransactionPopup from "./TransactionPopup";
import "../add-transactions.scss";
import TransactionItem from "./TransactionItem";
import { FaPlus, FaSave } from "react-icons/fa";
import useData from "../../hooks/useData";

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
  const { user, setUser } = useData();
  const [popupDetails, setPopupDetails] = useState<
    TransactionType | undefined
  >();
  const handleAddRef = useRef<(t: TransactionType) => void>((t) => {
    console.log("emtpy");
  });

  const [editMode, setEditMode] = useState(false);
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
            <button onClick={() => setPopup(!popup)}>
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
