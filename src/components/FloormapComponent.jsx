import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createBookings, fetchSeat, updateSeatAvailability, updateUserBooking, userRecords } from "../api";
import seat from '../assets/seat.png'
import '../styles/floormap.css'

let FloorMap=()=>{

  let type=window.localStorage.getItem("type");
  let from=window.localStorage.getItem("from");
  let to=window.localStorage.getItem("to");
  let shift=window.localStorage.getItem("shift");
  let food=window.localStorage.getItem("food");
  let floor=window.localStorage.getItem("floor");
  let noOfSeats=window.localStorage.getItem("noOfSeats");
  let bookedSeats=window.localStorage.getItem("bookedSeats")
  
  const [selectedSeat,setSelectedSeat]=useState('')
  const [userData,setUserData]=useState({
    id:'',name:'',email:'',phone:'',role:'',password:'',booking:{id:'0',type:'0' ,fromDate: '0',toDate:'0',shift:'0',floor: '0',seat:'0',status:''}
      
  })
  console.log(userData)

  const logData=async()=>{
    let data={
      token:window.localStorage.getItem("token")}
    let response=await userRecords(data)
    setUserData(response.data.data);
    }

    const getSeat=async(floor)=>{    
      let response=await fetchSeat(floor);
      let seats=response.data.seats;
      let bookedSeats=response.data.bookedSeats;
      window.localStorage.setItem("bookedSeats",bookedSeats)
      window.localStorage.setItem("noOfSeats",seats);
      
    };

 useEffect(()=>{  
    logData();
    getSeat(floor);
  }
 ,[])


  const handleSeatSelection = (event) => {
    setSelectedSeat(event.target.value);
  };

  const generateSeatContainers =  () => {
    const seatContainers = [];
    for (let i = 1; i <= noOfSeats; i++) {
      const seatContainer = (
        <div className="seat-container" key={i}>
          <img src={seat} alt="Image" />
          <label>
            <input
              type="radio"
              name="seat"
              value={i}
              onClick={handleSeatSelection}
              disabled={bookedSeats.includes(i)}
            />
            <h6>{i}</h6>
          </label>
        </div>
      );

      seatContainers.push(seatContainer);
    }

    return  seatContainers;
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();
    let bookId=Math.floor(Math.random() * 9000+ 1000)+userData.id;
    // console.log(bookId);
    let seat={
      floor,
      selectedSeat
    }
    
    let data={
      id:userData.id,
      booknId:bookId,
      type:type,
      from:from,
      to:to,
      shift:shift,
      food:food,
      floor:floor,
      seat:selectedSeat,
      status:"active"
    }
    if(selectedSeat!==''){
    const createResponse = await createBookings(data);
    // console.log(createResponse);
    const updateResponse=await updateUserBooking(data);
    // console.log(updateResponse);
    const updateBookedResponse=await updateSeatAvailability(seat);
      console.log(updateBookedResponse.data);


    if(createResponse.data.success==true && updateResponse.data.success==true && updateBookedResponse.data.success==true){           
      // alert('Seat booked successfully');
      window.location = "/booksuccess"
    }else{
      alert('Failed booking seat');
      window.location = "/home"
    }
  }else{
    alert("Please select seat");
  }
    
  }

  const clearLocalStorage=()=>{
    window.localStorage.clear();
   }

    return (
        <div className="floormap-body">
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
                  <a className="nav-link " aria-current="page" href="/home">Home</a>
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

            
      <main className="floor-container">
        <div className="button-container">
          <button id="btn1" className="btn btn-secondary">Floor : {floor}</button>
          <button id="btn2" className="btn btn-secondary">Seat : {selectedSeat} </button>
        </div>
        <div className="map-design">
            <form onSubmit={handleSubmit}>   
            <div id="form-container">
            {generateSeatContainers()}
              </div>     
            <div className="submit-button">
            <button id="book-btn" className="btn btn-secondary">Book Seat</button>
            </div>
            </form>
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

export default FloorMap;