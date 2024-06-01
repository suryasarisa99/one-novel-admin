import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useData from "../hooks/useData";
type TransactionType = {
  transaction_id: string;
  status: string;
  transaction_type: string;
  amount: number;
  date: string;
};

export default function AddTransactions() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [type, setType] = useState("Withdrawl");
  const [amount, setAmount] = useState(1000);
  const [status, setStatus] = useState("accepted");
  const [date, setDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="add-transactions page">
      {transactions.map((t) => {
        return (
          <div className="transaction-item">
            <div className="transaction-id">{t.transaction_id}</div>
            <div className="status">{t.status}</div>
            <div className="transaction-type">{t.transaction_type}</div>
            <div className="amount">{t.amount}</div>
            <div className="date">{t.date}</div>
          </div>
        );
      })}
    </div>
  );
}
