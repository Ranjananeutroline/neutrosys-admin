import React, { useState } from "react";
// import radio from "../images/radio.png";
import right from "../images/right.png";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import OfferModal from "./OfferModal";
import AddOffersModal from "./AddOffersModal";
import "./offermodal.css";
import Offers from "./Offers";
import Annouce from "./Annouce";
import Expired from "./Expired";
import { Formik, useFormik } from "formik";
import { offerSchema } from "../../schemas/offerSchema";
import { useDispatch, useSelector } from "react-redux";
import AddAnnouncementModal from "./AddAnnouncementModal";

const OfferPage = () => {
  const [activeTab, setActiveTab] = useState("offers");


  const [modalOpen, setModalOpen] = useState(false);
  const [addmodalOpen, setAddModalOpen] = useState(false);
  const [addannouncementmodalOpen, setAddAnnouncementModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => setModalOpen(false);

  const openAddModal = () => {
    setAddModalOpen(true);
  };
  const openAddAnnouncementModal = ()=>{
setAddAnnouncementModalOpen(true)
  }
  const closeAddModal = () => {
    setAddModalOpen(false);
  };
  const closeAddAnnouncementModal = () => {
    setAddAnnouncementModalOpen(false);
  };

  return (
    <div className="flex flex-col px-[10px] sm:px-[20px] md:px-[50px] py-4 w-full  gap-3 announce-main">
      <Modal
        open={addmodalOpen}
        onClose={closeAddModal}
        center
        classNames={{
          // overlay: "customOverlay",
          modal: "customModal",
          closeButton: "customButton",
        }}
      >
        <AddOffersModal />
      </Modal>
      <Modal
        open={addannouncementmodalOpen}
        onClose={closeAddAnnouncementModal}
        center
        classNames={{
          // overlay: "customOverlay",
          modal: "customModal",
          closeButton: "customButton",
        }}
      >
        <AddAnnouncementModal />
      </Modal>
      <div className="flex  items-center justify-between w-full">
        <h1 className="text-[27px] text-[#3F26A5] ">Announcement</h1>
        
        {/* <button
         className="flex items-center justify-center bg-[#e7f4fb] border shadow-md gap-2 border px-1 py-1 sm:px-3 sm:py-2 text-center text-[#939af8] text-inter text-[14px] md:text-[16px] font-[600] rounded-[3px]"
          onClick={openAddModal}
        >
          + Add Offers
        </button>
        <button
         className="flex items-center justify-center bg-[#e7f4fb] border shadow-md gap-2 border px-1 py-1 sm:px-3 sm:py-2 text-center text-[#939af8] text-inter text-[14px] md:text-[16px] font-[600] rounded-[3px]"
          onClick={openAddAnnouncementModal}
        >
          + Add Announcement
        </button> */}
      </div>

      <div className="flex select-offer-main">
          <button
            className={`border-r offer-select${
              activeTab === "offers"
                ? "border-gray-300  bg-gradient-to-b from-gray-100 via-white to-transparent shadow-inner inset-x-0 inset-y-2 bg-white"
                : ""
            } h-[50px] w-[100px] btn-select`}
            style={
              activeTab === "offers"
                ? {
                    color: "#346AFF",
                    borderWidth: "0.5px",
                    boxShadow: "0px 2px 5px 0px #D2F3FA",
                    
                  }
                : { boxShadow: "0px 2px 5px 0px #D2F3FA" }
            }
            onClick={() => setActiveTab("offers")}
          >
            Offers
          </button>

          <button
            className={`border-r offer-select${
              activeTab === "announcement"
                ? "border-gray-300  bg-gradient-to-b from-gray-100 via-white to-transparent shadow-inner inset-x-0 inset-y-2 bg-white"
                : ""
            } h-[50px] w-[150px] btn-select`} 
            style={
              activeTab === "announcement"
                ? {
                    borderWidth: "0.5px",
                    boxShadow: "0px 2px 5px 0px #D2F3FA",
                  }
                : { boxShadow: "0px 2px 5px 0px #D2F3FA" }
            }
            onClick={() => setActiveTab("announcement")}
          >
            Announcement
          </button>
          <button
            className={`border-r offer-select${
              activeTab === "expired"
                ? "border-gray-300  bg-gradient-to-b from-gray-100 via-white to-transparent shadow-inner inset-x-0 inset-y-2 bg-white"
                : ""
            } h-[50px] w-[100px] btn-select`}
            style={
              activeTab === "expired"
                ? {
                    borderWidth: "0.5px",
                    boxShadow: "0px 2px 5px 0px #D2F3FA",
                    
                  }
                : { boxShadow: "0px 2px 5px 0px #D2F3FA" }
            }
            onClick={() => setActiveTab("expired")}
          >
            Expired
          </button>
        </div>


      <div className=" flex flex-wrap gap-8">
        <div style={{width:"90%"}}>
          {activeTab === "offers" && <Offers />}
          {activeTab === "announcement" && <Annouce />}
          {activeTab === "expired" && <Expired />}
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
