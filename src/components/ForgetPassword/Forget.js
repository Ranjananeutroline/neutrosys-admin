import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { ScaleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "./Forget.css";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import Modal from "react-responsive-modal";
import OtpPageFinal from "../Profile/otpPageForPasswordChange/OtpPageFinal";
import Reset from "../Reset/Reset";
function Forget({ onUpdateParentState }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [showPasswordResetPage, setShowPasswordResetPage] = useState(false);
  const [otp, setOtp] = useState("");
  const [gotp, setGotp] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [loading]);
  function handleChange(e) {
    setEmail(e.target.value);
  }
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
    const response = await axios.post(
      "http://www.localhost:8000/api/auth/sendOtp",
      { email }
    );
    console.log(response);
    notifyNewOtp();
  };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const validationOtp = await axios.post(
        "http://www.localhost:8000/api/auth/validateotp",
        { otp, email }
      );
      console.log(validationOtp);
      if (validationOtp) {
        setShowPasswordResetPage(true);
      }
    } catch (error) {
      console.log(error);
    }
    //  if(checkOtpValidation()){
    //   setOpenOtpPopup(false)
    //  }
    //  else{
    //   setOpenOtpPopup(true)
    //  }
  };
  const handleCloseOtpPage = () => {
    setShowOtpPage(false);
  };
  const handleCloseResetPage = () => {
    setShowPasswordResetPage(false);
  };
  const handleForgetSubmit = async (e) => {
    e.preventDefault();
    //check if that email user exist
    console.log("herere", email);
    try {
      const isEmailExist = await axios.post(
        "http://www.localhost:8000/api/auth/checkifuserexist",
        { email }
      );
      if (isEmailExist) {
        const response = await axios.post(
          "http://www.localhost:8000/api/auth/sendOtp",
          { email }
        );
        console.log(response);
        console.log("ok");
        setShowOtpPage(true);
      }
    } catch (error) {}

    // const response = await axios.post(
    //   "http://www.localhost:8000/api/auth/sendOtp",
    //   email
    // );
    // console.log(response);

    // if (email !== "") {
    //   setLoading(true);
    //   setTimeout(() => {
    //     onUpdateParentState("otp");
    //   }, 1000);
    // }
  };

  return (
    <>
      <form className="  relative w mt-6 mb-8 mx-4 md:mx-8  w-[380px] flex flex-col md:justify-center gap-4 md:items-start forgetpswd-form">
        <div>
          <h1 className="text-[20px] md:ml-1 text-start font-sans font-[700]">
            Forget Password?
          </h1>
          <p className="text-[14px] ml-1  text-start font-sans mt-2  md:w-[250px]">
            {/* Please enter the email */}
            Enter the email address.
          </p>
        </div>

        <div className="flex flex-col mt-1 gap-1 justify-center items-center w-full">
          <input
            className={`w-full rounded-[6px]  text-[14px] h-[39px]   pl-[12px]  focus:outline-none  focus:bg-[#F6F6F6] bg-[#efeeee]   placeholder:text-[13px] placeholder:text-[#8B8989]  md:h-[50px] md:placeholder:text-[14px] md:pl-[15px] `}
            style={{
              border: "1px solid #DDE7F2",
              boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.12) inset",
            }}
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            onChange={handleChange}
          />
          <button
            className="text-center w-full h-[40px] mt-4 rounded-[6px] font-sans font-[600] text-[16px] bg-[#4556EA]  md:h-[45px] text-white hover:bg-[#3A45B4] active:bg-[#2C3477]"
            type="button"
            style={{
              lineHeight: "normal",
              letterSpacing: "0.4px",
            }}
            onClick={handleForgetSubmit}
          >
            Continue
          </button>
        </div>
        {loading ? (
          <div className="absolute bg-[white] w-full h-full flex justify-center  items-center ">
            <ScaleLoader size={30} color={"#53217f"} loading={loading} />
          </div>
        ) : null}
      </form>
      <Modal
        open={showOtpPage}
        onClose={handleCloseOtpPage}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          // closeButton: "closeIconInOtpPage",
        }}
      >
        <div className=" bg-[#FFFFFF]">
          {gotp}
          <form
            className="w-full  py-4 mx-auto   flex flex-col sm:justify-center gap-4  sm:w-auto md:px-10"
            onSubmit={handleOtpSubmit} // Handle form submission
          >
            <div>
              <h1 className="text-[20px] ml-1 text-center  font-sans font-[700]">
                OTP Verification
              </h1>
              <p className="text-[12px] ml-1 text-center font-sans mt-2 ">
                Enter the OTP to -{" "}
                <span className="font-[600] text-[14px]"> {email}</span>
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
              <p className="text-[11px] text-center ml-1  w-full font-sans mt-2 ">
                Don’t receive code ?{" "}
                <span className="font-[500] text-[#6A00BF] text-[13px]">
                  {" "}
                  Re-send
                </span>
              </p>
            </div>
            <div className="flex justify-center px-5">
              <button
                className="text-center w-full flex justify-center items-center h-[40px] mt-1 rounded-[6px] font-sans font-[600] text-[16px] bg-[#4556EA] sm:w-[250px] md:h-[45px] text-white  hover:bg-[#3A45B4] active:bg-[#2C3477]"
                type="button "
                style={{
                  lineHeight: "normal",
                  letterSpacing: "0.4px",
                }}
                onClick={handleOtpSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        open={showPasswordResetPage}
        onClose={handleCloseResetPage}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          // closeButton: "closeIconInOtpPage",
        }}
      >
        <Reset email={email}/>
      </Modal>
    </>
  );
}

export default Forget;
