import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../components/context/AuthContext";

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [auth] = useAuth();
  const API =
    import.meta.env.VITE_API_ENQUIRY_URL || "http://localhost:8080/api";

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get(`${API}/enquiry-list`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setEnquiries(res.data);
      } catch (err) {
        console.error("Error fetching enquiries", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  //delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      try {
        await axios.delete(`${API}/enquiry/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`, // if protected
          },
        });
        setEnquiries(enquiries.filter((enq) => enq._id !== id));
      } catch (err) {
        console.error("Error deleting enquiry", err);
      }
    }
  };

  return (
    <div className=" container-fluid " style={{ marginTop: "123px" }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 p-0">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="col-lg-9 mt-2">
          <div
            className="card shadow border-0 rounded-3"
            style={{ overflow: "auto", height: "98vh" }}>
            <div
              className="card-header text-white"
              style={{
                background: "linear-gradient(90deg, #253745, #1f2a36)",
              }}>
              <h4 className="mb-0">📩 Enquiries</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.length > 0 ? (
                      enquiries.map((enq, index) => (
                        <tr key={enq._id}>
                          <td>{index + 1}</td>
                          <td>
                            <span className="fw-semibold">{enq.name}</span>
                          </td>
                          <td>
                            <a
                              href={`mailto:${enq.email}`}
                              className="text-primary">
                              {enq.email}
                            </a>
                          </td>
                          <td>
                            <a
                              href={`tel:${enq.phone}`}
                              className="text-success">
                              {enq.phone}
                            </a>
                          </td>
                          <td style={{ maxWidth: "200px" }}>
                            <span className="text-muted">{enq.message}</span>
                          </td>
                          <td>
                            <span className="badge bg-secondary">
                              {new Date(enq.createdAt).toLocaleString()}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(enq._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          No enquiries yet.
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
    </div>
  );
}
