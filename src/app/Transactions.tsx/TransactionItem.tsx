import React, { useState, useEffect, useRef } from "react";
import { TransactionType } from "./Transactions";

export default function TransactionItem({
  t,
  onClick,
}: {
  t: TransactionType;
  onClick: () => void;
}) {
  return (
    <div className="transaction-item" onClick={onClick}>
      <div className="top">
        <span>{t.transaction_type}</span>
        <span className={"amount " + (t.amount > 0 ? "added" : "deducted")}>
          {t.amount}
        </span>
      </div>
      <div className="bottom">
        <span className={"status " + t.status}>{t.status}</span>
        <span>{t.date}</span>
      </div>
    </div>
  );
}
