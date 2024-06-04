import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  show: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function PopupLayout({ show, setPopup, children }: Props) {
  const [type, setType] = useState("withdrawl");
  const [amount, setAmount] = useState(1000);

  const [status, setStatus] = useState("accepted");
  const [date, setDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);

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
            {children}
          </div>,
          document.getElementById("overlay")!
        )}
    </div>
  );
}
