import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { Modal } from "react-responsive-modal";
import "./changepassword.css";
import { basicPassSchema } from "../../../schemas/changepassSchema.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const ChangePassword = ({
  openChangePasswordPopup,
  setOpenChangePasswordPopup,
}) => {
  const [forToggle, setForToggle] = useState(true);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmNewPass, setShowConfirmNewPass] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const notify = () =>
    toast.success("Password changed successfully!!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    },{className: "toast-message"});

  const onSubmit = async(values, actions) => {
    notify();
    console.log(values);
    const newupdatedpassword = values.newpassword;
    const email = user?.data.details.email;
    const response = await axios.post("http://localhost:8000/api/auth/resetpassword",{password:newupdatedpassword, email:email})
    console.log('finallly response aayo password change', response);
    // navigate("/");
    
    actions.resetForm();
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
      oldpassword: "",
      newpassword: "",
      confirmnewpassword: "",
    },
    validationSchema: basicPassSchema,
    onSubmit,
  });

  const navigate = useNavigate();

  const toggleOldPasswordVisibility = () => {
    setShowOldPass(!showOldPass)
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPass(!showNewPass);
  };
  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPass(!showConfirmNewPass);
  };
  const handleDeactivatePopup = () => {
    setOpenChangePasswordPopup(false);
  };
  const handleCloseChangePasswordPopup = () => {
    setForToggle(!forToggle);
    navigate("/profile");
  };
  const UnShow = () => (
    <svg
      width="18"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Edit / Hide">
        <path
          id="Vector"
          d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  );
  const EyeIcon = () => (
    <svg
      width="18"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Edit / Show">
        <g id="Vector">
          <path
            d="M3.5868 13.7788C5.36623 15.5478 8.46953 17.9999 12.0002 17.9999C15.5308 17.9999 18.6335 15.5478 20.413 13.7788C20.8823 13.3123 21.1177 13.0782 21.2671 12.6201C21.3738 12.2933 21.3738 11.7067 21.2671 11.3799C21.1177 10.9218 20.8823 10.6877 20.413 10.2211C18.6335 8.45208 15.5308 6 12.0002 6C8.46953 6 5.36623 8.45208 3.5868 10.2211C3.11714 10.688 2.88229 10.9216 2.7328 11.3799C2.62618 11.7067 2.62618 12.2933 2.7328 12.6201C2.88229 13.0784 3.11714 13.3119 3.5868 13.7788Z"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  );
  return (
    <div>
      <Modal
        open={forToggle}
        onClose={handleCloseChangePasswordPopup}
        center
        classNames={{
          overlay: "customOverlay passwordOverlay",
          modal: "customModal passwordModal",
        }}
      >
        <div className=" flex flex-col gap-1 w-full items-center p-4 md:p-6 bg-[#FFFFFF]">
          <div className="flex flex-col gap-4 items-center w-full">
            <h1 className="text-[18px] md:text-[22px]">Change Your Password</h1>
            <div className="w-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                  style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px"}}
                    className={` w-full rounded-[5px]  text-[12px] h-[39px] m-0.5  border-[0.5px]   focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-500 placeholder:text-[#8B8989] bg-[#dceaff4d] shadow-shado2  placeholder:text-[13px]  md:w-[400px] md:h-[45px] md:placeholder:text-[14px] ${
                      errors.oldpassword && touched.oldpassword
                        ? "input-error"
                        : ""
                    }`}
                    type={showOldPassword ? "text" : "password"}
                    id="password"
                    name="oldpassword"
                    value={values.oldpassword}
                    onChange={handleChange}
                    placeholder="Old Password"
                  />
                  <div
                    className="absolute top-1/2 right-0 md:right-3 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    // Use the toggle function as the onClick handler
                  >
                    {values.oldpassword && (
                      <div className="mr-2" onClick={toggleOldPasswordVisibility}>
                        {showOldPass ? <UnShow /> : <EyeIcon />}
                      </div>
                    )}
                  </div>

                </div>
                <p className="text-left w-full pl-3  text-[11px] text-[red] mt-[-07px]">
                </p>
                <div className="relative">
                  <input
                  style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px"}}
                    className={`w-full rounded-[5px]  text-[12px] h-[39px] m-0.5  border-[0.5px]   focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-500 placeholder:text-[#8B8989] bg-[#dceaff4d] shadow-shado2  placeholder:text-[13px]  md:w-[400px] md:h-[45px] md:placeholder:text-[14px] ${
                      errors.newpassword && touched.newpassword
                        ? "input-error"
                        : ""
                    }`}
                    type={showNewPassword ? "text" : "password"}
                    id="newpassword"
                    name="newpassword"
                    value={values.newpassword}
                    onChange={handleChange}
                    placeholder="New Password"
                    // onBlur={handleBlur}
                  />
                  <div
                    className="absolute top-1/2 right-0 md:right-3 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {values.newpassword && (
                      <div className="mr-2" onClick={toggleNewPasswordVisibility}>
                        {showNewPass ? <UnShow /> : <EyeIcon />}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-left w-full pl-3  text-[11px] text-[red] mt-[-07px]">
                </p>
                <div className="relative">
                  <input
                  style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px"}}
                    className={`w-full rounded-[5px]  text-[12px] h-[39px] m-0.5  border-[0.5px]   focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-500 placeholder:text-[#8B8989] bg-[#dceaff4d] shadow-shado2  placeholder:text-[13px]  md:w-[400px] md:h-[45px] md:placeholder:text-[14px] ${
                      errors.confirmnewpassword && touched.confirmnewpassword
                        ? "input-error"
                        : ""
                    }`}
                    type={showConfirmNewPassword ? "text" : "password"}
                    id="confirmnewpassword"
                    name="confirmnewpassword"
                    value={values.confirmnewpassword}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                  />
                  <div
                    className="absolute top-1/2 right-0 md:right-3 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  >
                    {values.confirmnewpassword && (
                      <div className="mr-2" onClick={toggleConfirmNewPasswordVisibility}>
                        {showConfirmNewPass ? <UnShow /> : <EyeIcon />}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-left w-full pl-3  text-[11px] text-[red] mt-[-07px]">
                </p>
                <button
                style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px"}}
                  className="w-full h-[40px] rounded-[10px] font-poppins font-[600] text-[15.5px] bg-[#60BFE5] hover:bg-[#60bfe5c2] md:w-[400px] text-white mt-2"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Update
                </button>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
