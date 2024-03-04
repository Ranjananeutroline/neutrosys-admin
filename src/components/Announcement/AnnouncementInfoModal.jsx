import React from "react";
import "./offermodal.css";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useState } from "react";
import {
  deleteOfferByIdHere,
  editOfferByIdHere,
} from "../../redux/actions/offerAction";
const AnnouncementInfoModal = ({ onCloseAnnouncementModal, announcement }) => {
  console.log(announcement);
  const dispatch = useDispatch();
  
  const handleCancelClick = () => {
    onCloseAnnouncementModal(); // Call the provided function to close the modal
  };
  const [data, setData] = useState(announcement);

  // Function to handle changes in the input fields
 
  // console.log(data);
  

  return (
    <div className="w-full sm:w-[450px]  bg-[white] rounded-[10px] pb-3">
      <div className="w-full sm:w-[450px] sm:h-[60px] bg-[#84aedd]  rounded-t-[10px] flex items-center justify-center">
        <h1 className="text-[20px] text-white p-4">Announcement</h1>
      </div>
      <div className="w-full sm:w-[450px] flex flex-col gap-2 px-4 py-4">
        <div className="w-full mb-2">
          <div className="text-[16px] py-2 flex flex-col">
          <label className="text-[16px] flex"><span style={{color:"#5272F2", width:"100px"}}>Title: </span>
             {data.title}</label>
           
          </div>
        </div>
        <div>
        <div className=" w-full text-[16px] flex mb-2">
          <span style={{color:"#5272F2", width:"100px"}}>Validity: </span> {data.validity}
           
          </div>
        </div>
        <div className="  flex items-center justify-center mb-2">
        <div className=" py-2 w-full text-[16px] flex">
          <span style={{color:"#5272F2", width:"100px"}}>Description: </span> {data.description}
           
          </div>
        </div>
      </div>

      {/* <div className="flex  pb-4 sm:pb-4 mt-2 gap-3 justify-end px-4">
        <button
          type="submit"
          className="bg-[#84aedd] hover:bg-[#84aeddd6]  text-[white] font-[600] font-inter p-3 rounded-[5px] flex justify-center  items-center text-[15px] h-[39px]"
          style={{ boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}
          onClick={handleCancelClick}
        >
          Ok
        </button>{" "}
      </div> */}
    </div>
  );
};

export default AnnouncementInfoModal;
