import React, { useEffect, useState } from "react";
import "../styles/admindashboard.css";
import valtechLogo from "../assets/valtech-logo.jpg";
import { getBookingsByDate, getBookingsByUser } from "../api";

let AdminReports = () => {
  const [isActive, setIsActive] = useState(false);

  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [userId, setUserId] = useState("");
  const [data, setData] = useState("");

  function toggleSidebar() {
    setIsActive(!isActive);
  }
  const clearLocalStorage=()=>{
    window.localStorage.clear();
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "Individual") {
      let id = userId;
      const response = await getBookingsByUser(id);
      setData(response.data.data);
    }
    if (type === "Weekly" || type === "Monthly") {
      let fromDate = from;
      let toDate = to;
      let dateData = {
        fromDate,
        toDate,
      };
      // console.log(dateData);
      const response = await getBookingsByDate(dateData);
      setData(response.data.data);
    }
  };

  useEffect(() => {
    if (type == "Weekly") {
      const selectedDate = new Date(from);
      selectedDate.setDate(selectedDate.getDate() + 7);
      const newDate = selectedDate.toISOString().substr(0, 10);
      setTo(newDate);
    } else if (type == "Monthly") {
      const selectedDate = new Date(from);
      selectedDate.setDate(selectedDate.getDate() + 30);
      const newDate = selectedDate.toISOString().substr(0, 10);
      setTo(newDate);
    }
  }, [from]);
  return (
    <div className="admin-container">
      <div className={`navigation ${isActive ? "active" : ""}`}>
        <div className="company">
          <a href="">
            <span className="icon">
              <img
                src={valtechLogo}
                alt="valtech-logo"
                width="20"
                height="20"
                className="logo"
              />{" "}
            </span>
            <span className="company-name">v_book</span>
          </a>
        </div>
        <hr />
        <ul>
          <li>
            <a href="/admin">
              <span className="icon">
                <ion-icon name="grid-sharp"></ion-icon>
              </span>
              <span className="name">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/adminbooking">
              <span className="icon">
                <ion-icon name="calendar"></ion-icon>
              </span>
              <span className="name">Bookings</span>
            </a>
          </li>
          <li>
            <a href="/adminusers">
              <span className="icon">
                <ion-icon name="people-sharp"></ion-icon>
              </span>
              <span className="name">Users</span>
            </a>
          </li>
          <li>
            <a href="/adminseat">
              <span className="icon">
                <ion-icon name="desktop-sharp"></ion-icon>
              </span>
              <span className="name">Seats</span>
            </a>
          </li>
          <li>
            <a href="/adminreports" className="active-tab">
              <span className="icon">
                <ion-icon name="keypad"></ion-icon>
              </span>
              <span className="name">Reports</span>
            </a>
          </li>
          <li>
            <a href="/">
              <span className="icon">
                <ion-icon name="log-out-sharp"></ion-icon>
              </span>
              <span className="name" onClick={clearLocalStorage}>Log Out</span>
            </a>
          </li>
        </ul>
      </div>
      <div className={`main ${isActive ? "active" : ""}`}>
        <div className="header">
          <div className="admin-main">
            <span id="sideBar-btn" onClick={toggleSidebar}>
              <ion-icon name="menu"></ion-icon>{" "}
              <span className="dash-name">Reports</span>
            </span>
          </div>
        </div>
        <div className="user-form">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="type"
                id="type"
                required
                onChange={(e) => setType(e.target.value)}
              >
                <option selected></option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Individual">Individual Reports</option>
              </select>
              <label for="type">Select type of requests</label>
            </div>

            {(type == "Weekly" || type == "Monthly") && (
              <div>
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    name="from"
                    id="from"
                    required
                    onChange={(e) => setFrom(e.target.value)}
                  />
                  <label for="from">From Date</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    name="to"
                    id="to"
                    value={to}
                    required
                    readOnly
                  />
                  <label for="to">To Date</label>
                </div>
              </div>
            )}

            {type == "Individual" && (
              <div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    id="id"
                    required
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <label for="to">Enter Employee ID</label>
                </div>
              </div>
            )}
            <button className="btn btn-secondary">Submit</button>
          </form>
        </div>
        <h3>Booking Information</h3>
        <div className="table-container table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Booking ID</th>
                <th scope="col">Request Type</th>
                <th scope="col">From Date</th>
                <th scope="col">To Date</th>
                <th scope="col">Shift</th>
                <th scope="col">Food opted</th>
                <th scope="col">Booked Seat</th>
                <th scope="col">Status</th>
                <th scope="col">Check-In</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, idx) => {
                  return (
                    <tr>
                      <th scope="row">{idx + 1}</th>
                      <td>{item.userId}</td>
                      <td>{item.id}</td>
                      <td>{item.type}</td>
                      <td>{item.fromDate}</td>
                      <td>{item.toDate}</td>
                      <td>{item.shift}</td>
                      <td>{item.food}</td>
                      <td>
                        {item.floor}-{item.seat}
                      </td>
                      <td>{item.status}</td>
                      <td>{item.checkInTime}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
