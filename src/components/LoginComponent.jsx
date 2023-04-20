import React, { useState } from "react";
import { getAdmin, loginUsers } from "../api";
import "../styles/login.css";

let Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [admin,setAdminData]=useState({
  //   name:'',
  //   password:''
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // getAdmin().then(res=>{
    //   console.log(res.data);
    //   setAdminData(res.data);
    // });
    // console.log({admin})

    if (username === "admin" && password === "admin@123") {
      window.location = "/admin";
    }
    let data = {
      username,
      password,
    };
    const response = await loginUsers(data);
    console.log(response.data.data);
    if (response.data.error) {
      alert(response.data.error);
    } else {
      window.localStorage.setItem("token", response.data.data);
      window.location = "/home";
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="logo"></div>
          <h3>Login</h3>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Employee ID"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <div className="forget">
          <a href="/forgot">Forgot Password?</a>
        </div> */}
          <div id="error"></div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
