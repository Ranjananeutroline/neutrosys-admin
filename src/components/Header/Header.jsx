// import React, { useState } from "react";
// import Neutroline_logo from "../../assets/Neutroline_logo.png";
// import header_bell from "../../assets/header_bell.svg";
// import header_avatar from "../../assets/header_avatar.png";
// import header_down from "../../assets/header_down.png";
// import "./header.css";


// const Header = () => {
  
//   return (
//     <div>
//       <div className="header-div">
//         <div className="flex items-center logo-title">
//           <img
//             src={Neutroline_logo} 
//             className=" w-[60px] h-[50px]  md:w-[117px] md:h-[70px]"
//           />
//           <h3 className=" text-[15px] text-white md:text-[30px] drop-shadow-lg ">
//             Neutrosys Inc.
//           </h3>
//         </div>

//         <div className="flex justify-self-end items-center mr-3">
//           <img
//             src={header_bell}
//             className=" h-[30px] w-[23px] md:h-[30px] md:w-[30px] md:mr-[8px] "
//           />
//           <h3 className=" text-[13px] hidden md:mr-[8px] md:text-[15px] md:block ">
//             Pooja Tiwari
//           </h3>
//           <h3 className=" md:hidden text-[13px] p-1">
//             Pooja 
//           </h3>
//           <img
//             src={header_avatar}
//             className="h-[30px] w-[30px] mr-[10px] md:h-[30px] md:w-[30px]"
//           />
//           <img
//             src={header_down}
//             className="h-[13px] w-[13xpx] mr-[32px] md:h-[16px] md:w-[16px]"
//           />
//         </div>
//       </div>
//     </div>

//   );
// };

// export default Header;

