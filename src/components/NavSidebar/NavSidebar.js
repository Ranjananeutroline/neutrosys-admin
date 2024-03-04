import React, { useState, useEffect, useRef } from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from './NavbarElements';
import { BiSolidDashboard } from "react-icons/bi";
import { FaUserClock } from "react-icons/fa";
import { PiSpeakerSimpleHighFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import "./NavSidebar.css";
import { useLocation } from 'react-router-dom';

const NavSidebar = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true); // Initialize as open

  useEffect(() => {
    // Check the current route and determine whether to show the sidebar
    if (location.pathname === '/dashboard' || location.pathname === '/appointment' || location.pathname === '/users'|| location.pathname === '/company'|| location.pathname === '/announcement' || location.pathname === '/settings') {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [location]);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (sidebarOpen && !event.target.closest('.NavSidebar')) {
        closeSidebar();
      }
    };
  
    document.addEventListener('click', handleDocumentClick);
  
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [sidebarOpen]);

  return (
    <div  className={`NavSidebar ${sidebarOpen ? 'open' : ''}`}>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to='/dashboard' activeStyle>
            <BiSolidDashboard style={{ marginTop: "5px" }} className="nav-svg"/>
            <span className="mobile-text">Dashboard</span>
          </NavLink>
          <NavLink to='/appointment' activeStyle>
            <FaUserClock style={{ marginTop: "5px" }} className="nav-svg"/>
            <span className="mobile-text">Appointment</span>
          </NavLink>
          <NavLink to='/announcement' activeStyle>
            <PiSpeakerSimpleHighFill style={{ marginTop: "5px" }} className="nav-svg"/>
            <span className="mobile-text">Announcement</span>
          </NavLink>
          <NavLink to='/settings' activeStyle>
            <IoMdSettings style={{ marginTop: "5px" }} className="nav-svg"/>
            <span className="mobile-text">Settings</span>
          </NavLink>
        </NavMenu>
      </Nav>
    </div>
  );
};

export default NavSidebar;