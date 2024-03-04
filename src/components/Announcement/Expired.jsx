import React, { useState } from "react";
import radio from "../images/radio1.png";
import edit from "../../assets/edit.png";
import trash from "../../assets/trash2.png";
import "./offerPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAnnouncementByIDHere,
  getAllAnnouncementsHere,
} from "../../redux/actions/announcementAction";
import { Modal } from "react-responsive-modal";
import { getAllOffersHere } from "../../redux/actions/offerAction";
import OfferModal from "./OfferModal";
import OfferDeleteModal from "./OfferDeleteModal";
import AnnouncementDeleteModal from "./AnnouncementDeleteModal";
import AnnounceModal from "./AnnounceModal";
const Expired = () => {
  const dispatch = useDispatch();
  const [expiredAnnouncements, setExpiredAnnouncements] = useState([]);
  const [expiredOffers, setExpiredOffers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAnnouncementOpen, setModalAnnouncementOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  useEffect(() => {
    dispatch(getAllAnnouncementsHere());
    dispatch(getAllOffersHere());
  }, [dispatch]);
  const openModal = (offer) => {
    // console.log(offer);
    setSelectedOffer(offer);
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setSelectedOffer(null);
    setModalOpen(false);
  };
  const openAnnouncementModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setModalAnnouncementOpen(true);
  };
  const onCloseAnnouncementModal = () => {
    setSelectedAnnouncement(null);
    setModalAnnouncementOpen(false);
  };
  const onCloseDeleteModal = () => {
    setSelectedOffer(null);
    setDeleteModalOpen(false);
  };
  const handleOfferDeleteModal = (offer) => {
    console.log(offer);
    setSelectedOffer(offer);
    setDeleteModalOpen(true);
  };
  const handleDeleteAnnouncement = (announcement) => {
    console.log(announcement);
    setSelectedAnnouncement(announcement);
    setDeleteModalOpen(true);
  };
  // const allAppointments = useSelector((state) => state.appointment.appointment);
  // console.log(allAppointments);
  const announcements = useSelector((state) => state.announcement.announcement);
  const offers = useSelector((state) => state.offer.offer);
  console.log(offers);
  console.log(announcements);
  useEffect(() => {
    // Fetch your data and update it when the component mounts or as needed
    const fetchData = async () => {
      try {
        console.log(announcements);
        // Assuming your getAllAppointments action returns the data you need
        // const allAppointments = response.payload;

        // Filter the appointments to include only those with dates on or after the current date
        const currentDate = new Date();
        const filteredAnnouncements = await announcements?.filter((item) => {
          const announcementDate = new Date(item.validity);
          return announcementDate < currentDate;
        });
        const filteredOffers = await offers?.filter((item) => {
          const offerDate = new Date(item.validity);
          return offerDate < currentDate;
        });
        console.log(filteredAnnouncements);
        setExpiredAnnouncements(filteredAnnouncements);
        setExpiredOffers(filteredOffers);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
    // fetchData();
    console.log("ok dispatch bho");
    // console.log(data); // This will show the updated data
  }, [announcements, offers]);
  // console.log(expiredAnnouncements);

  return (
    <div className="flex flex-row expired-main">
      <div className=" flex flex-col  w-[450px]  items-center justify-center gap-2 inner-expire">
        <h2 className=" px-[4px] py-[8px] flex items-center justify-center bg-[#b8d0d5] w-full rounded-[10px] border shadow-sm text-[18px] font-[600] text-white">
          Offers
        </h2>
        <div className="h-[345px] w-full bg-white rounded-[10px] overflow-y-auto border shadow-md scrolldiv">
          {expiredOffers?.map((offer, index) => (
            <div className=" flex flex-col h-[50px] bg-[#F1F6F9] m-3 rounded-[10px]  justify-center hover:bg-[#e1edf3] hover:shadow-sm inner-scroll-div">
              <div className=" flex w-full   justify-between ">
                <div className=" flex w-full  px-3  gap-2 items-center second-inner">
                  <img
                    src={radio}
                    alt="radio"
                    className="w-[12x] h-[12px] e-radio-img"
                  />
                  <p className="text-[13px] w-[100px] offer-t">{offer.title}</p>
                  <p className="text-[13px] text-[#4A55A2] font-[500] w-[175px] e-right-p">
                    {offer.validity}
                  </p>
                  <div className="flex gap-1 ml-[25px] e-right-div">
                    <img
                      onClick={() => openModal(offer)}
                      src={edit}
                      alt="edit"
                      className="w-[14px] h-[14px] cursor-pointer"
                      title="Reuse"
                    />
                    <img
                      onClick={() => handleOfferDeleteModal(offer)}
                      src={trash}
                      alt="trash"
                      className="w-[14px] h-[14px] cursor-pointer"
                      title="Delete"
                    />
                    <>
                      {selectedOffer && (
                        <Modal
                          open={modalOpen}
                          onClose={onCloseModal}
                          center
                          classNames={{
                            overlay: "customOverlayOffers",
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
                            overlay: "customOverlayOffers",
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col  w-[450px]  items-center justify-center gap-2 inner-expire">
        <h2 className="  px-[4px] py-[8px] flex items-center justify-center bg-[#a2d2ff] w-full rounded-[10px] border shadow-sm text-[18px] font-[600] text-white">
          Announcement
        </h2>
        <div className="h-[345px] w-full bg-white rounded-[10px] overflow-y-auto border shadow-md scrolldiv">
          {expiredAnnouncements?.map((announcement, index) => (
            <div className=" flex flex-col h-[50px] bg-[#F1F6F9] m-3 rounded-[10px]  justify-center hover:bg-[#e1edf3] hover:shadow-sm inner-scroll-div">
              <div className=" flex w-full   justify-between ">
                <div className=" flex w-full  px-3  gap-2 items-center second-inner">
                  <img
                    src={radio}
                    alt="radio"
                    className="w-[12x] h-[12px] e-radio-img"
                  />
                  <p className="text-[13px] w-[120px] ann-t">{announcement.title}</p>
                  <p className="text-[13px] text-[#4A55A2] w-[175px] font-[500] e-right-p">
                    {announcement.validity}
                  </p>
                  <div className="flex gap-1 ml-[20px] e-right-div">
                    <img
                      onClick={() => openAnnouncementModal(announcement)}
                      src={edit}
                      alt="edit"
                      className="w-[14px] h-[14px] cursor-pointer"
                      title="Reuse"
                    />
                    <img
                       onClick={() => handleDeleteAnnouncement(announcement)}
                      src={trash}
                      alt="trash"
                      className="w-[14px] h-[14px] cursor-pointer"
                      title="Delete"
                    />
                  </div>
                  <Modal
                    open={modalAnnouncementOpen}
                    onClose={onCloseAnnouncementModal}
                    center
                    classNames={{
                      overlay: "customOverlayOffers",
                      modal: "customModalInOffers",
                    }}
                  >
                    {modalAnnouncementOpen && (
                      <AnnounceModal
                        onCloseModal={onCloseAnnouncementModal}
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
                        overlay: "customOverlayOffers",
                        modal: "customModalInOffers",
                      }}
                    >
                      {deleteModalOpen && (
                        <AnnouncementDeleteModal
                          onCloseDeleteModal={onCloseDeleteModal}
                          announcement={selectedAnnouncement}
                        />
                      )}
                    </Modal>
                  )}







                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expired;