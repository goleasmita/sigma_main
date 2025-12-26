import React from "react";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../components/context/AuthContext";

export default function AdminDashboard() {
  const [auth] = useAuth();
  return (
    <div>
      <div className="container-fluid " style={{ marginTop: "120px" }}>
        <div className="row">
          <div className="col-lg-3 p-0">
            <AdminMenu />
          </div>
          <div className="col-lg-9 pt-5">
            <h4>Admin Name: {auth?.user.name} </h4>
            <h4>Admin Email: {auth?.user.email} </h4>
            <h4>Admin Contact: {auth?.user.phone} </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
