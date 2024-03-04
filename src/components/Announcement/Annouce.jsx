import React, { useState, useEffect } from "react";
import radio from "../images/radio1.png";
import right from "../images/right.png";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import edit from "../../assets/edit.png";
import trash from "../../assets/trash2.png";
import { useRef } from "react";
import AnnouncementInfoModal from "./AnnouncementInfoModal"
import AnnounceModal from "./AnnounceModal";
import "./announcemodal.css";
import AddAnnouncementModal from "./AddAnnouncementModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAnnouncementByIDHere,
  getAllAnnouncementsHere,
} from "../../redux/actions/announcementAction";
import AnnouncementDeleteModal from "./AnnouncementDeleteModal";
import info from "../../assets/info.svg";
import { BsThreeDotsVertical } from "react-icons/bs";
const Annouce = () => {
  const dispatch = useDispatch();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllAnnouncementsHere());
  }, [dispatch]);
  const announcements = useSelector((state) => state.announcement.announcement);
  console.log(announcements);
  const [expiredAnnouncements, setExpiredAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch your data and update it when the component mounts or as needed
    const fetchData = async () => {
      try {
        // Assuming your getAllAppointments action returns the data you need
        // const allAppointments = response.payload;

        // Filter the appointments to include only those with dates on or after the current date
        const currentDate = new Date();

        const filteredAnnouncements = await announcements?.filter((item) => {
          const announcementDate = new Date(item.validity);
          console.log(currentDate);
          console.log(announcementDate);
          return announcementDate >= currentDate;
        });
        setExpiredAnnouncements(filteredAnnouncements);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
    // fetchData();
    console.log("ok dispatch bho");
    // console.log(data); // This will show the updated data
  }, [announcements]);
  const [modalOpen, setModalOpen] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false)
  // const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const openAnnouncementModal = ()=>{
    setOpenInfoModal(true)
  }
  const onCloseAnnouncementModal = ()=>{
    setOpenInfoModal(false)
  }

  const openModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setModalOpen(false);
  };
  const onCloseDeleteModal = () => {
    setSelectedAnnouncement(null);
    setDeleteModalOpen(false);
  };
  const handleAnnouncementDeleteModal = (announcement)=>{
    console.log(announcement);
    setSelectedAnnouncement(announcement)
    setDeleteModalOpen(true)
  }
  // const handleDeleteAnnouncement = (id) => {
  //   console.log(id);
  //   dispatch(deleteAnnouncementByIDHere(id));
  // };

  const [showETVContainers, setShowETVContainers] = useState({});
  const [hideViewButton, setHideViewButton] = useState({});


  // const handleAnnouncementDeleteModal = (announcement)=>{
  //   console.log(announcement);
  //   setSelectedAnnouncement(announcement)
  //   setDeleteModalOpen(true)
  // }

  const toggleETVContainer = (index) => {
    setShowETVContainers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

    setHideViewButton((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const etvContainerRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        etvContainerRef.current &&
        !etvContainerRef.current.contains(event.target)
      ) {
        // Clicked outside the etv-container, so close it and show viewoff-btn
        setShowETVContainers({});
        setHideViewButton({});
      }
    }

    // Add the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(expiredAnnouncements);

  const [addannouncementmodalOpen, setAddAnnouncementModalOpen] = useState(false);
  const openAddAnnouncementModal = ()=>{
setAddAnnouncementModalOpen(true)
  }
  const closeAddAnnouncementModal = () => {
    setAddAnnouncementModalOpen(false);
  };

  return (
    <div>
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
      <div  className="offer-btn-div">
      <button
        className="flex items-center justify-center px-2 py-2 md:px-[11px] md:py-[8px] text-center 
        text-[#5B76FC] text-inter text-[14.5px]
         font-[600] rounded-[4px] bg-[#fbfbfb] hover:text-[#4d61ba] hover:bg-[#fdfdfd] offer-btn"
          onClick={openAddAnnouncementModal}
        >
          + Add Announcement
        </button>
      </div>
    
    <div className=" flex flex-wrap gap-8">
      {expiredAnnouncements?.map((announcement, index) => (
        <div>
          <Modal
            open={modalOpen}
            onClose={onCloseModal}
            center
            classNames={{
              // overlay: "customOverlay",
              modal: "customModal",
            }}
          >
            {modalOpen && (
              <AnnounceModal
                onCloseModal={onCloseModal}
                announcement={announcement}
              />
            )}
          </Modal>
          <Modal
            open={openInfoModal}
            onClose={onCloseAnnouncementModal}
            center
            classNames={{
              // overlay: "customOverlay",
              modal: "customModal",
            }}
          >
            {openInfoModal && (
              <AnnouncementInfoModal
              onCloseAnnouncementModal={onCloseAnnouncementModal}
              announcement={announcement}
            />
            )}
          </Modal>
          {selectedAnnouncement && (
              <Modal
                open={deleteModalOpen}
                onClose={onCloseDeleteModal}
                center
                classNames={{
                  // overlay: "customOverlay",
                  modal: "customModalInOffers",
                }}
              >
                {console.log(announcement)}
                {deleteModalOpen && (
                  <AnnouncementDeleteModal
                  onCloseDeleteModal={onCloseDeleteModal}
                    announcement={selectedAnnouncement}
                  />
                )}
              </Modal>
            )}
          {/* <div className="w-[100%] sm:w-[450px] md:h-[145px] rounded-[7px] bg-white">
            <div className="w-[100%] sm:w-[450px] h-[50px] bg-[#8FCEDD] rounded-t-[7px] flex items-center justify-center">
              <h2 className="text-white text-[17px] font-[600]">Holiday</h2>
            </div>
            <div className=" flex w-full px-2 md:px-8 py-[17px] justify-between ">
              <div className="flex items-center gap-4">
                <img
                  src={radio}
                  alt="radio"
                  className="w-[12x] h-[12px] -mt-1"
                />
                <p className="text-[12px] md:text-[16px]">
                  {announcement.title}
                </p>
              </div>

              <div
                className="flex items-center gap-0 md:gap-1 cursor-pointer"
                onClick={openModal}
              >
                <p className="text-[10px] md:text-[14px] text-[#4A55A2] ml-[10px] font-[500] min-w-[50px]">
                  {announcement.validity}
                </p>
                <img src={right} alt="right" className="w-[15px] h-[18px]" />
              </div>
            </div>

            <div className="flex mb-3 px-4 items-center justify-end gap-2">
              <img src={edit} alt="edit" />
              <img
                src={trash}
                alt="trash"
                onClick={()=>handleDeleteAnnouncement(announcement._id)}
              />
            </div>
          </div>
        </div> */}

          <div
            key={index}
            className="w-[450px] h-[180px] rounded-[7px] bg-white announce-box"
          >
            <div className="w-[450px] h-[50px] bg-[#9ac9f5] rounded-t-[7px] flex items-center justify-center announce-box-title">
              <h2 className="text-white text-[17px] font-[600]">
                {announcement.title}
              </h2>
            </div>
            <div className=" flex w-full  px-4 py-[17px] gap-3 justify-between inner-a-box">
              <div className="flex items-center gap-3 second-a-box">
                <img
                  src={radio}
                  alt="radio"
                  className="w-[12px] h-[12px]"
                />
                <p className="text-[15px] w-[350px] a-left-p">
                  {announcement.description}
                </p>
                <div className="anninfo-div">
                  <img
                    src={info}
                    alt="right"
                    className="w-[16px] h-[16px] mr-3  mt-[5px] a-right-p-img"
                    onClick={openAnnouncementModal}
                  />
                  <span className="ann-info-tooltiptext">view</span>
                </div>
              </div>
            </div>

            <div className="flex px-[20px] items-center justify-between gap-5">
              <div
                style={{ display: "flex", gap: "10px", paddingLeft: "25px", width:"70%" }}
              >
                <p className="text-[13px] font-normal">Valid upto: {announcement.validity}</p>
                {/* <p className="text-[13px] text-[#4A55A2]  font-[500] a-right-p">
                  {announcement.validity}
                </p> */}
              </div>
              <div className="edit-trash-container">
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    marginRight: "0.8rem",
                  }}
                >
                  <img
                    src={edit}
                    onClick={openModal}
                    alt="edit"
                    className="w-[15px] h-[15px] cursor-pointer"
                    title="edit"
                  />
                  <img
                    src={trash}
                    onClick={() => handleAnnouncementDeleteModal(announcement)}
                    alt="trash"
                    className="w-[14px] h-[16px] cursor-pointer"
                    title="delete"
                  />
                </div>
              </div>
            </div>

            <div className="viewoff-btn-container viewann-btn-container">
              {!hideViewButton[index] && (
                <button
                  className="viewoff-btn"
                  onClick={() => toggleETVContainer(index)}
                >
                  <BsThreeDotsVertical />
                </button>
              )}
              {showETVContainers[index] && (
                <div ref={etvContainerRef} className="etv-container">
                  {/* Contents of etv-container */}
                  <img
                    src={info}
                    alt="right"
                    className="w-[15px] h-[18px] right-p-img offer-info-img"
                    onClick={openModal}
                  />
                  <img
                    src={edit}
                    onClick={openModal}
                    alt="edit"
                    className="w-[15px] h-[15px]"
                  />
                  <img
                    src={trash}
                    onClick={() => handleAnnouncementDeleteModal(announcement)}
                    alt="trash"
                    className="w-[14px] h-[16px]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Annouce;