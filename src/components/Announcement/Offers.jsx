import React, { useEffect, useState } from "react";
import radio from "../images/radio1.png";
import right from "../images/right.png";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import OfferModal from "./OfferModal";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import edit from "../../assets/edit.png";
import trash from "../../assets/trash2.png";
import info from "../../assets/info.svg";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./offermodal.css";
import AddOffersModal from "./AddOffersModal";
import OfferInfoModal from "./OfferInfoModal"
import "./offerPage.css"
import {
  getAllAppointments,
  getAllOffers,
  getAllOffersHere,
} from "../../redux/actions/offerAction";
import OfferDeleteModal from "./OfferDeleteModal";
const Offers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOffersHere());
  }, [dispatch]);
  const offers = useSelector((state) => state.offer.offer);
  const [expiredOffers, setExpiredOffers] = useState([]);

  // console.log(offers);
  useEffect(() => {
    // Fetch your data and update it when the component mounts or as needed
    const fetchData = async () => {
      try {
        // Assuming your getAllAppointments action returns the data you need
        // const allAppointments = response.payload;

        // Filter the appointments to include only those with dates on or after the current date
        const currentDate = new Date();
      
        const filteredOffers = await offers?.filter((item) => {
          const offerDate = new Date(item.validity);
          return offerDate >= currentDate;
        });
        setExpiredOffers(filteredOffers)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
    // fetchData();
    console.log("ok dispatch bho");
    // console.log(data); // This will show the updated data
  }, [offers]);
  // console.log(expiredAnnouncements);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false)
  const openInfoModal = (offer)=>{
    setSelectedOffer(offer);
    setShowInfoModal(true)
  }
  const closeInfoModal = ()=>{
    setSelectedOffer(null);
    setShowInfoModal(false)

  }

  const openModal = (offer) => {
    // console.log(offer);
    setSelectedOffer(offer);
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setSelectedOffer(null);
    setModalOpen(false);
  };
  const onCloseDeleteModal = () => {
    setSelectedOffer(null);
    setDeleteModalOpen(false);
  };
  const handleOfferDeleteModal = (offer)=>{
    console.log(offer);
    setSelectedOffer(offer)
    setDeleteModalOpen(true)
  }
  const [showETVContainers, setShowETVContainers] = useState({});
  const [hideViewButton, setHideViewButton] = useState({});

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

  const [addmodalOpen, setAddModalOpen] = useState(false);
  const openAddModal = () => {
    setAddModalOpen(true);
  };
  const closeAddModal = () => {
    setAddModalOpen(false);
  };
 

  return (
    <div>
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
     <div className="offer-btn-div">
     <button
         className="flex items-center justify-center px-2 py-2 md:px-[11px] md:py-[8px] text-center 
         text-[#5B76FC] text-inter text-[14.5px]
          font-[600] rounded-[4px] bg-[#fbfbfb] hover:text-[#4d61ba] hover:bg-[#fdfdfd] offer-btn"
          onClick={openAddModal}
        >
          + Add Offers
        </button>
     </div>
      
    
    <div className="flex flex-wrap gap-8 offer-details">
        
      {expiredOffers?.map((offer, index) => (
        <div
          key={index}
          className="w-[450px] h-[180px] rounded-[7px] bg-white offer-box"
        >
          <div className="w-[450px] h-[50px] bg-[#a5c7cd] rounded-t-[7px] flex items-center justify-center offer-box-title">
            <h2 className="text-white text-[17px] font-[600]">{offer.title}</h2>
          </div>
          <div className="flex w-full px-4 py-[17px] gap-3  items-center  second-div-offer">
            <img
              src={radio}
              alt="radio"
              className="w-[12x] h-[12px] mt-[3px]"
            />
            <p className="text-[15px]  w-[350px] left-p">{offer.description}</p>
            {/* <p className="text-[12px] text-[#4A55A2] ml-[20px] font-[500]  w-[250px] right-p">
            {offer.from} - {offer.to}
          </p> */}
            <div className="offinfo-div">
              <img
                src={info}
                alt="right"
                className="w-[15px] h-[18px] right-p-img mt-[8px] offer-info-img"
                onClick={() => openInfoModal(offer)}
              />
              <span className="off-info-tooltiptext">view</span>
            </div>
          </div>
          <>
          {selectedOffer && (
              <Modal
                open={showInfoModal}
                onClose={closeInfoModal}
                center
                classNames={{
                  // overlay: "customOverlay",
                  modal: "customModalInOffers",
                }}
              >
                {console.log(offer)}
                {showInfoModal && (
                  <OfferInfoModal
                  closeInfoModal={closeInfoModal}
                    offer={selectedOffer}
                  />
                )}
              </Modal>
            )}
            {selectedOffer && (
              <Modal
                open={modalOpen}
                onClose={onCloseModal}
                center
                classNames={{
                  // overlay: "customOverlay",
                  modal: "customModalInOffers",
                }}
              >
                {console.log(offer)}
                {modalOpen && (
                  <OfferModal
                    onCloseModal={onCloseModal}
                    offer={selectedOffer}
                  />
                )}
              </Modal>
            )}
            {selectedOffer && (
              <Modal
                open={deleteModalOpen}
                onClose={onCloseDeleteModal}
                center
                classNames={{
                  // overlay: "customOverlay",
                  modal: "customModalInOffers",
                }}
              >
                {console.log(offer)}
                {deleteModalOpen && (
                  <OfferDeleteModal
                  onCloseDeleteModal={onCloseDeleteModal}
                    offer={selectedOffer}
                  />
                )}
              </Modal>
            )}
          </>

          <div className="flex px-4 items-center justify-between inner-bottom-div">
            <div
              style={{
                display: "flex",
                gap: "10px",
                paddingLeft: "25px",
                width: "70%",
              }}
            >
              <p className="text-[13px] font-normal">Valid upto: {offer.validity}:</p>
              {/* <p className="text-[13px] text-[#4A55A2] font-[500]  w-[250px]  right-p">
                {offer.from} - {offer.to}
              </p> */}
            </div>
            <div className="edit-trash-container mr-5">
              <div className="flex  items-center justify-end  offer-edit-r">
                <div className="flex gap-3">
                  <img src={edit}  onClick={() => openModal(offer)} alt="edit" className="w-[15px] h-[15px] cursor-pointer" title="edit"/>
                  <img src={trash} onClick={()=>handleOfferDeleteModal(offer)} alt="trash" className="w-[14px] h-[16px] cursor-pointer" title="delete"/>
                </div>
              </div>
            </div>
          </div>

          <div className="viewoff-btn-container">
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
                <img
                  src={info}
                  alt="right"
                  className="w-[15px] h-[18px] right-p-img offer-info-img cursor-pointer"
                  onClick={() => deleteModalOpen(offer)}
                />
                <img src={edit} onClick={() => openModal(offer)} alt="edit" className="w-[15px] h-[15px] cursor-pointer" />
                <img src={trash} onClick={()=>handleOfferDeleteModal(offer)} alt="trash" className="w-[14px] h-[16px] cursor-pointer" />
              </div>
            )}
          </div>
        </div>

        // <div>
        //   <div className="">
        //     <div className="w-[100%] sm:w-[450px] sm:h-[145px] rounded-[7px] bg-white">
        //       <div className="w-[100%] sm:w-[450px] h-[50px] bg-[#8FCEDD] rounded-t-[7px] flex items-center justify-center">
        //         <h2 className="text-white text-[17px] font-[600]">Offers</h2>
        //       </div>
        //       <div className=" flex w-full px-2 md:px-8 py-[17px] justify-between ">
        //         <div className="flex gap-4">
        //           <img
        //             src={radio}
        //             alt="radio"
        //             className="w-[12x] h-[12px] mt-0 md:mt-1"
        //           />
        //           <p className="text-[12px] md:text-[16px]">{offer.title}</p>
        //         </div>
        //         <div
        //           className="flex gap-2 md:gap-1 cursor-pointer "
        //           onClick={() => openModal(offer)}
        //         >
        //           <img
        //             src={right}
        //             alt="right"
        //             className="w-[12px] h-[16px] md:w-[15px] md:h-[18px]"
        //           />
        //         </div>
        //       </div>
        //       <div className="flex px-4 items-center justify-between">
        //         <p className="text-[12px] md:text-[14px] text-[#6A5F5F]">
        //           Validity
        //         </p>
        //         <p className="text-[12px] md:text-[14px] text-[#6A5F5F] mr-[10px]">
        //           {offer.validity}
        //         </p>
        //       </div>
        //     </div>
        //     {selectedOffer && (
        //       <Modal
        //         open={modalOpen}
        //         onClose={onCloseModal}
        //         center
        //         classNames={{
        //           // overlay: "customOverlay",
        //           modal: "customModalInOffers",
        //         }}
        //       >
        //         {console.log(offer)}
        //         {modalOpen && (
        //           <OfferModal onCloseModal={onCloseModal} offer={selectedOffer} />
        //         )}
        //       </Modal>
        //     )}
        //   </div>
        // </div>
      ))}
    </div>
    </div>
  );
};

export default Offers;