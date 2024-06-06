import React, { useState, useEffect, useRef } from "react";
import useData from "../../hooks/useData";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { UserChildrenType } from "../../types/UserType";
import { useNavigate } from "react-router-dom";

export default function ProfileUploadsPage() {
  const { user, setUser, token } = useData();
  const [selectedReferal, setSelectedReferal] = useState<1 | 2 | 3 | 4>(1);
  const referalsLevels = [1, 2, 3, 4];
  type ReferalType = "level1" | "level2" | "level3" | "level4";

  const [showPopup, setShowPopup] = useState(false);
  const [popupDetails, setPopupDetails] = useState<
    UserChildrenType | undefined
  >();
  const [editMode, setEditMode] = useState(false);
  const handleAddRef = useRef((transaction: UserChildrenType) => {});

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/user");
    else {
      console.log(user.uploadedBooks);
    }
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="referal-page page">
      <div className="title-with-btns">
        <div
          className="left-icon icon"
          onClick={() => {
            navigate("/user");
          }}
        >
          <FaChevronLeft />
        </div>
        <h1>Uploads</h1>
        <div className="icon"></div>
      </div>

      <div className="referals">
        {user.uploadedBooks.map((u, i) => {
          return (
            <div className="referal" key={u._id}>
              <div className="left">
                <button
                  onClick={() => {
                    open(u.url, "_blank");
                  }}
                >
                  View Book {i}
                </button>
              </div>
              <div className="right">
                <div className={"status " + u.status}>{u.status}</div>
                <div className="date">
                  {new Date(u.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
