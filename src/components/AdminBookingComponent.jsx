import React, { useEffect, useState } from "react";
import "../styles/admindashboard.css";
import valtechLogo from "../assets/valtech-logo.jpg";
import { getBookings, updateCheckIn } from "../api";

let AdminBooking = () => {
  const [isActive, setIsActive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [id, setId] = useState("");
  const [bookData, setBookData] = useState([]);

  function toggleSidebar() {
    setIsActive(!isActive);
  }
  function toggleForm() {
    setIsClicked(!isClicked);
  }
  const clearLocalStorage=()=>{
    window.localStorage.clear();
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = id;
    let inputResponse = await getBookings(data);
    setBookData(inputResponse.data.data);
    console.log(bookData);
    toggleForm();
  };
  const handleConfirm = async () => {
    let data = {
      id: id,
      time: Date().toLocaleString(),
    };
    const updateResponse = await updateCheckIn(data);
    if (updateResponse.data.success == true) {
      alert("Seat confirmed");
      window.location="/adminbooking"
    }
  };
  return (
    <div className="admin-container">
      <div className={`navigation ${isActive ? "active" : ""}`}>
        <div className="company">
          <a href="/admin">
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
            <a href="/adminbookings" className="active-tab">
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
              <span className="dash-name">Bookings</span>
            </span>
          </div>
        </div>
        <div className="user-form" id="add-user">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="bookingID"
                id="bookingID"
                required
                onChange={(e) => setId(e.target.value)}
              />
              <label for="bookingID">Enter Booking ID</label>
            </div>
            <button className="btn btn-secondary">Submit</button>
          </form>
        </div>
        <div id={`${isClicked ? "form-show" : "form-hide"}`}>
          <h3>Booked Information</h3>

          {bookData &&
          
          (bookData.status == "cancelled" || bookData.status == "expired") ? (
            <h4>No Booking available</h4>
          ) : (
            
              <div className="table-container table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Request Type</th>
                    <th scope="col">From Date</th>
                    <th scope="col">To Date</th>
                    <th scope="col">Shift Timing</th>
                    <th scope="col">Booked Seat</th>
                    <th scope="col">Food Opted</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{bookData.userId}</td>
                    <td>{bookData.id}</td>
                    <td>{bookData.type}</td>
                    <td>{bookData.fromDate}</td>
                    <td>{bookData.toDate}</td>
                    <td>{bookData.shift}</td>
                    <td>
                      {bookData.floor}-{bookData.seat}
                    </td>
                    <td>{bookData.food}</td>

                    <td>
                      <button
                        className="btn btn-success"
                        onClick={handleConfirm}
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>           
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBooking;
