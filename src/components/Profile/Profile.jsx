import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./profile.css";
import profileImageDefault from "../images/profileImage.png";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-responsive-modal";
import { ChangePassword } from "./changePassword/ChangePassword";
import { EditProfilePopup } from "./EditProfilePopup";
import { NewEditProfileImagePopup } from "./changeProfileImage/NewEditProfileImagePopup";
import { BiEditAlt } from 'react-icons/bi';
import axios from "axios";
export const Profile2 = ({ toshowEditOption = true }) => {
  const [currentUser, setCurrentUser] = useState();
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  // const image = user?.data.details.myImageFile ? user?.data.details.myImageFile : user?.data.user.myImageFile;
  // const image = user?.data.details.myImageFile;
  // const newImage = user?.data.user.myImageFile;
  const image = user?.data.details.myImageFile;
  // const newImage = user?.data.details.myImageFile;
  // console.log(newImage);
  console.log(image);
  const [profileimage, setProfileImage] = useState(image);
  console.log('new imagge',profileimage);
  // const dispatch = useDispatch();
  console.log("user chaiyeko wala", user);
  // setProfileImage(user?.data.details.myImageFile);
  // console.log(profileimage);
  // setCurrentUser(user)
  // useEffect(() => {
  //   const userJSON = localStorage.getItem("user");
  //   const user = JSON.parse(userJSON);
  //   // console.log(user.data.details.email);
  //   // if (user) {
  //   //   // const userFullname = user.data.details.fullname;
  //   //   setCurrentUser(user);
  //   // }
  //   const getUserDetails = async () => {
  //     const response = await axios.post(
  //       "http://www.localhost:8000/api/auth/checkifuserexist",
  //       { email: user.data.details.email }
  //     );
  //     // console.log(response);
  //     setCurrentUser(response);
  //     setProfileImage(response?.data.user.myImageFile);
  //   };
  //   getUserDetails();
  // }, []);

  // console.log(currentUser?.data.details.email);
  // const userEmail = currentUser?.data.details.email;
  // console.log(currentUser.data.details.email);
  // const fullname = fullname
  // console.log(fullname);
  // console.log();
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [openEditProfileImage, setOpenEditProfileImage] = useState(false);
  const { state } = useLocation();
  const sendToggleForChangePass = false;
  const sendToggleForChangePasssss = state?.sendToggleForChangePass || false;

  // const getUserDetails = async () => {
  //   const response = await axios.post(
  //     "http://www.localhost:8000/api/auth/checkifuserexist",
  //     {email:userEmail}
  //   );
  //   console.log(response);
  // };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);
  // console.log(currentUser?.data.user.myImageFile);
  // console.log(profileimage);
  // useEffect(() => {
  //   console.log("Updated profileimage:", profileimage);
  // }, [profileimage]);
  // console.log(profileimage);
  // console.log(profileImage);
  const [fortogglerandom, setForToggleRandom] = useState(false);

  const handleAfterCloseOtp = () => {
    setForToggleRandom(true);
  };
  return (
    <div
      className="flex flex-col items-center py-9 md:mt-6  w-[100%] lg:w-[550px] profile-main"
      style={{
        backgroundColor: "#F9FBFF",
        borderRadius: "10px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <div className="flex flex-col items-center gap-2 md:gap-5">
        <span className="text-xl md:text-3xl mb-3  font-serif text-[#3F26A5] pro-title">
          My Profile
        </span>
        <div
          className={`relative group p-2 md:p-3 flex items-center justify-center edit-img`}
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "50%",
          }}
        >
          <div>
            {/* {image !== null ? (
              <img
                src={image}
                alt="Profile picture"
                className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] md:p-1"
              />
            ) : (
              <img
                src={profileImageDefault}
                alt="Profile picture"
                className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]"
              />
            )} */}
            {profileimage !== null ? (
              <img
                src={profileimage}
                alt="Profile picture"
                className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] md:p-1"
              />
            ) : (
              <img
                src={profileImageDefault}
                alt="Profile picture"
                className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px]"
              />
            )}
          </div>
          <div
            className="cursor-pointer absolute left-3/4 bottom-0 md:bottom-3  flex gap-1 md:gap-3 choose-img"
            onClick={() => setOpenEditProfileImage(!openEditProfileImage)}
          >
            <div className="border rounded-full bg-[#f1f3f4] p-2 lg:block hidden">
              {/* <img
                className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] md:w-[24px] md:h-[24px] object-fill"
                src="./icons8-edit-64.png" alt="edit-image"
              />  */}
             <BiEditAlt style={{color:"#3876BF"}}/>
            </div>
          </div>
          {/* //for small screens */}
          {/* <div
            className="cursor-pointer absolute left-3/4 bottom-2 md:bottom-4 opacity-100 flex gap-1 md:gap-3"
            onClick={() => setOpenEditProfileImage(!openEditProfileImage)}
          >
            <div className="border rounded-full bg-[#f1f3f4] p-1  lg:hidden block object-fill">
              <img
                className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] md:w-[24px] md:h-[24px] object-fill"
                src="./icons8-edit-64.png" alt="edit-image"
              /> 
              
            </div>
          </div> */}
        </div>
        {openEditProfileImage && (
          <NewEditProfileImagePopup
            openEditProfileImage={openEditProfileImage}
            setOpenEditProfileImage={setOpenEditProfileImage}
            setProfileImage={setProfileImage}
          />
        )}
        <div className=" flex flex-col mb-2 md:flex-row gap-5 md:gap-20 cursor-pointer hover:text-[#3A45B4] mt-2 md:mt-2">
          <div
            className="flex gap-2 items-center justify-center"
            onClick={() => setOpenEditPopup(!openEditPopup)}
          >
            <img src="./icons8-edit-64.png" className="w-[16px] h-[16px]" />
            <p className="font-light ">Edit Profile</p>
          </div>
        </div>
        {openEditPopup && (
          <EditProfilePopup
            openEditPopup={openEditPopup}
            setOpenEditPopup={setOpenEditPopup}
          />
        )}
        <div className="flex flex-col gap-1 md:gap-2">
          <h1 className="mt-0 text-center md:mt-0 text-lg md:text-2xl font-medium">
            {/* {user.data} */} {user?.data.details.fullname}
          </h1>

          <p className="text-md md:text-[18px] text-center">
            {user?.data.details.phonenumber}
          </p>
          <p
            style={{ color: "#19A7CE" }}
            className="text-center text-md md:text-[16px] mb-2"
          >
            {user?.data.details.email}
          </p>
        </div>
      </div>
      {state?.sendToggleForChangePass && (
        <Modal
          center
          open={state.sendToggleForChangePass}
          onClose={handleAfterCloseOtp}
          classNames={{
            overlay: "customOverlay",
            modal: "customModal",
            closeButton: "closeIconInChangePassword",
          }}
        >
          <ChangePassword />
        </Modal>
      )}
    </div>
  );
};
