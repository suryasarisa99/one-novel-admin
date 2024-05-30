import React, { useState, useEffect, createContext, useReducer } from "react";
import DataContextType, {
  ManualPaymentType,
  WithDrawlsType,
} from "./DataContextTypes";
import axios from "axios";

export const DataContext = createContext({} as DataContextType);
export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [manualPayments, setManualPayments] = useState<ManualPaymentType[]>([]);
  const [data, setData] = useState(0);
  const [token, setToken] = useState("");
  const [withDrawls, setWithDrawls] = useState<WithDrawlsType[]>([]);

  useEffect(() => {
    if (token) {
      console.log("token i sthere " + token);
      localStorage.setItem("token", token);
    }
  }, [token]);

  useEffect(() => {
    const local_token = localStorage.getItem("token");
    if (local_token) {
      console.log(local_token);
      setToken(local_token);

      axios
        .get(import.meta.env.VITE_SERVER, {
          headers: {
            Authorization: `Bearer ${local_token}`,
          },
        })
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            setManualPayments(res.data.payments);
            setWithDrawls(res.data.withdrawls);
          }
        });
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        manualPayments,
        setManualPayments,
        withDrawls,
        setWithDrawls,
        data,
        setData,
        token,
        setToken,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