import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Neutroline_logo from "../images/Neutroline_logo.png";
import header_bell from "../images/header_bell.svg";
import header_avatar from "../images/user.png";
import header_down from "../images/header_down.png";
import menu from "../images/menu.png";
import dashboard from "../images/dashboard.png";
import appointment from "../images/appointment.png";
import announcement from "../images/announcement.png";
import { useNavigate } from "react-router-dom";
import settings from "../images/settings.png";
import profile from "../images/admin-photo.png";
import logout from "../images/logout-icon.png";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "../../redux/actions/authAction.js";
import "./header.css";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUserClock } from "react-icons/fa";
import { PiSpeakerSimpleHighFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { ImUser } from 'react-icons/im';

const swipeOpenMenuStyles = {
  float: "left",
  position: "fixed",
  width: "350px",
  height: "100%",
  border: "2px dashed gray"
};


export const Header = () => {
  const [open, setOpen] = useState(false);
  const [swipeOpen, setSwipeOpen] = useState(false);
  console.log("main toh too gaya",swipeOpen);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedRight: () => setSwipeOpen(true),
    onSwipedLeft:()=> setOpen(false)
  });

  const handleDropdownToggle = () => {
    setProfileDropDown(!profileDropDown);
  };

  const handleProfileNavigation = () => {
    handleDropdownToggle();
    navigate("/profile");
  };
  const handleLogoutNavigation = async() => {
    handleDropdownToggle();
    try {
      const success = await dispatch(
        userlogout()
      );
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header  className="border-b  z-10 border-gray-300 sticky top-0 header">
      
      <div className="flex items-center justify-between lg:mr-4 mx-0 mx-auto flex-wrap relative inner-header">
        <FiMenu
          className="lg:hidden  h-6 w-6 cursor-pointer ml-2 sm:ml-5 md:ml-10 mob-menu"
          onClick={() => setOpen(!open)}
        />
        <Link to="/dashboard">
          <div className="flex items-center">
            <img
              src={Neutroline_logo}
              className=" w-[65px] h-[45px]  md:w-[90px] md:h-[60px]"
            />
            <h3 className=" md:text-[30px] text-[white] logo-title">
              Neutrosys Inc.
            </h3>
          </div>
        </Link>
        <div className="flex items-center relative">
          <img
            src={header_bell}
            className=" h-[30px] w-[23px] md:h-[30px] md:w-[30px] mr-[5px] md:mr-[14px]"
          />
          <ImUser style={{color:"#adff2fd4"}}
          className="relative cursor-pointer h-[30px] w-[30px] mr-[15px] mb-[2px] md:h-[30px] md:w-[30px] user-icon"
          onClick={handleDropdownToggle}
          />
          {/* <img
            src={header_avatar}
            className="relative cursor-pointer h-[30px] w-[30px] mr-[10px] md:h-[40px] md:w-[40px]"
            onClick={handleDropdownToggle}
          /> */}
          {profileDropDown && (
            <div className="absolute top-10 right-1 dropdown-content flex flex-col gap-3 bg-[#F6F8FC] px-5 py-3  shadow-lg  transition duration-200">
              <div
                className="flex gap-3  text-[#000000] hover:text-[#2222a2] active:text-[#0b0b32] "
                onClick={handleProfileNavigation}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>

                <a href="#" className="">
                  Profile
                </a>
              </div>

              <div
                className="flex gap-3  text-[#000000] hover:text-[#2222a2] active:text-[#0b0b32]"
                onClick={handleLogoutNavigation}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>

                <a href="#">Logout</a>
              </div>
            </div>
          )}
        </div>

        <nav
          className={`${
            open ? "block" : "hidden"
          }   absolute top-[100%] h-screen bg-[white] pb-5 nav-div`} {...handlers}
        >
          <ul
            className={`${
              open ? "hidden" : "hidden"
            } text-base text-gray-700 lg:flex lg:justify-between lg:items-center`}
          >
          </ul>
          <ul
            className={`${
              open ? "block" : "hidden"
            } text-base text-black font-medium lg:justify-between lg:hidden block mx-1 p-2`}
          >
            <li>
              <div
                className={`flex  h-[47px]  w-[160px] md:w-[200px] items-center justify-center mt-[8px] 
            rounded-md p-[20px] border bg-[#1a98ecbd]
             ${
               open ? "w-[289]" : "w-[60px] p-[0px] ml-0"
             } relative duration-300 `}
                onClick={() => {
                  setOpen(!open);
                  navigate("/dashboard");
                }}
              >
                <div className="flex gap-2 items-center w-[160px] ">
                <BiSolidDashboard style={{color:"white"}}/>
                  <h3
                    className={`${
                      !open && "hidden"
                    } text-[14px] text-[white] font-normal`}
                  >
                    Dashboard
                  </h3>
                </div>
                
              </div>
            </li>
            
           
            <li>
              <div
                className={`flex  h-[47px]  w-[160px] md:w-[200px] bg-[#1a98ecbd]  items-center justify-center mt-[8px] 
             rounded-md gap-5 p-[20px] border
             ${
              open ? "w-[289]" : "w-[60px] p-[0px] ml-0"
            } relative duration-300 `}
               onClick={() => {
                 setOpen(!open);
                 navigate("/appointment");
               }}
             >
                <div className="flex gap-2 items-center  w-[200px]">
                <FaUserClock style={{color:"white"}}/>
                  <h3
                    className={`${
                      !open && "hidden"
                    } text-[14px] text-[white] font-normal`}
                  >
                    Appointment
                  </h3>{" "}
                </div>
              </div>
            </li>
            {/* <li>
              <div
                className={`flex  h-[47px] w-[200px] bg-white  items-center justify-center mt-[15px] 
            mt-[18px] rounded-md gap-5 p-[20px] border
            ${
              open ? "w-[289]" : "w-[60px] p-[5px] ml-0"
            }  relative duration-300`}
              >
                
                <div className="flex gap-3 items-center  w-[200px]">
                  <img src={announcement} className="w-[20px] h-[20px]" />
                  <h3
                    className={`${
                      !open && "hidden"
                    } text-[14px] md:text-[20px]`}
                  >
                    Announcement
                  </h3>{" "}
                </div>
              </div>
            </li> */}
            <li>
              <div
                className={`flex  h-[47px]  w-[160px] md:w-[200px] items-center bg-[#1a98ecbd] justify-center mt-[8px] 
             rounded-md gap-5 p-[20px] border 
             ${
              open ? "w-[289]" : "w-[60px] p-[0px] ml-0"
            } relative duration-300 `}
               onClick={() => {
                 setOpen(!open);
                 navigate("/announcement");
               }}
             >
                <div className="flex gap-2  items-center  w-[200px]">
                <PiSpeakerSimpleHighFill style={{color:"white"}}/>
                  <h3
                    className={`${
                      !open && "hidden"
                    } text-[14px] text-[white] font-normal`}
                  >
                    Announcement
                  </h3>{" "}
                </div>
              </div>
            </li>
            <li>
              <div
                className={`flex  h-[47px]  w-[160px] md:w-[200px] bg-[#1a98ecbd] items-center justify-center mt-[8px] 
               rounded-md gap-5 p-[20px] border
               ${
                open ? "w-[289]" : "w-[60px] p-[0px] ml-0"
              } relative duration-300 `}
                 onClick={() => {
                   setOpen(!open);
                   navigate("/settings");
                 }}
               >
                <div className="flex gap-2 items-center  w-[200px]">
                <IoMdSettings style={{color:"white"}}/>
                  <h3
                    className={`${
                      !open && "hidden"
                    } text-[14px] text-[white] font-normal`}
                  >
                    Settings
                  </h3>{" "}
                </div>
              </div>
            </li>
            {/* <li>
              {" "}
              <div
                className={`flex w-[200px] h-[47px]  items-center mt-[15px] 
            rounded-md p-[20px]
             ${
               open ? "w-[289]" : "w-[60px] p-[5px] ml-0"
             } relative duration-300 `}
                onClick={() => {
                  setOpen(!open);
                  navigate("/profile");
                }}
              >
                <div className="flex ml-3 justify-center gap-3 items-center">
                  <img src={profile} className="w-[20px] h-[20px]" />
                  <h3
                    className={`${
                      !open && "hidden"
                    } text-[14px] md:text-[20px]`}
                  >
                    Profile
                  </h3>
                </div>
              </div>
            </li> */}
            {/* <li>
              <div
                className={`flex w-[200px] h-[47px] items-center mt-[5px] 
            rounded-md p-[20px]
             ${
               open ? "w-[289]" : "w-[60px] p-[5px] ml-0"
             } relative duration-300 `}
              >
                <div className="flex ml-3 justify-center gap-3 items-center">
                  <img src={logout} className="w-[20px] h-[20px]" />
                  <h3
                    className={`${
                      !open && "hidden"
                    } text-[14px] md:text-[20px]`}
                  >
                    Logout
                  </h3>
                </div>
              </div>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};
