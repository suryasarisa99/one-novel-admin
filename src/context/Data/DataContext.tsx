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
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [withDrawls, setWithDrawls] = useState<WithDrawlsType[]>([]);
  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    if (token) {
      console.log("token is there " + token);
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
            setLogedIn(true);
          }
        })
        .catch((err) => {
          if (err.response.data.error == "Unauthorized") {
            localStorage.removeItem("token");
            setToken("");
            setLogedIn(false);
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
        logedIn,
        setLogedIn,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
