import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { TransactionType } from "./Transactions";

type Props = {
  show: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setTransactions: React.Dispatch<React.SetStateAction<TransactionType[]>>;
  editMode?: boolean;
  editDetails?: TransactionType;
  handleAdd: (transaction: TransactionType) => void;
};

export default function TransactionPopup({
  show,
  setPopup,
  setTransactions,
  editMode = false,
  editDetails,
  handleAdd,
}: Props) {
  const [type, setType] = useState("withdrawl");
  const [amount, setAmount] = useState(1000);

  const [status, setStatus] = useState("accepted");
  const [date, setDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (editMode && editDetails) {
      setType(editDetails.transaction_type);
      setAmount(editDetails.amount);
      setStatus(editDetails.status);
      setDate(new Date(editDetails.date));
    }
  }, [editDetails, editMode]);

  function closeOverlay() {
    // setPopup(false);
    // document.documentElement.style.overflow = "auto";
    // document.getElementById("overlay")!.className = "hidden";
  }

  useEffect(() => {
    if (show) {
      const overlay = document.getElementById("overlay");
      overlay!.className = "show";
      document.documentElement.style.overflow = "hidden";
      overlay?.addEventListener("click", closeOverlay);
    }

    if (!show) {
      document.getElementById("overlay")!.className = "hidden";
      document.documentElement.style.overflow = "auto";
      setStatus("accepted");
      setAmount(1000);
      setType("withdrawl");
      setDate(new Date());
    }

    return () => {
      const overlay = document.getElementById("overlay");
      overlay?.removeEventListener("click", closeOverlay);

      overlay!.className = "hidden";
      document.documentElement.style.overflow = "auto";
    };
  }, [show]);

  return (
    <div>
      {show &&
        createPortal(
          <div
            className="transaction-popup"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="add-transaction-popup">
              <h2>{editMode ? "Edit" : "Add"} Transaction</h2>
              <div className="add-transaction-item">
                <span>Type</span>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="withdrawl">withdrawl</option>
                  <option value="Referal Bonus">Referal Bonus</option>
                  <option value="Gift">Gift</option>
                </select>
              </div>

              <div className="add-transaction-item">
                <p>Balance: </p>
                <input
                  type="number"
                  className="balance-input"
                  value={amount}
                  step={500}
                  onChange={(e) => setAmount(e.target.valueAsNumber)}
                />
              </div>
              <div className="add-transaction-item">
                <p>Date</p>
                <input
                  type="date"
                  value={date.toISOString().split("T")[0]}
                  onChange={(e) => {
                    if (e.target.valueAsDate) setDate(e.target.valueAsDate);
                  }}
                />
              </div>
              {type == "withdrawl" && (
                <div className="add-transaction-item">
                  <p>Status</p>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              )}
              <div className="btns">
                <button className="cancel-btn" onClick={() => setPopup(false)}>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setPopup(false);
                    console.log(handleAdd);
                    handleAdd({
                      _id:
                        editMode && editDetails
                          ? editDetails._id
                          : Date.now().toString(),
                      amount: amount,
                      date: date.toISOString(),
                      is_debit: type == "withdrawl",
                      status: type == "withdrawl" ? status : "",
                      transaction_type: type,
                    });
                  }}
                >
                  {editMode ? "Save" : "Add"}
                </button>
              </div>
            </div>
          </div>,
          document.getElementById("overlay")!
        )}
    </div>
  );
}
