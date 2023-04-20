import React, { useEffect, useState } from "react";
import "../styles/home.css";
import layout from "../assets/layout2.png";
import { userRecords } from "../api";

let Home = () => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    booking: {
      id: "0",
      type: "0",
      fromDate: "0",
      toDate: "0",
      shift: "0",
      food: "0",
      floor: "0",
      seat: "0",
      status: false,
    },
  });
  console.log(userData);

  const logData = async () => {
    let data = {
      token: window.localStorage.getItem("token"),
    };
    let response = await userRecords(data);
    setUserData(response.data.data);
  };

  useEffect(() => {
    logData();
  }, []);

  const clearLocalStorage = () => {
    window.localStorage.clear();
  };
  return (
    <div className="home-body">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <h3>
              <a className="navbar-brand lineUp" href="/home">
                Valtech_
              </a>
            </h3>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end text-bg-dark"
              tabindex="-1"
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title"
                  id="offcanvasDarkNavbarLabel"
                ></h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <a
                      className="nav-link btn btn-secondary"
                      aria-current="page"
                      href="/home"
                    >
                      Home
                    </a>
                  </li>
                  {userData.booking.id == "0" ? (
                    <li className="nav-item">
                      <a className="nav-link" href="/book">
                        Book Seat
                      </a>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <a className="nav-link" href="/bookdetails">
                        View Pass
                      </a>
                    </li>
                  )}

                  <li className="nav-item">
                    <a className="nav-link" href="/profile">
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/"
                      onClick={clearLocalStorage}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="home-main-container">
        <div className="home-image-container lineRight">
          <img src={layout} alt="layout" width="600" height="400" />
        </div>
        <div className="home-book-content lineUp">
          <h3>Hello,</h3>
          <h3>{userData.name}!!</h3>
          {userData.booking.id == "0" ? (
            <div className="home-details">
              <h5>You have not booked any seat</h5>
              <h6>Please book your seat</h6>
            </div>
          ) : (
            <div className="home-details">
              <h5>Your seating for Today</h5>
              <h6>
                Your desk is {userData.booking.seat} at {userData.booking.floor}
              </h6>
              <a href="/bookdetails">
                <button className="btn btn-secondary">View Pass</button>
              </a>
            </div>
          )}
        </div>
      </main>
      <footer className="footer-container">
        <p>&copy; 2023 Valtech, India</p>
        <ul id="social-links">
          <li>
            <a href="https://www.instagram.com/explore/locations/611271258/valtech-india/">
              <span className="social-icon">
                <ion-icon name="logo-instagram"></ion-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/valtech_india">
              <span className="social-icon">
                <ion-icon name="logo-twitter"></ion-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/valtech.india/">
              <span className="social-icon">
                <ion-icon name="logo-facebook"></ion-icon>
              </span>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
