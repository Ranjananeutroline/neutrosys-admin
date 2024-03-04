import React, { useState, useContext } from "react";
import edit from "../../assets/editicon.svg";
import { Link } from "react-router-dom";
import BhourModal from "./BhourModal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./bhours.css";
import Hours from "./Hours";
import ScheduleModal from "./ScheduleModal";
import schedule from "../../assets/schedule.svg";
import info from "../../assets/info.svg";
import { AppContext } from "../../AppContext";

const BhoursC = () => {
  const { businessDataFromModal, setShowModal } = useContext(AppContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSOpen, setModalSOpen] = useState(false);
  const [bhourModalSet, setBhourModalSet] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setModalOpen(false);
    setIsHovering(false); // Reset hover state when modal is closed
    setBhourModalSet(true); // Set the state indicating that BhourModal has been set or saved
  };

  const openSModal = () => {
    setModalSOpen(true);
  };
  const onCloseSModal = () => setModalSOpen(false);

  const [isHovering, setIsHovering] = useState(false);
  

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = weekdays[new Date().getDay()]; // get current day

  const weekdaySchedules = weekdays.reduce((acc, day) => {
    const workFrom =
      businessDataFromModal?.workHours?.[`${day.toLowerCase()}WorkHoursFrom`] || "From";
    const workTo =
      businessDataFromModal?.workHours?.[`${day.toLowerCase()}WorkHoursTo`] || "To";
    const breakFrom =
      businessDataFromModal?.workHours?.[`${day.toLowerCase()}BreakFrom`] || "From";
    const breakTo = businessDataFromModal?.workHours?.[`${day.toLowerCase()}BreakTo`] || "To";

    acc[day] = {
      workfrom: workFrom,
      workto: workTo,
      breakfrom: breakFrom,
      breakto: breakTo,
    };

    return acc;
  }, {});
  // Find the current day data
  const currentDayData = weekdaySchedules[today];
  console.log("currentdaydata:" + currentDayData);
  if (currentDayData) {
    console.log(
      `Current Work Hours: ${currentDayData.workfrom} - ${currentDayData.workto}`
    );
    console.log(
      `Current Break Time: ${currentDayData.breakfrom} - ${currentDayData.breakto}`
    );
  } else {
    console.log("No data available for the current day.");
  }

  console.log(businessDataFromModal);

  
  return (
    <>
      <Modal
        open={modalSOpen}
        onClose={onCloseSModal}
        center
        classNames={{
          overlay: "bhours-schedule",
          modal: "bhours-schedule-modal",
          closeButton: "customButton",
        }}
      >
        <ScheduleModal onClose={onCloseSModal} setOpenModal={setModalOpen} />
      </Modal>
      {/* {modalOpen && <BhourModal setOpenModal={setModalOpen}  />} */}
      <Modal
        open={modalOpen}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "bhours-edit",
          modal: "edit-bhour-modal mt-3",
          closeButton: "",
        }}
      >
        <BhourModal open={modalOpen} onClose={onCloseModal} />
        {/* <Hours/> */}
      </Modal>
      <div className="pb-4 md:pb-20">
        <div
          className=" h-[215px] bg-[#eef0f6] rounded-[8px] p-4 cursor-pointer shadow-md b-hours-main"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        >
          <div className="flex justify-between ">
            <div className="flex gap-3 items-center ">
              <h1 className="text-[22px] text-[#0C1A97] b-title">Business Hours</h1>
              <div>
                <img
                  src={info}
                  alt="info"
                  className={`h-[16px] w-[16px] cursor-pointer`}
                  title={businessDataFromModal.mode}
                />
              </div>
            </div>

            <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={openModal}
          className="bhour-edit-btn"
          title={bhourModalSet ? "Edit Business Hours" : isHovering ? "Set Business Hours" : ""}
          
        >
          <img src={edit} className="h-[20px] w-[28px]" />
        </button>
          </div>
          <div className="flex gap-4 pt-3 b-days-t">
            <h3 className="w-[120px] font-bold text-[15px]">Business Days</h3>
            <div className="flex gap-8 b-days bus-days">
            <h2 className={`text-[15px] text-left text-[#808080] ${businessDataFromModal.workHours ? 'w-[70px]' : 'w-[130px]'}`}>
            {businessDataFromModal.workHours ? (
              <span className="inline-block flex gap-[3px]">
                {businessDataFromModal.workHours.businessDaysFrom?.slice(0, 3) || "Day"}
                <span>-</span>
                {businessDataFromModal.workHours.businessDaysTo?.slice(0, 3) || "Day"}
              </span>
            ) : (
              <span
              className="cursor-pointer bhour-text"
              onClick={openModal}
            >
              Set Business Days
            </span>
            )}
          </h2>
            {businessDataFromModal.workHours?.businessDaysFromOp2 && (
              <>
                <div>{","}</div>
                <h2 className="w-[40px] text-[15px]">
                  {businessDataFromModal.workHours.businessDaysFromOp2?.slice(0, 3) || ""}
                </h2>
                {businessDataFromModal.workHours.businessDaysFromOp2 &&  <span>-</span>}
                <h2 className="w-[40px] text-[15px]">
                  {businessDataFromModal.workHours.businessDaysToOp2?.slice(0, 3) || ""}
                </h2> 
              </>
            )}
            {businessDataFromModal.workHours?.businessDaysFromOp3 && (
              <>
                <div>{","}</div>
                <h2 className="w-[40px] text-[15px]">
                  {businessDataFromModal.workHours.businessDaysFromOp3?.slice(0, 3) || ""}
                </h2>
                {businessDataFromModal.workHours.businessDaysFromOp3 &&  <span>-</span>}
                <h2 className="w-[40px] text-[15px]">
                  {businessDataFromModal.workHours.businessDaysToOp3?.slice(0, 3) || ""}
                </h2>
              </>
            )}
          </div>
          </div>
          <div className="flex gap-4 pt-3  b-days-t">
            <h3 className="w-[120px]  font-bold text-[15px]">Work Hours</h3>
            <div className="flex gap-8 b-days">
            <h2 className={`text-[15px] text-left  text-[#808080] whrs-w  ${businessDataFromModal.workHours ? 'w-[150px]' : 'w-[150px]'}`}>
            {businessDataFromModal.workHours ? (
              <span className="inline-block flex gap-[3px]">
                {currentDayData?.workfrom || "From"}
                <span>-</span>
                {currentDayData?.workto || "To"}
              </span>
            ) : (
               <span
              className="cursor-pointer bhour-text"
              onClick={openModal}
            >
              Set Work Hours
            </span>
              
            )}
          </h2>
              {businessDataFromModal.workHours && (
              <button onClick={openSModal} className=" cursor-pointer" title="schedule">
                <svg
                  className="s-svg"
                  width="14"
                  height="16"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 3H4.2002C3.08009 3 2.51962 3 2.0918 3.21799C1.71547 3.40973 1.40973 3.71547 1.21799 4.0918C1 4.51962 1 5.08009 1 6.2002V7M5 3H13M5 3V1M13 3H13.8002C14.9203 3 15.4796 3 15.9074 3.21799C16.2837 3.40973 16.5905 3.71547 16.7822 4.0918C17 4.5192 17 5.07899 17 6.19691V7M13 3V1M1 7V15.8002C1 16.9203 1 17.4801 1.21799 17.9079C1.40973 18.2842 1.71547 18.5905 2.0918 18.7822C2.5192 19 3.07899 19 4.19691 19H13.8031C14.921 19 15.48 19 15.9074 18.7822C16.2837 18.5905 16.5905 18.2842 16.7822 17.9079C17 17.4805 17 16.9215 17 15.8036V7M1 7H17M13 15H13.002L13.002 15.002L13 15.002V15ZM9 15H9.002L9.00195 15.002L9 15.002V15ZM5 15H5.002L5.00195 15.002L5 15.002V15ZM13.002 11V11.002L13 11.002V11H13.002ZM9 11H9.002L9.00195 11.002L9 11.002V11ZM5 11H5.002L5.00195 11.002L5 11.002V11Z"
                    stroke="#8F9AFD"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              )}
              {/* <img src={schedule} alt="schedule" 
               onClick={openSModal}
              className="w-[15px] h-[15px] ml-[-50px] cursor-pointer"/> */}
            </div>
          </div>
          <div className="flex gap-4 pt-3  b-days-t">
            <h3 className="w-[120px]  font-bold text-[15px]">Holidays</h3>
            <div className="flex gap-8 b-days bus-days">
            <h2 className={`text-[15px] text-left  text-[#808080] ${businessDataFromModal.workHours ? 'w-[70px]' : 'w-[130px]'}`}>
              {businessDataFromModal.workHours ? (
                <span className="inline-block flex gap-[3px]">
                {businessDataFromModal.workHours?.holidayFrom?.slice(0, 3) || "Day"}
                  <span>-</span>
                  {businessDataFromModal.workHours?.holidayTo?.slice(0, 3) || "Day"}
                </span>
              ) : (
                <span
                className="cursor-pointer bhour-text"
                onClick={openModal}
              >
                Set Holidays
              </span>
                
              )}
            </h2>
            {businessDataFromModal.workHours?.holidayFromOp2 && (
                <>
                  <div>{","}</div>
                  <h2 className="w-[60px] text-[15px]">
                          {businessDataFromModal.workHours?.holidayFromOp2?.slice(0, 3) || ""}
                        </h2>
                        {businessDataFromModal.workHours?.holidayFromOp2 &&  <span>-</span>}
                        <h2 className="w-[60px] text-[15px]">
                            {businessDataFromModal.workHours?.holidayToOp2?.slice(0, 3) || ""}
                          </h2>
                </>
              )}
              {businessDataFromModal.workHours?.holidayFromOp3 &&(
                <>
                  <div>{","}</div>
                  <h2 className="w-[60px] text-[15px]">
                            {businessDataFromModal.workHours?.holidayFromOp3?.slice(0, 3) || ""}
                          </h2>
                          {businessDataFromModal.workHours?.holidayFromOp3 &&  <span>-</span>}
                          <h2 className="w-[60px] text-[15px]">
                            {businessDataFromModal.workHours?.holidayToOp3?.slice(0, 3) || ""}
                          </h2>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-4 pt-3  b-days-t">
            <h3 className="w-[120px]  font-bold text-[15px]">Break</h3>
            <div className="flex gap-8 b-days">
            <h2 className={`text-[15px] text-left  text-[#808080] ${businessDataFromModal.workHours ? 'w-[150px]' : 'w-[150px]'}`}>
            {businessDataFromModal.workHours ? (
              <span className="inline-block flex gap-[3px]">
                {currentDayData?.breakfrom || "From"}
                <span>-</span>
                {currentDayData?.breakto || "To"}
              </span>
              ) : (
                <span
                className="cursor-pointer bhour-text"
                onClick={openModal}
              >
                Set Breaks
              </span>
              )}
            </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BhoursC;
