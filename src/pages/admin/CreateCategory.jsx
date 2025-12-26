import React from "react";
import AdminMenu from "./AdminMenu";

export default function CreateCategory() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9">Create Category</div>
        </div>
      </div>
    </div>
  );
}
