import React, { useEffect, useState } from "react";
import '../styles/admindashboard.css';
import valtechLogo from '../assets/valtech-logo.jpg'
import { createSeats, deleteSeats, fetchSeats } from "../api";

let AdminSeat=()=>{
    const [isActive, setIsActive] = useState(false);
    const [isClicked,setIsClicked]=useState(false);
    const [floor,setFloor]=useState('');
    const [seats,setSeat]=useState('');
    const [data,setData]=useState(null);

    useEffect(()=>{
        fetchSeats().then(res=>{
          console.log(res.data);
          setData(res.data);
        });
      },[])

  function toggleSidebar() {
    setIsActive(!isActive);
  }
  function toggleForm(){
    setIsClicked(!isClicked);
  }

  const clearLocalStorage=()=>{
    window.localStorage.clear();
   }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    let data={
        floor,
        seats
    }
    const response=await createSeats(data);
    if(response.data.success==true){     
        alert('Seats addedd successfully');
        window.location = "/adminseat"
      }else{
        alert('Failed adding seat');
      }
  
      e.target.reset();
  }

  const handleUpdate=async (id,floor,seats)=>{
    localStorage.setItem("id", id);
    localStorage.setItem("floor", floor);
    localStorage.setItem("seats", seats);
    window.location="/seatupdate";
  }

  const handleDelete = async (id) => {
    // alert(id)
    const deleteResponse = await deleteSeats(id);
    if (deleteResponse.data.success == true) {
      alert("Seat information deleted successfully");
      window.location = "/adminseat";
    } else {
      alert("Failed deleting seat information");
    }
    window.location = "/adminseat";
  };
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
                    <a href="/adminusers">
                        <span className="icon"><ion-icon name="people-sharp"></ion-icon></span>
                        <span className="name">Users</span>
                    </a>
                </li>
                <li>
                    <a href="/adminseat" className="active-tab">
                        <span className="icon"><ion-icon name="desktop-sharp"></ion-icon></span>
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
            <button class="btn btn-secondary add-btn" onClick={toggleForm}>Add Seat</button>
            <form id={`${isClicked?'form-show':'form-hide'}`} onSubmit={handleSubmit}>              
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" name="from" id="from" required onChange={(e)=>setFloor(e.target.value)}/>
                  <label for="from">Floor Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="number" className="form-control" name="to" id="to" required  onChange={(e)=>setSeat(e.target.value)}/>
                  <label for="to">Total seats</label>
                </div> 
                
                <button className="btn btn-secondary">Submit</button>
            </form>
            </div>
            <h2>Seat Records</h2> 
            <div className="table-container table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Floor Name</th>
                          <th scope="col">Total Seats</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        { data && (
                          data.map((item,idx)=>{
                            return(
                              <tr key={idx}>
                                <th scope="row">{idx+1}</th>
                                <td>{item.floor}</td>
                                <td>{item.seats}</td>
                                <td><button className="btn btn-success" onClick={()=>handleUpdate(item._id,item.floor,item.seats)}>Edit</button></td>
                                <td><button className="btn btn-danger" onClick={()=>handleDelete(item._id)}>Delete</button></td>
                              </tr>
                            )
                          })
                          )
                        }
                      </tbody>
                  </table>
                </div>
        </div>
    </div>
    )
}

export default AdminSeat;