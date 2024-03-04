import React from "react";
import { useState } from "react";
import { editAnnouncementByIdHere } from "../../redux/actions/announcementAction";
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteOfferByIdHere } from "../../redux/actions/offerAction";
const AnnounceModal = ({ onCloseModal, announcement }) => {
  const dispatch = useDispatch();
  const handleCancelClick = () => {
    onCloseModal();
  };
  const [data, setData] = useState(announcement);
  const handleAnnouncementUpdate = async () => {
    try {
      dispatch(editAnnouncementByIdHere(data));
      const response = await axios.patch(`http://localhost:8000/api/announcement/announcement/${data._id}`,data)
      console.log(response);
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAnnouncementDelete = async ()=>{
    try{
      dispatch(deleteOfferByIdHere(data._id))
      onCloseModal()
    }
    catch(error){
      console.log(error);
    }
  }
  // Function to handle changes in the input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };
  return (
    <div className="w-full  sm:w-[430px]  bg-[white] rounded-[10px]">
      <div className="w-full sm:w-[430px] sm:h-[60px] bg-[#84aedd]  rounded-t-[10px] flex items-center justify-center">
        <h1 className="text-[20px] text-white p-4">ANNOUNCEMENT</h1>
      </div>
      <div className="w-full sm:w-[430px] flex flex-col py-2 px-4">
      <div className="w-full">
      <div className="text-[16px] py-2 flex flex-col">
        <label className="text-[16px]">Title </label>
        <input
           className="off-input text-[14px] bg-[#dceaff4d]"
          //  style={{boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 1px, rgba(0, 0, 0, 0.1) 0px 1px 1px"}}
          type="text"
          name="title"
          value={data.title}
          onChange={handleInputChange}
        />
         </div>
        </div>
        <div>
          <div className=" py-2 flex flex-col w-full">
        <label className="text-[16px]">Validity </label>
        <input
          className="off-input text-[14px] bg-[#dceaff4d]"
          // style={{boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 1px, rgba(0, 0, 0, 0.1) 0px 1px 1px"}}
          type="text"
          name="validity"
          value={announcement.validity}
          onChange={handleInputChange}
        />
        </div>
        </div>
        <div className=" flex items-center justify-center ">
        <div className="py-2 flex w-full flex-col">
        <label className="text-[16px]">Description </label>
        <input
           className="off-input text-[14px] bg-[#dceaff4d] pb-[48px]"
           style={{height:"90px"}}
          type="text"
          name="description"
          value={data.description}
          onChange={handleInputChange}
        />
         </div>
        </div>
      </div>
      <div className="flex  pb-4 sm:pb-0 mt-3 gap-3 justify-end px-4 ">
        {/* <button
          type="submit"
          className="bg-[#0AA1DD] text-[white] font-[600] font-inter p-3 rounded-[5px] flex justify-center  items-center text-[14px] h-[39px] "
          style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
          onClick={handleAnnouncementDelete}
        >
          Delete
        </button> */}
        <button
          type="submit"
          className="bg-[#6499E9] text-[white] font-[600] font-inter px-[14px] rounded-[5px] flex justify-center  items-center text-[13.3px] h-[36px] "
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          onClick={handleAnnouncementUpdate}
        >
          Update
        </button>
        <button
          type="submit"
          className="bg-[white] text-[#6499E9] border-1 border-[#6499E9] font-[600] font-inter px-[14px] rounded-[5px] flex justify-center  items-center text-[13.3px] h-[36px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          onClick={handleCancelClick}
        >
          Cancel
        </button>{" "}
      </div>
    </div>
  );
};

export default AnnounceModal;
