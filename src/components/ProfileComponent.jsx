import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import profileBackground from "../assets/profile-background.jpg";
import profileLogo from "../assets/profile-image.png";
import { userRecords } from "../api";

let Profile = () => {
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
    <div className="profile-body">
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
                    <a className="nav-link " aria-current="page" href="/home">
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
                    <a className="nav-link btn btn-secondary" href="/profile">
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
      <main className="profile-container">
        <img
          src={profileBackground}
          alt="profile background"
          width="600"
          height="200"
        />
        <div className="profile-image">
          <img
            id="profile-logo"
            src={profileLogo}
            alt="profile logo"
            width="100"
            height="100"
          />
        </div>
        <div className="user-info">
          <div className="user-info-header">
            <h3>My Profile</h3>
            <ion-icon name="ellipsis-vertical-sharp"></ion-icon>
          </div>
          <div className="user-info-content">
            <div className="container">
              <p id="qun">Name</p>
              <p id="ans">{userData.name}</p>
            </div>
            <div className="container">
              <p id="qun">Employee ID</p>
              <p id="ans">{userData.id}</p>
            </div>
            <div className="container">
              <p id="qun">Email ID</p>
              <p id="ans">{userData.email}</p>
            </div>
            <div className="container">
              <p id="qun">Phone number</p>
              <p id="ans">{userData.phone}</p>
            </div>
            <div className="container">
              <p id="qun">Role</p>
              <p id="ans">{userData.role}</p>
            </div>
          </div>
        </div>
      </main>
      <section className="profile-container custom">
        {/* <div className="user-settings">
          <div className="user-info-header">
            <h3>Settings</h3>
          </div>
          <div className="user-info-content">
            <div className="container">
              <a href="/change">
                <button className="btn">Change Password</button>
              </a>
            </div>
          </div>
        </div> */}
      </section>

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

export default Profile;
