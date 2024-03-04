import React from "react";
import "./offermodal.css";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useState } from "react";
import { deleteOfferByIdHere, editOfferByIdHere } from "../../redux/actions/offerAction";
const OfferModal = ({ onCloseModal, offer }) => {
  console.log(offer);
  const dispatch = useDispatch()
  const handleCancelClick = () => {
    onCloseModal();
  };
  const [data, setData] = useState(offer);

  // Function to handle changes in the input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };
  // console.log(data);

  const handleOfferUpdate = async()=>{
    try {
      dispatch(editOfferByIdHere(data))
      // const response = await axios.patch(`http://www.localhost:8000/api/announcement/offer/${data._id}`,data)
      // console.log(response);
      onCloseModal()
    } catch (error) {
      console.log(error);
    }
  }
  const handleOfferDelete = async ()=>{
    try{
      dispatch(deleteOfferByIdHere(data._id))
      onCloseModal()
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className="w-full sm:w-[430px]  bg-[white] rounded-[10px]">
      <div className="w-full sm:w-[430px] sm:h-[60px] bg-[#84aedd]  rounded-t-[10px] flex items-center justify-center">
        <h1 className="text-[20px] text-white p-4">OFFER</h1>
      </div>
      <div className="w-full sm:w-[430px] flex flex-col py-2 px-4">
        <div className="w-full">
          <div className=" py-2 flex flex-col">
            <label className="text-[16px]">Title </label>
            <input
              className="off-input text-[14px] bg-[#dceaff4d]"
              // style={{boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 1px, rgba(0, 0, 0, 0.1) 0px 1px 1px"}}
              type="text"
              name="title"
              value={data.title}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <div className="text-[16px] py-2 flex flex-col w-full">
             Validity
            <input
              className="off-input text-[14px] bg-[#dceaff4d]"
              // style={{boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 1px, rgba(0, 0, 0, 0.1) 0px 1px 1px"}}
              type="text"
              name="validity"
              value={data.validity}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className=" flex items-center justify-center ">
          <div className="text-[16px] py-2 flex w-full flex-col">
            Description
            <input
               className="off-input text-[14px] bg-[#dceaff4d] pb-[48px]"
               style={{ height:"90px"}}
              type="text"
              name="description"
              value={data.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* <p className="text-[#3A4DF8] font-[500]">5:00 - 17:00</p> */}
      </div>

      <div className="flex  pb-4 sm:pb-0 mt-3 gap-3 justify-end px-4 ">
        {/* <button
          type="submit"
          className="bg-[#F24C4C] text-[white] font-[600] font-inter p-3 rounded-[5px] flex justify-center  items-center text-[14px] h-[39px] "
          style={{ boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}
          onClick={handleOfferDelete}
        >
          Delete
        </button> */}
        <button
          type="submit"
          className="bg-[#6499E9] text-[white] font-[600] font-inter  px-[14px] rounded-[5px] flex justify-center  items-center text-[13.3px] h-[36px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          onClick={handleOfferUpdate}
        >
          Update
        </button>
        <button
          type="submit"
          className="bg-[white] text-[#6499E9] border-1 border-[#6499E9] font-[600] font-inter  px-[14px] rounded-[5px] flex justify-center  items-center text-[13.3px] h-[36px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          onClick={handleCancelClick}
        >
          Cancel
        </button>{" "}
      </div>
    </div>
  );
};

export default OfferModal;
