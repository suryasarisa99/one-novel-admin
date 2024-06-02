import React, { useState, useEffect, useRef } from "react";
import useData from "../../hooks/useData";

export default function ReferalPage() {
  const { user } = useData();
  const [selectedReferal, setSelectedReferal] = useState<1 | 2 | 3 | 4>(1);
  const referalsLevels = [1, 2, 3, 4];
  type ReferalType = "level1" | "level2" | "level3" | "level4";

  if (!user) return <div>Loading...</div>;

  return (
    <div className="referal-page page">
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
            <div className="referal" key={referal._id}>
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
