import React from "react";
// import "./announcementmodal.css";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { deleteAnnouncementByIDHere, editannouncementByIdHere } from "../../redux/actions/announcementAction";
const announcementDeleteModal = ({ onCloseDeleteModal, announcement }) => {
  
  const [data, setData] = useState(announcement);
  
  const dispatch = useDispatch()
  console.log('yeha aayo ni');
  console.log(announcement);
  const handleCancelClick = () => {
    onCloseDeleteModal();
  };


  const handleannouncementDelete = async ()=>{
    try{
      console.log(data);
      dispatch(deleteAnnouncementByIDHere(data._id))
      onCloseDeleteModal()
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className="w-full sm:w-[450px]  bg-[white] rounded-[10px]">
      <div className="w-full sm:w-[450px] sm:h-[60px] p-2  rounded-t-[10px] flex items-left justify-left">
        <h1 className="text-[18px] p-4">Are you sure want to Delete?</h1>
      </div>
  
      <div className="flex pb-4 sm:pb-0 mt-[2.2rem] gap-3 justify-end px-4">
        <button
          type="submit"
          className="bg-[#6499E9]  text-[white] font-[600] font-inter px-[14px] rounded-[5px] flex justify-center  items-center text-[13.3px] h-[36px] "
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          onClick={handleannouncementDelete}
        >
          Delete
        </button>
        
        <button
          type="submit"
          className="border-1 border-[#6499E9] text-[#6499E9] font-[600] font-inter px-[14px] rounded-[5px] flex justify-center  items-center text-[13.3px] h-[36px] "
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          onClick={handleCancelClick}
        >
          Cancel
        </button>{" "}
      </div>
    </div>
  );
};

export default announcementDeleteModal;