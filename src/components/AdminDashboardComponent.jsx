import React, { useEffect, useState } from "react";
import "../styles/admindashboard.css";
import valtechLogo from "../assets/valtech-logo.jpg";
import { fetchBookings } from "../api";

let AdminDashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState([]);

  function toggleSidebar() {
    setIsActive(!isActive);
  }

  const clearLocalStorage=()=>{
    window.localStorage.clear();
   }

  useEffect(() => {
    fetchBookings().then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <div className="admin-container">
      <div className={`navigation ${isActive ? "active" : ""}`}>
        <div className="company">
          <a href="#">
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
            <a href="/admin" className="active-tab">
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
            <a href="/adminreports">
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
              <span className="dash-name">Dashboard</span>
            </span>
          </div>
        </div>
        <h3>Booking Information</h3>
        <div>
          

        </div>
        
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
              {data.map((item, idx) => {
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
              } )
            } 
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
