import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </g>
  </svg>
);
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
function Reset({ email }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    // console.log(email);
    const response = await axios.post(
      "http://www.localhost:8000/api/auth/resetpassword",
      { password: formState.password, email }
    );
    console.log(response);
    if (response) {
      window.location.reload();
      notifySuccess()
    }
    else{
      console.log('error bho');
    }
    e.preventDefault();
  };
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FFFFFF] w-[100%] py-4 px-4 md:px-10  flex flex-col justify-center md:justify-center gap-2 md:items-start md:px-0 md:w-auto"
    >
      <div className="w-full">
        <h1 className="text-[20px]  text-start font-sans font-[700]">
          Reset Password?
        </h1>
      </div>

      <div className=" w-full flex flex-col   md:m-0 gap-3 ">
        <label
          className="  text-left text-[15px]  mt-4 font-sans"
          style={{
            fontStyle: "normal",
            fontWeight: "400",
          }}
        >
          Enter a new password
        </label>
        <div className="relative w-full  pr-2 md:p-0 md:w-auto md:h-[50px] ">
          <input
            className={`w-[100%] text-[14px] rounded-[6px] h-[39px] pl-[12px] focus:outline-none focus:bg-[#F6F6F6] bg-[#efeeee] placeholder:text-[13px] placeholder:text-[#8B8989] md:w-[280px] md:h-[50px] md:placeholder:text-[14px] md:pl-[15px] `}
            style={{
              border: "1px solid #DDE7F2",
              boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.12) inset",
            }}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            value={formState.password}
            onChange={handleChange}
            required
          />
          <div
            className="absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {formState.password !== "" && (
              <div className="mr-2">
                {showPassword ? <UnShow /> : <EyeIcon />}
              </div>
            )}
          </div>
        </div>
        <label
          className="w-full text-left text-[15px] pl-1 font-sans"
          style={{
            fontStyle: "normal",
            fontWeight: "400",
          }}
        >
          Confirm password
        </label>
        <div className=" relative w-full   pr-2 md:p-0 md:w-auto md:h-[50px] ">
          <input
            className={`w-full text-[14px]  rounded-[6px]  h-[39px] pl-[12px] focus:outline-none focus:bg-[#F6F6F6] bg-[#efeeee] placeholder:text-[13px] placeholder:text-[#8B8989] md:w-[280px] md:h-[50px] md:placeholder:text-[14px] md:pl-[15px] `}
            style={{
              border: "1px solid #DDE7F2",
              boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.12) inset",
            }}
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="********"
            value={formState.confirmPassword}
            onChange={handleChange}
            required
          />
          <div
            className="absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            {formState.confirmPassword !== "" && (
              <div className="mr-2">
                {showConfirmPassword ? <UnShow /> : <EyeIcon />}
              </div>
            )}
          </div>
        </div>

        <button
          className="text-center w-full h-[40px] mt-7 rounded-[6px] font-sans font-[600] text-[16px] bg-[#4556EA] md:w-[280px] md:h-[45px] text-white  hover:bg-[#3A45B4] active:bg-[#2C3477]"
          type="button"
          style={{
            lineHeight: "normal",
            letterSpacing: "0.4px",
          }}
          onClick={handleSubmit}
        >
          Continue
        </button>
        {/* <Link to="/reset">--</Link> */}
      </div>
    </form>
  );
}

export default Reset;
