import React from "react";

type DataContextTypes = {
  data: number;
  setData: React.Dispatch<React.SetStateAction<number>>;
  manualPayments: ManualPaymentType[];
  setManualPayments: React.Dispatch<React.SetStateAction<ManualPaymentType[]>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  withDrawls: WithDrawlsType[];
  setWithDrawls: React.Dispatch<React.SetStateAction<WithDrawlsType[]>>;
};

export type WithDrawlsType = {
  _id: string;
  amount: number;
  date: string;
  status: string;
  type: number;
  userId: string;
  userName: string;
  upi: string;
  bank: {
    bank_name: string;
    account_no: string;
    ifsc: string;
  };
};

export type ManualPaymentType = {
  _id: string;
  userId: string;
  date: string;
  status: string;
};

export default DataContextTypes;
