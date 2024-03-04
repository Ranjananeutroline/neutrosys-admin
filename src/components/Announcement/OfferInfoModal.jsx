import React from "react";
import "./offermodal.css";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useState } from "react";
import {
  deleteOfferByIdHere,
  editOfferByIdHere,
} from "../../redux/actions/offerAction";
const OfferInfoModal = ({ closeInfoModal, offer }) => {
  console.log(offer);
  const dispatch = useDispatch();
  const handleCancelClick = () => {
    closeInfoModal();
  };
  const [data, setData] = useState(offer);

  // Function to handle changes in the input fields
 
  // console.log(data);


  return (
    <div className="w-full sm:w-[450px]  bg-[white] rounded-[10px] pb-3">
      <div className="w-full sm:w-[450px] sm:h-[60px] bg-[#84aedd]  rounded-t-[10px] flex items-center justify-center">
        <h1 className="text-[20px] text-white p-4">OFFER</h1>
      </div>
      <div className="w-full sm:w-[450px] flex flex-col gap-2 px-4 py-4">
        <div className="w-full mb-2">
          <div className=" py-2 flex flex-col">
            <label className="text-[16px] flex"><span style={{color:"#5272F2", width:"100px"}}>Title: </span>
             {data.title}</label>
           
          </div>
        </div>
        <div>
          <div className=" w-full text-[16px] flex mb-2">
          <span style={{color:"#5272F2", width:"100px"}}>Validity:</span> {data.validity}
           
          </div>
        </div>
        <div className="  flex items-center justify-center mb-2">
          <div className=" py-2 w-full text-[16px] flex">
          <span style={{color:"#5272F2", width:"100px"}}>Description:</span> {data.description}
           
          </div>
        </div>
      </div>

      {/* <div className="flex  pb-4 sm:pb-4 mt-2 gap-3 justify-end px-4 ">
        <button
          type="submit"
          className="bg-[#84aedd] hover:bg-[#84aeddd6]  text-[white] font-[600] p-3 rounded-[5px] flex justify-center  items-center text-[15px] h-[39px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          onClick={handleCancelClick}
        >
          Ok
        </button>{" "}
      </div> */}
    </div>
  );
};

export default OfferInfoModal;
