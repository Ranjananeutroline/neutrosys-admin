import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Modal from "react-responsive-modal";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../changePassword/ChangePassword.jsx";
import "./otppage.css";
import OtpPage from "./OtpPage";
export default function App({
  onUpdateParentState,
  openOtpPopup,
  setOpenOtpPopup,
}) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [gotp, setGotp] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [showPasswordChangePage, setShowPasswordChangePage] = useState(false);

  const handleOtpClose = () => {
    setOpenOtpPopup(false);
  };
  const [otpValues, setOtpValues] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  });
  const checkOtpValidation = async () => {
    // if (gotp === otp) {
    //   notifySuccess();
    //   navigate("/profile", { state: { sendToggleForChangePass: true } });
    //   return true;
    // } else {
    //   notifyFailure();
    //   return false;
    // }
    try {
      const newemail = user?.data.details.email;
      console.log(newemail);
      const validationOtp = await axios.post(
        "http://localhost:8000/api/auth/validateotp",
        { otp, email: newemail }
      );
      console.log(validationOtp);
      if (validationOtp) {
        setShowPasswordChangePage(true);
        console.log("verified");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkOtpValidation()) {
      setShowPasswordChangePage(true);
    } else {
      setShowPasswordChangePage(false);
    }
  };
  const notifyNewOtp = () =>
    toast.success("New OTP is send successfully!!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifySuccess = () =>
    toast.success("OTP is verified successfully!!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyFailure = () =>
    toast.warning("Typed OTP is Wrong!!!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const handleOtpResend = async () => {
    // generateOTP()
    const useremail = user?.data.details.email;
    const response = await axios.post(
      "http://localhost:8000/api/auth/sendOtp",
      { email: useremail }
    );
    console.log(response);
    notifyNewOtp();
    notifyNewOtp();
    // handleGenerateOTP();
  };
  // const handleGenerateOTP = () => {
  //   const generatedOTP = generateOTP();
  //   setGotp(generatedOTP);
  // };
  // const generateOTP = () => {
  //   const length = 4; // Set the desired length of the OTP
  //   const charset = "0123456789"; // You can include alphabets and special characters as well if needed
  //   let otp = "";
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * charset.length);
  //     otp += charset[randomIndex];
  //   }
  //   return otp;
  // };

  useEffect(() => {
    // setGotp(generateOTP());
  }, []);

  const handleClosePasswordChangePage = () => {
    setShowPasswordChangePage(false);
  };
  return (
    <>
      <Modal
        open={openOtpPopup}
        onClose={handleOtpClose}
        center
        classNames={{
          overlay: "customOverlay otpOverlay",
          modal: "customModal otpModal",
          // closeButton: "closeIconInOtpPage",
        }}
      >
        <div className=" bg-[#FFFFFF]">
          {gotp}
          <form
            className="w-full  py-4 mx-auto   flex flex-col sm:justify-center gap-4  sm:w-auto md:px-10"
            onSubmit={handleSubmit} // Handle form submission
          >
            <div>
              <h1 className="text-[20px] ml-1 text-center  font-sans font-[600]">
                OTP Verification
              </h1>
              <p className="text-[12px] ml-1 text-center  font-sans mt-2 ">
                Enter the OTP to -{" "}
                <span className=" text-[#19A7CE] text-[14px]">
                  {" "}
                  {user?.data.details.email}
                </span>
              </p>
            </div>

            <div className="flex items-center justify-center mx-auto">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                inputType="tel"
                containerStyle="containerStyle"
                inputStyle="inputStyle"
                renderSeparator={<span style={{ margin: "0px" }}>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div onClick={handleOtpResend} className="cursor-pointer">
              <p className="text-[12px] text-center ml-1  w-full font-sans">
                Don’t receive code ?{" "}
                <span className="font-[500] text-[#6A00BF] text-[13px]">
                  {" "}
                  Re-send
                </span>
              </p>
            </div>
            <div className="flex justify-center px-5 pb-1">
              <button
                className="text-center w-full flex justify-center items-center h-[40px] mt-1 rounded-[6px] font-sans font-[600] text-[16px] bg-[#60BFE5] 
                hover:bg-[#60bfe5c2] active:bg-[#2C3477] sm:w-[95px] md:h-[45px] text-white otp-submit"
                type="button "
                style={{
                  lineHeight: "normal",
                  letterSpacing: "0.4px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px",
                }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        open={showPasswordChangePage}
        onClose={handleClosePasswordChangePage}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          // closeButton: "closeIconInOtpPage",
        }}
      >
        {/* <div>Hello bro</div> */}
        <ChangePassword />
      </Modal>
    </>
  );
}
