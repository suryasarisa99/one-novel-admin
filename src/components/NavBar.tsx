import {
  MdOutlineAdminPanelSettings,
  MdAdminPanelSettings,
} from "react-icons/md";
import { RiPaypalLine, RiPaypalFill } from "react-icons/ri";
import { FaMoneyBillWaveAlt, FaMoneyBillWave } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NavBar() {
  const adminNavItems = [
    {
      name: "Payments",
      path: "/payments",
      Icon: RiPaypalLine,
      ActiveIcon: RiPaypalFill,
      size: "27px",
    },
    {
      name: "Withdrawls",
      path: "/withdrawls",
      Icon: FaMoneyBillWave,
      ActiveIcon: FaMoneyBillWaveAlt,
      size: "27px",
    },
    {
      name: "Admin",
      path: "/user",
      Icon: MdOutlineAdminPanelSettings,
      ActiveIcon: MdAdminPanelSettings,
      size: "27px",
    },
    // {
    //   name: "Referal",
    //   path: "/referal",
    //   Icon: HiOutlineUserGroup,
    //   ActiveIcon: HiMiniUserGroup,
    //   size: "28px",
    // },
  ];

  const location = useLocation();

  return (
    <nav className="nav-bar">
      {adminNavItems.map((item) => {
        return (
          <Link key={item.name} to={item.path} className="nav-item">
            {location.pathname === item.path ? (
              <item.ActiveIcon size={item.size} />
            ) : (
              <item.Icon size={item.size} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
