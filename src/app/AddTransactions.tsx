import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./add-transactions.scss";
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

  return (
    <div className="add-transactions page">
      <div className="add-transaction-item">
        <span>Type</span>
        <div className="switch">
          <span className="switch-item" onClick={() => setType("Withdrawl")}>
            Withdrawl
          </span>
          <span
            onClick={() => setType("Referal Bonus")}
            className="switch-item"
          >
            Referal Bonu
          </span>
        </div>
      </div>

      <div className="add-transaction-item">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.valueAsNumber)}
        />
      </div>
      <div className="add-transaction-item">
        <input
          type="date"
          value={date.toISOString()}
          onChange={(e) => {
            if (e.target.valueAsDate) setDate(e.target.valueAsDate);
          }}
        />
      </div>
    </div>
  );
}
