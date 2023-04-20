import React, { useEffect, useRef, useState } from "react";
import '../styles/book.css'
import layout from '../assets/layout.jpg';
import { userRecords } from "../api";


let Book=()=>{
  const [minDate, setMinDate] = useState('');
  const [type, setType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] =useState('');
  const [shift, setShift] =useState('');
  const [food, setFood] =useState('');
  const [floor, setFloor] =useState('');
  const [userData,setUserData]=useState({
    id:'',name:'',email:'',phone:'',role:'',password:'',booking:{id:'0',type:'0' ,fromDate: '0',toDate:'0',shift:'0',floor: '0',seat:'0',status:false}
      
  })
  const [value,setValue]=useState("false");
  console.log(userData)

  const logData=async ()=>{
    let data={
      token:window.localStorage.getItem("token")}
    let response=await userRecords(data)
    setUserData(response.data.data);
    }

 useEffect(()=>{  
    logData();
  }
 ,[])

  function handleMinDate() {
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    setMinDate(formattedDate);
    setValue("true")
    console.log(value);
  }

  useEffect(() => {
    if (type == 'Daily') {
      setTo(from);
    } else if (type == 'Weekly') {
      const selectedDate = new Date(from);
      selectedDate.setDate(selectedDate.getDate() + 7);
      const newDate = selectedDate.toISOString().substr(0, 10);
      setTo(newDate);
    }
  }, [from]);

  const handleTodate=()=>{
    setValue("true")
  }

const clearLocalStorage=()=>{
  window.localStorage.clear();
 }

const handleSubmit=(e)=>{
  e.preventDefault();
  window.localStorage.setItem("type",type);
  window.localStorage.setItem("from",from);
  window.localStorage.setItem("to",to);
  window.localStorage.setItem("shift",shift);
  window.localStorage.setItem("food",food);
  window.localStorage.setItem("floor",floor);
  window.location="/floormap";
}
    return(
      
        <div className="book-body">
         
            <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <h3><a className="navbar-brand lineUp" href="/home">Valtech_</a></h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"></h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/home">Home</a>
                </li>
                {
                  userData.booking.id=='0' ?
                  <li className="nav-item">
                  <a className="nav-link btn btn-secondary" href="/book" >Book Seat</a>
                </li> :
                  <li className="nav-item">
                  <a className="nav-link btn btn-secondary" href="/bookdetails" >View Pass</a>
                </li>
                }
                <li className="nav-item">
                  <a className="nav-link" href="/profile">Profile</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={clearLocalStorage}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
            </header>
            <main className="booking-main-container">
        <div className="booking-image-container lineRight">
          <img src={layout} alt="layout" width="600" height="400"/>
        </div>
        <div className="booking-content lineUp">
          <h3>Seat Booking</h3>
          
          <div className="booking-details">
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <select className="form-select" name="type" id="type" required onChange={(e)=>setType(e.target.value)}>
                  <option selected></option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                </select>
                <label for="type">Select type of requests</label>
              </div>
              <div className="form-floating mb-3">
                <input type="date" className="form-control" name="from" id="from" required onChange={(e)=>setFrom(e.target.value)} min={minDate}  onFocus={handleMinDate}/>
                <label for="from">From Date</label>
              </div>
              <div className="form-floating mb-3">
                <input type="date" className="form-control" name="to" id="to" value={to} required disabled={value}/>
                <label for="to">To Date</label>
              </div>
              <div className="form-floating mb-3">
                <select className="form-select" name="shift" id="shift" required onChange={(e)=>setShift(e.target.value)}>
                  <option selected></option>
                  <option value="9am to 6pm">09:00AM - 06:00PM</option>
                  <option value="6am to 2pm">06:00AM - 02:00PM</option>
                  <option value="2pm to 10pm">02:00PM - 10:00PM</option>
                  <option value="10am to 6pm">10:00AM - 06:00PM</option>
                </select>
                <label for="shift">Shift time</label>
              </div>
              <div className="form-floating mb-3">
                <select className="form-select" name="food" id="food" required onChange={(e)=>setFood(e.target.value)}>
                  <option selected></option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <label for="food">Opting for lunch?</label>
              </div>
              <div className="form-floating mb-3">
                <select className="form-select" name="floor" id="floor" required onChange={(e)=>setFloor(e.target.value)}>
                  <option selected></option>
                  <option value="Ground Floor">Ground Floor</option>
                  <option value="Mezanine Floor">Mezz Floor</option>
                  <option value="First Floor">First Floor</option>
                  <option value="Second Floor">Second Floor</option>
                  <option value="Third Floor">Third Floor</option>
                  <option value="Training Room">Training Room</option>
                </select>
                <label for="floor">Select Floor</label>
              </div>
              <button className="btn btn-secondary">Next</button>
          </form>
          </div>
        </div>
      </main>
      <footer className="footer-container">
        <p>&copy; 2023 Valtech, India</p>
        <ul id="social-links">
          <li>
            <a href="https://www.instagram.com/explore/locations/611271258/valtech-india/"><span className="social-icon"><ion-icon name="logo-instagram"></ion-icon></span>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/valtech_india"><span className="social-icon"><ion-icon name="logo-twitter"></ion-icon>
            </span>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/valtech.india/"><span className="social-icon"><ion-icon name="logo-facebook"></ion-icon>
            </span>
            </a>
          </li>
        </ul>
      </footer>
        </div>
    )
}


export default Book;