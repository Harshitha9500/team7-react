import React, { useEffect, useState } from "react";
import '../styles/admindashboard.css';
import valtechLogo from '../assets/valtech-logo.jpg'
import {updateSeats} from '../api/index';

let AdminSeatUpdate=()=>{
    const [isActive, setIsActive] = useState(false);
    const [id, setId] = useState('');
    const [floor, setFloor] = useState('');
    const [seat, setSeat] = useState('');

    function toggleSidebar() {
        setIsActive(!isActive);
      }

      const clearLocalStorage=()=>{
        window.localStorage.clear();
       }

      useEffect(()=>{
        setId(localStorage.getItem("id"));
        setFloor(localStorage.getItem("floor"));
        setSeat(localStorage.getItem("seats"));
        
      },[])

      const handleSubmit= async(e)=>{
        e.preventDefault();
        let data = {
            id,
            floor,
            seat      
          }
          const response = await updateSeats(data)
          if(response.data.success==true){     
            alert('Seat information edited successfully');
            window.location = "/adminseat"
          }else{
            alert('Failed editing seat information');
          }
      }
    return (
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
                    <a href="/adminusers" >
                        <span className="icon"><ion-icon name="people-sharp"></ion-icon></span>
                        <span className="name">Users</span>
                    </a>
                </li>
                <li>
            <a href="/adminseat" className="active-tab">
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
            <form onSubmit={handleSubmit}>              
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" name="from" id="from" required value={floor} onChange={(e)=>setFloor(e.target.value)}/>
                  <label for="from">Floor Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="number" className="form-control" name="to" id="to" required value={seat} onChange={(e)=>setSeat(e.target.value)}/>
                  <label for="to">Total seats</label>
                </div> 
                
                <button className="btn btn-secondary">Submit</button>
            </form>
            </div>
        </div>
    </div>
    )
}

export default AdminSeatUpdate;