import React, { useEffect, useState } from "react";
import "../styles/admindashboard.css";
import valtechLogo from "../assets/valtech-logo.jpg";

import { createUsers, deleteUsers, fetchUsers } from "../api/index";

let AdminUsers = () => {
  const [isActive, setIsActive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchUsers().then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

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
    let data = {
      id,
      name,
      email,
      phone,
      role,
      password,
    };
    const response = await createUsers(data);
    if (response.data.success == true) {
      alert("Employee addedd successfully");
      window.location = "/adminusers";
    } else {
      alert("Failed adding employee");
    }

    e.target.reset();
  };

  const handleDelete = async (id) => {
    // alert(id)
    const deleteResponse = await deleteUsers(id);
    if (deleteResponse.data.success == true) {
      alert("Employee deleted successfully");
      window.location = "/adminusers";
    } else {
      alert("Failed deleting employee");
    }
    window.location = "/adminusers";
  };

  const handleUpdate = async (
    urlId,
    id,
    name,
    email,
    phone,
    role,
    password
  ) => {
    localStorage.setItem("urlId", urlId);
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("role", role);
    localStorage.setItem("password", password);

    // setLocalStorage();
    window.location = "/update";
    // const updateResponse=await updateUsers(urlId)
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
            <a href="/adminbooking">
              <span className="icon">
                <ion-icon name="calendar"></ion-icon>
              </span>
              <span className="name">Bookings</span>
            </a>
          </li>
          <li>
            <a href="/adminusers" className="active-tab">
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
              <span className="dash-name">User Information</span>
            </span>
          </div>
        </div>
        <div className="user-form" id="add-user">
          <button class="btn btn-secondary add-btn" onClick={toggleForm}>
            Add User
          </button>
          <form
            id={`${isClicked ? "form-show" : "form-hide"}`}
            onSubmit={handleSubmit}
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="empid"
                name="empid"
                value={id}
                placeholder="name@example.com"
                onChange={(e) => setId(e.target.value)}
              />
              <label for="empid">Enter Employee ID</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="empname"
                name="empname"
                value={name}
                placeholder="name@example.com"
                onChange={(e) => setName(e.target.value)}
              />
              <label for="empname">Enter Employee Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="empemail"
                name="empemail"
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="empemail">Enter Employee Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control"
                id="empphone"
                name="empphone"
                value={phone}
                placeholder="name@example.com"
                onChange={(e) => setPhone(e.target.value)}
              />
              <label for="empphone">Enter Employee Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="emprole"
                name="emprole"
                value={role}
                placeholder="name@example.com"
                onChange={(e) => setRole(e.target.value)}
              />
              <label for="emprole">Enter Employee Role</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="emprole"
                name="emprole"
                value={password}
                placeholder="name@example.com"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="emprole">Enter Employee Temporary password</label>
            </div>
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </form>
        </div>

        <h2>User Records</h2>
        <div className="table-container table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Employee Email</th>
                <th scope="col">Employee Phone Number</th>
                <th scope="col">Employee Role</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, idx) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{idx + 1}</th>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.role}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleUpdate(
                              item._id,
                              item.id,
                              item.name,
                              item.email,
                              item.phone,
                              item.role,
                              item.password
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
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

export default AdminUsers;
