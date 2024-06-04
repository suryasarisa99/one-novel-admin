import React, { useState, useEffect, useRef } from "react";
import PopupLayout from "../../components/PopupLayout";
import { UserChildrenType } from "../../types/UserType";
import shortid from "shortid";

type Props = {
  show: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  editMode?: boolean;
  editDetails?: UserChildrenType;
  handleAdd: (transaction: UserChildrenType) => void;
};

export default function ReferalPopup({
  show,
  setPopup,
  editMode,
  editDetails,
  handleAdd,
}: Props) {
  const [name, setName] = useState("");
  const [valid, setValid] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    if (editMode && editDetails) {
      setName(editDetails.name);
      setValid(editDetails.valid);
      setId(editDetails._id);
    } else {
      setId("");
      setName("");
      setValid(true);
    }
  }, [editDetails, editMode]);

  return (
    <PopupLayout show={show} setPopup={setPopup}>
      <div className="add-transaction-popup">
        <h2>{editMode ? "Edit" : "Add"} Referal</h2>

        <div className="add-transaction-item">
          <span>Id</span>
          <input
            type="text"
            value={id}
            disabled={editMode ? true : false}
            placeholder="Leave Emty it Auto Gen"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>

        <div className="add-transaction-item">
          <span>Name</span>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="add-transaction-item">
          <span>Valid</span>
          <input
            type="checkbox"
            checked={valid}
            onChange={(e) => {
              setValid(e.target.checked);
            }}
          />
        </div>
        <div className="btns">
          <button
            className="cancel-btn"
            onClick={() => {
              setPopup(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleAdd({
                _id: editMode
                  ? editDetails?._id || ""
                  : id
                  ? id
                  : shortid.generate(),
                name,
                valid,
              });
              setPopup(false);
            }}
          >
            {editMode ? "Edit" : "Add"}
          </button>
        </div>
      </div>
    </PopupLayout>
  );
}
