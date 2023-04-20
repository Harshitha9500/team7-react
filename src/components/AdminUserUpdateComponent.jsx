import React, { useEffect, useState } from "react";
import '../styles/admindashboard.css';
import valtechLogo from '../assets/valtech-logo.jpg'
import {updateUsers} from '../api/index';

let AdminUpdate=()=>{
    const [isActive, setIsActive] = useState(false);
    const [urlId,setUrlId]=useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');

  function toggleSidebar() {
    setIsActive(!isActive);
  }

  const clearLocalStorage=()=>{
    window.localStorage.clear();
   }
  useEffect(()=>{
    setUrlId(localStorage.getItem("urlId"))
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setPhone(localStorage.getItem("phone"));
    setRole(localStorage.getItem("role"));
    setPassword(localStorage.getItem("password"));
  },[])

  const handleSubmit= async(e)=>{
    e.preventDefault();
    let data = {
        urlId,
        id,
        name,
        email,
        phone,
        role,
        password,     
      }
      const response = await updateUsers(data)
      if(response.data.success==true){     
        alert('Employee edited successfully');
        window.location = "/adminusers"
      }else{
        alert('Failed editing employee');
      }
  }
    return(
        <div className="admin-container">
        <div className={`navigation ${isActive ? 'active' : ''}`}>
            <div className="company">    
                <a href="">   
                         <span className="icon"><img src={valtechLogo} alt="valtech-logo" width="20" height="20" className="logo"/>  </span>                  
                        <span className="company-name">v_book</span>
                </a>    
            </div>  
            <hr/>
            <ul>
                <li>
                    <a href="/admin">
                        <span className="icon"><ion-icon name="grid-sharp"></ion-icon></span>
                        <span className="name">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="/adminbooking">
                        <span className="icon"><ion-icon name="calendar"></ion-icon></span>
                        <span className="name">Bookings</span>
                    </a>
                </li>
                <li>
                    <a href="/adminusers" className="active-tab">
                        <span className="icon"><ion-icon name="people-sharp"></ion-icon></span>
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
                        <span className="icon"><ion-icon name="keypad"></ion-icon></span>
                        <span className="name">Reports</span>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <span className="icon"><ion-icon name="log-out-sharp"></ion-icon></span>
                        <span className="name" onClick={clearLocalStorage}>Log Out</span>
                    </a>
                </li>
            </ul>
        </div>
        <div className={`main ${isActive ? 'active' : ''}`}>
            <div className="header">
                <div className="admin-main">
                    <span id="sideBar-btn" onClick={toggleSidebar}><ion-icon name="menu"></ion-icon> <span className="dash-name">Reports</span></span>  
                </div>
            </div>
            
            <div className="user-form" id="add-user">
                <h2>Update User</h2>
                <form onSubmit={handleSubmit}> 
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="empid" name="empid" value={id}  placeholder="name@example.com" onChange={(e)=>setId(e.target.value)}/>
                    <label for="empid">Enter Employee ID</label>
                  </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="empname" name="empname" value={name} placeholder="name@example.com" onChange={(e)=>setName(e.target.value)}/>
                    <label for="empname">Enter Employee Name</label>
                  </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="empemail" name="empemail" value={email} placeholder="name@example.com"onChange={(e)=>setEmail(e.target.value)}/>
                    <label for="empemail">Enter Employee Email</label>
                  </div>
                <div className="form-floating mb-3">
                    <input type="tel" className="form-control" id="empphone" name="empphone" value={phone} placeholder="name@example.com" onChange={(e)=>setPhone(e.target.value)}/>
                    <label for="empphone">Enter Employee Phone Number</label>
                  </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="emprole" name="emprole" value={role} placeholder="name@example.com" onChange={(e)=>setRole(e.target.value)}/>
                    <label for="emprole">Enter Employee Role</label>
                  </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="emprole" name="emprole" value={password} placeholder="name@example.com" onChange={(e)=>setPassword(e.target.value)}/>
                    <label for="emprole">Enter Employee Temporary password</label>
                  </div>
                  <button className="btn btn-dark" type="submit">Update</button>   
                </form>
                  <a href="/adminusers"><button className="btn btn-dark back-btn" type="submit">Back</button> </a>  
            </div>
        </div>
    </div>
    )
}

export default AdminUpdate;