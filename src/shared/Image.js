import neutrosys from "../assets/neutrosys.png";
import React from "react";
import "./Image.css";

function Image() {
  return (
    <img
      className=" px-2 w-full h-[300px] md:w-[400px] md:h-[490px] md:px-0 neutrosys-img"
      src={neutrosys}
      alt="neutrosys"
    ></img>
  );
}

export default Image;
