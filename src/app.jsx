import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminBooking from "./components/AdminBookingComponent";
import AdminDashboard from "./components/AdminDashboardComponent";
import AdminReports from "./components/AdminReportsComponent";
import AdminSeat from "./components/AdminSeatComponent";
import AdminSeatUpdate from "./components/AdminSeatUpdateComponent";
import AdminUsers from "./components/AdminUsersComponent";
import AdminUpdate from "./components/AdminUserUpdateComponent";
import Book from "./components/BookComponent";
import BookDetails from "./components/BookDetailsComponent";
import BookSuccess from "./components/BookSuccessComponent";
import ChangePassword from "./components/ChangePasswordComponent";
import ChangeSuccess from "./components/ChangeSuccessComponent";
import FloorMap from "./components/FloormapComponent";
import ForgotPassword from "./components/ForgotPasswordComponent";
import Home from "./components/HomeComponent";
import Login from "./components/LoginComponent";
import Profile from "./components/ProfileComponent";
import SuccessMessage from "./components/SuccessMessageComponent";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />  {/* Router to render the Main Component */}            
            <Route path="/admin" element={<AdminDashboard />} />  {/* Router to render the Main Component */}            
            <Route path="/adminusers" element={<AdminUsers />} />  {/* Router to render the Main Component */}            
            <Route path="/adminbooking" element={<AdminBooking />} />  {/* Router to render the Main Component */}            
            <Route path="/adminreports" element={<AdminReports />} />  {/* Router to render the Main Component */}            
            <Route path="/adminseat" element={<AdminSeat />} />  {/* Router to render the Main Component */}            
            <Route path="/update" element={<AdminUpdate />} />  {/* Router to render the Main Component */}            
            <Route path="/seatupdate" element={<AdminSeatUpdate />} />  {/* Router to render the Main Component */}            
            <Route path="/forgot" element={<ForgotPassword />} />  {/* Router to render the Main Component */}            
            <Route path="/forgot/successmessage" element={<SuccessMessage />} />  {/* Router to render the Main Component */}            
            <Route path="/home" element={<Home />} />  {/* Router to render the Main Component */}            
            <Route path="/book" element={<Book />} />  {/* Router to render the Main Component */}            
            <Route path="/profile" element={<Profile />} />  {/* Router to render the Main Component */}            
            <Route path="/change" element={<ChangePassword />} />  {/* Router to render the Main Component */}            
            <Route path="/changesuccess" element={<ChangeSuccess />} />  {/* Router to render the Main Component */}            
            <Route path="/floormap" element={<FloorMap />} />  {/* Router to render the Main Component */}            
            <Route path="/booksuccess" element={<BookSuccess />} />  {/* Router to render the Main Component */}            
            <Route path="/bookdetails" element={<BookDetails />} />  {/* Router to render the Main Component */}            
          </Routes> 
        </BrowserRouter>
      </div>
    );
  }
}

export default App;