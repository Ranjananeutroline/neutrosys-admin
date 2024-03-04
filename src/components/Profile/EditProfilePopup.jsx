import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { Formik, useFormik } from "formik";
import { basicSchema } from "../../schemas";
import "./profile.css";
import axios from "axios";
import deactivateaccountimg from "../images/profile.svg";
// import changepasswordimg from "../images/lock-icon.svg";
import { DeactivateAccount } from "./deactivateAccount/DeactivateAccount";
import OtpPage from "./otpPageForPasswordChange/OtpPage";
import OtpPageFInal from "./otpPageForPasswordChange/OtpPageFinal";
import "./editprofiletry.css";
import { userDetailsUpdate } from "../../redux/actions/authAction";

export const EditProfilePopup = ({ openEditPopup, setOpenEditPopup }) => {
  const notify = () =>
    toast.success("Profile is Updated successfully!!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const dispatch = useDispatch();

  const [openDeactivatePopup, setOpenDeactivatePopup] = useState(false);
  const [openChangePasswordPopup, setOpenChangePasswordPopup] = useState(false);
  const [openOtpPopup, setOpenOtpPopup] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
  console.log('oh yeah user is', user);

    
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);

  const handleUpdateBtn = () => {
    navigate("/");
  };
  const handleDeactivateAccountPopup = () => {

    setOpenDeactivatePopup(true);
  };
  const handleOtpPopup = async() => {
    const useremail = user.data.details.email;
    const response = await axios.post(
      "http://localhost:8000/api/auth/sendOtp",
      { email: useremail }
    );
    console.log(response);
    setOpenOtpPopup(true);
  };
  const handleChangePasswordPopup = () => {
    setOpenChangePasswordPopup(true);
  };
  const closeEditPopup = () => {
    setOpenEditPopup(false);
  };
  const onSubmit = async (values, actions) => {
    console.log("here");
    const fullname = values.fullname;
    const phonenumber = values.phonenumber;
   const email = user.data.details.email;
    // const email = values.email;
    // dispatch()
    const success = await dispatch(
      userDetailsUpdate({ fullname: fullname, email:email, phonenumber:phonenumber})
    );
    // localStorage.setItem("user", success)
    // const response = await axios.post(
    //   "http://www.localhost:8000/api/auth/updateuserdetails",
    //   { fullname,email,phonenumber }
    // );
    console.log('success bho',success);
    actions.resetForm();
    closeEditPopup()
    notify();
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      fullname: "",
      // email: "",
      phonenumber: "",
      // dateofbirth: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  

  // console.log(errors);
  return (
    <Modal
      center
      open={openEditPopup}
      onClose={closeEditPopup}
      classNames={{ overlay: "customOverlayTry", modal: "customModalTry" }}
    >
      <div className="w-full h-full bg-[#FFFFFF] rounded-[10px]">
        <div className="w-full  rounded-t-[10px] flex items-center justify-center">
          <h1 className=" p-4 text-[16px] md:text-[25px] tracking-wide font-[500]">
            {" "}
            Update Your Profile
          </h1>
        </div>

        <form onSubmit={handleSubmit}
          className="flex flex-col w-full h-full justify-center items-center gap-3 md:gap-3 px-4 sm:px-10 mt-2"
          
        >
          <input
            className={`w-full border-none rounded-[5px]  text-[12px] h-[39px] pl-[12px] border-[0.3px]   focus:bg-white focus:outline-none focus:ring-1   placeholder:text-[#8B8989] bg-[#dceaff80] shadow-shado2  placeholder:text-[13px] sm:w-[400px] md:w-[500px] md:h-[45px] md:placeholder:text-[15px] ${
              errors.fullname && touched.fullname ? "input-error" : ""
            }`}
            type="text"
            value={values.fullname}
            id="fullname"
            onChange={handleChange}
            placeholder="Full Name"
            style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px"}}
          />

          {/* <input
            className={`w-full border-none rounded-[5px]  text-[14px] h-[39px] pl-[12px] border-[0.5px]   focus:bg-white focus:outline-none focus:ring-1   placeholder:text-[#8B8989] bg-[#dceaff4d] shadow-shado2  placeholder:text-[13px] sm:w-[400px] md:w-[500px] md:h-[45px] md:placeholder:text-[15px] ${
              errors.email && touched.email ? "input-error" : ""
            }`}
            value={values.email}
            onChange={handleChange}
            id="email"
            type="text"
            placeholder="Enter your Email"
          /> */}

          <input
            className={`w-full border-none rounded-[5px]  text-[12px] h-[39px]  pl-[12px] border-[0.3px]   focus:bg-white focus:outline-none focus:ring-1   placeholder:text-[#8B8989] bg-[#dceaff80] shadow-shado2  placeholder:text-[13px] sm:w-[400px] md:w-[500px] md:h-[45px] md:placeholder:text-[15px] ${
              errors.phonenumber && touched.phonenumber ? "input-error" : ""
            }`}
            type="number"
            id="phonenumber"
            onChange={handleChange}
            value={values.phonenumber}
            placeholder="Phone Number"
            style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px"}}
          />

          {/* <input
            className={`dateedit w-full border-none rounded-[5px]  text-[#8B8989] h-[39px] pl-[12px] border-[0.5px]   focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#dceaff4d] shadow-shado2  placeholder:text-[13px] sm:w-[400px] md:w-[500px]  md:h-[45px] md:placeholder:text-[15px]  ${
              errors.dateofbirth && touched.dateofbirth ? "input-error" : ""
            }`}
            type="date"
            name="dateofbirth"
            onChange={handleChange}
            value={values.dateofbirth}
            placeholder="Date of Birth"
          /> */}

          <button
          style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px"}}
            className="w-full py-2 md:py-2 rounded-[10px] font-poppins font-[600] text-[16px]  bg-[#60BFE5] hover:bg-[#60bfe5c2] active:bg-[#2C3477] text-white mt-2 "
            disabled={isSubmitting}
            type="submit"
          >
            Update
          </button>
        </form>

        <div className="flex flex-wrap justify-center sm:justify-between gap-1 sm:gap-4 md:gap-0 px-4 sm:px-10 py-5 bottom-edit">
          <div
            className="flex  cursor-pointer text-[#707074] hover:text-[#2222a2] active:text-[#0b0b32]"
            onClick={handleOtpPopup}
          >
            <div className="w-[180px] flex gap-1 sm:gap-2">
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
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <p className="font-poppins text-[14px] sm:text-[16px] ">
                Change Password
              </p>
            </div>
          </div>
          {openOtpPopup && (
            <OtpPageFInal
              openOtpPopup={openOtpPopup}
              setOpenOtpPopup={setOpenOtpPopup}
            />
          )}

          <div
            className="flex  cursor-pointer  text-[#707074] hover:text-[#2222a2] active:text-[#0b0b32]"
            onClick={handleDeactivateAccountPopup}
          >
            <div className="w-[180px] flex gap-1 sm:gap-2">
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
                  d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>

              <p className=" font-poppins text-[14px] sm:text-[16px] text-[#707074] hover:text-[#2222a2] active:text-[#0b0b32]">
                Deactivate Account
              </p>
            </div>
          </div>
          {openDeactivatePopup && (
            <DeactivateAccount
              openDeactivatePopup={openDeactivatePopup}
              setOpenDeactivatePopup={setOpenDeactivatePopup}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
