import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../components/context/AuthContext";
import axios from "axios";

export default function Users() {
  const [auth] = useAuth(); // ✅ no need for setAuth here
  const [users, setUsers] = useState([]);

  const apiUrl =
    import.meta.env.VITE_API_AUTH_URL || "http://localhost:8080/api/v1/auth";

  // Fetch users from API
  const fetchDataWithToken = async () => {
    try {
      console.log("🔎 API URL being used:", `${apiUrl}/all-users`);
      console.log("Auth token being sent:", auth?.token);

      const { data } = await axios.get(`${apiUrl}/all-users`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`, // ✅ use auth.token
        },
      });

      console.log("✅ Users fetched:", data);

      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error(
        "❌ Error fetching users:",
        error.response?.data || error.message
      );
      if (error.response?.status === 401) {
        alert("Unauthorized access. Please log in again.");
      }
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchDataWithToken();
    }
  }, [auth?.token]);

  // 🔴 Restrict access to admins only
  if (auth?.user?.role !== 1) {
    return (
      <div className="alert alert-danger text-center mt-5">
        🚫 Access Denied – Admins only
      </div>
    );
  }

  // ✅ Admin view
  return (
    <div className="users-page container-fluid" style={{ marginTop: "123px" }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 p-0">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="col-lg-9 users-content">
          <h2 className="page-title">
            👤 Manage Users{" "}
            <small className="text-muted">
              (Logged in as {auth?.user?.name || "Guest"})
            </small>
          </h2>

          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-0">
              <table className="table table-hover users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <span
                            className={
                              user.role === 1
                                ? "badge bg-danger"
                                : "badge bg-success"
                            }>
                            {user.role === 1 ? "Admin" : "User"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        🚫 No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
