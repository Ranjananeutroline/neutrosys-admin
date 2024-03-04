import React from "react";
import Neutrologo from "../../assets/Neutroline_logo 3.png";
import Image from "../../shared/Image";
import Login from "../../components/Login/Login";
import "./LoginForm.css";

export default function LoginForm() {
  return (
    <div style={{ background: "rgba(220, 234, 255, 0.30)", paddingBottom:"4.3rem"}}>
      <div className="text-center   flex justify-center items-center mb-4 pt-2 ">
        <img
          className="w-[100px] h-[70px]"
          src={Neutrologo}
          alt="neutrosys"
        ></img>
        <h1 className="text-[22px] font-[600]">Neutroline Pvt. Ltd.</h1>
      </div>

      <div className=" flex flex-col justify-center items-center text-center gap-5 md:flex-row md:justify-center md:gap-8 md:items-start login-main">
        <Image />
        <Login />
      </div>
    </div>
  );
}
