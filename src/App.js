import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
} from "react-router-dom";
import Form from "./pages/SIGNUP/Form";
import Appointment from "./pages/Appointment/Appointment";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { DeactivateAccount } from "./components/Profile/deactivateAccount/DeactivateAccount";
import { ToastContainer, toast } from "react-toastify";
import Announcement from "./pages/AnnouncementPage/Announcement";
import "react-toastify/dist/ReactToastify.css";
import Offers from "./components/Announcement/Offers";
import Settings from "./pages/SettingsPage/Settings";
import LoginForm from "./pages/SIGNIN/LoginForm";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/userpov/Home";
import UserAppointment from "./pages/userpov/UserAppointment";
import { Header } from "./components/Header/Header";
import NavSidebar from "./components/NavSidebar/NavSidebar";
import "./app.css";


function App(item) {
  const user = useSelector((state) => state.auth.user);

  const location = useLocation();

  const isLoginPageOrSignup =
    location.pathname === "/" || location.pathname === "/signup";
    
    
  return (
    <div className="App">
      <ToastContainer style={{ width: "330px" }} />
      {/* {!isLoginPageOrSignup && (  */}
      {user && ( 
        <>
          <Header />
          <div className="opacity-100 overall-div">
            
              <NavSidebar/>
           
            <div className="w-[100%] right-body">
           
              <Routes>
                <Route exact path="/dashboard" element={<DashboardPage />} />
                <Route exact path="profile" element={<ProfilePage />} />

                <Route
                  exact
                  path="profile/deactivateAccount"
                  element={<DeactivateAccount />}
                />
                <Route exact path="announcement" element={<Announcement />} />
                <Route exact path="settings" element={<Settings />} />
                <Route exact path="profile" element={<ProfilePage />} />
                <Route exact path="/appointment" element={<Appointment />} />
              </Routes>
            </div>
          </div>
        </>
       )}
      {!user && ( 
        <div>
         <Routes>
            <Route exact path="/" element={<LoginForm />} />
            <Route exact path="/signup" element={<Form />} />
            <Route path="/userhome" element={<Home/>} />
          <Route path="/userappointment" element={<UserAppointment /> } />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
          </Routes>
        </div>
       )} 
      
    </div>
   
  );
}

export default App;
