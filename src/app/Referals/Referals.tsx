import React, { useState, useEffect, useRef } from "react";
import useData from "../../hooks/useData";
import { FaPlus } from "react-icons/fa";
import ReferalPopup from "./ReferalPopup";
import { UserChildrenType } from "../../types/UserType";
import shortid from "shortid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ReferalPage() {
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
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="referal-page page">
      <div className="title-with-btns">
        <h1>Referals</h1>

        <div className="btns">
          <button
            onClick={() => {
              setShowPopup(true);
              setPopupDetails(undefined);
              setEditMode(false);
              handleAddRef.current = (x) => {
                setUser((prevUser) => {
                  if (!prevUser) return prevUser;
                  console.log("handle add:", x);
                  const updatedChildren = { ...prevUser.children };
                  const key = ("level" + selectedReferal) as ReferalType;
                  updatedChildren[key] = [...updatedChildren[key], x];
                  return { ...prevUser, children: updatedChildren };
                });

                axios.post(
                  `${import.meta.env.VITE_SERVER}/edit/referal/${user._id}`,
                  {
                    r: x,
                    level: selectedReferal,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
              };
            }}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <ReferalPopup
        show={showPopup}
        setPopup={setShowPopup}
        editMode={editMode}
        editDetails={popupDetails}
        handleAdd={handleAddRef.current}
      />
      <div className="referal-selector">
        {referalsLevels.map((level) => {
          return (
            <div
              key={level}
              className={
                "referal-lvl " + (selectedReferal == level ? "selected" : "")
              }
              onClick={() => setSelectedReferal(level as 1 | 2 | 3 | 4)}
            >
              {level}
            </div>
          );
        })}
      </div>

      <div className="referals-count">
        <div className="referals-count-item">
          <span>Valid</span>
          <span>
            {
              user.children[("level" + selectedReferal) as ReferalType].filter(
                (referal) => referal.valid
              ).length
            }
          </span>
        </div>
        <div className="referals-count-item">
          <span>Invalid</span>
          <span>
            {
              user.children[("level" + selectedReferal) as ReferalType].filter(
                (referal) => !referal.valid
              ).length
            }
          </span>
        </div>
        <div className="referals-count-item">
          <span>Total</span>
          <span>
            {user.children[("level" + selectedReferal) as ReferalType].length}
          </span>
        </div>
      </div>

      <div className="referals">
        {user.children[
          ("level" + selectedReferal) as
            | "level1"
            | "level2"
            | "level3"
            | "level4"
        ].map((referal) => {
          return (
            <div
              className="referal"
              onClick={() => {
                setShowPopup(true);
                setEditMode(true);
                setPopupDetails({ ...referal });
                handleAddRef.current = (x) => {
                  setUser((prevUser) => {
                    if (!prevUser) return prevUser;
                    console.log("handle add:", x);
                    const updatedChildren = { ...prevUser.children };
                    const key = ("level" + selectedReferal) as ReferalType;
                    const item = updatedChildren[key].findIndex(
                      (r) => r._id == x._id
                    );
                    console.log(item);
                    updatedChildren[key][item] = x;
                    return { ...prevUser, children: updatedChildren };
                  });
                  axios.put(
                    `${import.meta.env.VITE_SERVER}/edit/referal/${user._id}`,
                    {
                      r: x,
                      level: selectedReferal,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                };
              }}
              key={referal._id}
            >
              <div className="left">
                <p className="name">{referal.name}</p>
                <p className="id">{referal._id}</p>
              </div>
              <div
                className={"status " + (referal.valid ? "valid" : "invalid")}
              >
                {referal.valid ? "Valid" : "Invalid"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
