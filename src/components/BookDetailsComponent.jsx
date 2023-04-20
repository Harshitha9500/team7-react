import React, { useEffect, useState } from "react";
import { updateBookedSeats, updateBookings, updateUserBooking, updateUsers, userRecords } from "../api";
import '../styles/bookdetails.css'

let BookDetails=()=>{

  const [userData,setUserData]=useState({
    id:'',name:'',email:'',phone:'',role:'',password:'',booking:{id:'0',type:'0' ,fromDate: '0',toDate:'0',shift:'0',floor: '0',seat:'0',status:false}
      
  })
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


 const handleCancel=async ()=>{
  let data={
    id:userData.id,
      booknId:"0",
      type:"0",
      from:"0",
      to:"0",
      shift:"0",
      food:"0",
      floor:"0",
      seat:"0",
      status:"0"
  }   
    const response=await updateUserBooking(data);
    if(response.data.success==true){
      alert("Canceled seat successfully")
      window.location="/home";
    }else{
      alert("Problem with cancelling try after sometime")
    }

    let updateData=userData.booking.id;
    let bookId={
      id:updateData,
      status:"cancelled"
    }
    const updatedResponse=await updateBookings(bookId);
    console.log(updatedResponse)
    // if(updatedResponse.data.success==true){
    //   console.log("booking updated")
    // }

    let sentFloor=userData.booking.floor;
    let sentSeat=userData.booking.seat;
    console.log(sentFloor,sentSeat)
    let floorData={
      floor:sentFloor,
      seat:sentSeat
    }
    const updateBookSeat=await updateBookedSeats(floorData)
    console.log(updateBookSeat);
    
 }

 const clearLocalStorage=()=>{
  window.localStorage.clear();
 }
    return(
        <div className="bookdetails-body">
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

            <main className="seat-details-container">
            <div className="seat-details-content">
            <div className="seat">
            <h4><span className="icon-shape"><ion-icon name="id-card-sharp"></ion-icon></span> Name :  {userData.name}</h4>
            <h4><span className="icon-shape"><ion-icon name="pricetags-sharp"></ion-icon></span> ID : {userData.id}</h4> 
            </div>
            <div className="type">
                {userData.booking.type}
            </div>
            </div>
            <div className="seat-details-content">
            <div className="seat">
            <h4 className="book-details"><span className="icon-shape"><ion-icon name="calendar-sharp"></ion-icon></span>
                From Date : {userData.booking.fromDate}</h4>
            <h4 className="book-details"><span className="icon-shape"><ion-icon name="calendar-sharp"></ion-icon></span> To Date : {userData.booking.toDate}</h4> 
            <h4 className="book-details"><span className="icon-shape"><ion-icon name="time-sharp"></ion-icon></span> Shift Time :  {userData.booking.shift}</h4> 
            <h4 className="book-details"><span className="icon-shape"><ion-icon name="keypad-sharp"></ion-icon></span> Booked Seat Number : {userData.booking.seat}</h4> 
            <h4 className="book-details"><span className="icon-shape"><ion-icon name="keypad-sharp"></ion-icon></span> Booking ID : {userData.booking.id} </h4> 
            </div>
            </div>
            <div className="seat-details-content">
            <div className="seat">
            <h4><span className="icon-shape"><ion-icon name="business-sharp"></ion-icon></span>
                Floor : {userData.booking.floor}</h4>
            <h4><span className="icon-shape"><ion-icon name="location-sharp"></ion-icon></span> Branch Name : Bengaluru</h4> 
            </div>
        </div>
        <div className="submit-button">
          <button id="book-btn" className="btn btn-secondary" onClick={handleCancel}>Cancel Booking</button>
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

export default BookDetails;