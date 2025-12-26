import React from "react";
import AdminMenu from "./AdminMenu";

export default function CreateProducts() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9">Create Products</div>
        </div>
      </div>
    </div>
  );
}
