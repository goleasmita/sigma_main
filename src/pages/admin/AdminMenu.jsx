import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <div className="admin-menu ">
      <h3 className="menu-title">⚙️ Admin Dashboard</h3>
      <div className="menu-list">
        <NavLink
          to="/dashboard/admin/users"
          className="menu-item"
          activeclassname="active">
          👤 Users
        </NavLink>
        <NavLink
          to="/dashboard/admin/enquiry"
          className="menu-item"
          activeclassname="active">
          ✉️ Enquiries
        </NavLink>
      </div>
    </div>
  );
}
