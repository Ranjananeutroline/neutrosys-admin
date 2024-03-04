import React, { useState, useContext, useEffect } from "react";
// import AddService from "./AddService";
import ViewService from "./ViewService";
import edit from "../../assets/edit.png";
import view from "../../assets/icons-view.png";
import trash from "../../assets/icons-trash.png";
import Modal from "react-responsive-modal";
import AddService from "./AddService";
import AddNewService from "./AddNewService";
import { AppContext } from "../../AppContext";
import "./service.css";
import { FaPlus } from "react-icons/fa6";

const Service = () => {
  const [checked, setChecked] = useState(false);
  const { serviceDataFromModal, setServiceDataFromModal } =
    useContext(AppContext);
    const {businessDataFromModal}=useContext(AppContext);
    const businessDaysFrom = businessDataFromModal.workHours?.businessDaysFrom ||"from";
    const businessDaysTo = businessDataFromModal.workHours?.businessDaysTo || "To";
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [addModal, setAddModal] = useState(false);

  const handleToggle = (itemId) => {
    // Find the item in the data array and update its checked state
    const updatedServiceData = serviceDataFromModal.map((item) => {
      if (item.id === itemId) {
        // Toggle the visibility property
        return { ...item, visibility: !item.visibility };
      }
      return item;
    });

    // Update the serviceDataFromModal array with the updatedServiceData
    setServiceDataFromModal(updatedServiceData);
  };
  const [data, setData] = useState([
    {
      id: "",
      servicename: "",
      availability: "",
      duration: "",
      visibility: false,
      action: "hi",
    },
    // Add more data objects here as needed
  ]);

  const getAvailabilityDays = (availability) => {
    
    return availability.trim().split(""); // Split the availability string into individual characters
  };

  const getDayLabel = (day) => {
    // Define a mapping between characters and their corresponding labels
    const dayLabels = {
      Monday: "M",
      Tuesday: "T",
      Wednesday: "W",
      // Add more day labels here as needed
    };
    return dayLabels[day] || day; // If a label exists, return the label; otherwise, return the original character
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => setModalOpen(false);

  const viewDetails = (service) => {
    // Include the day.visibility value in the selectedService object
  const selectedServiceWithVisibility = {
    ...service,
    visibility: service.weekdays.map((day) => day.visibility),
    description:serviceDataFromModal.description,
  };
    setSelectedService(service);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setAddModal(true);
  };
  const closeAddModal = () => {
    setAddModal(false);
  };
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const handleDelete = (itemId) => {
    // Filter out the item with the matching id from the serviceDataFromModal array
   
    setServiceToDelete(itemId);
    setConfirmModalOpen(true);
  };
  const confirmDelete = () => {
    // Filter out the item with the matching id from the serviceDataFromModal array
    const updatedServiceData = serviceDataFromModal.filter(
      (item) => item.id !== serviceToDelete
    );
    setServiceDataFromModal(updatedServiceData);
    setConfirmModalOpen(false); // Close the confirmation modal after deletion
  };
  useEffect(() => {
    console.log(serviceDataFromModal);
  }, [serviceDataFromModal]);

  const [editServiceData, setEditServiceData] = useState(null);
  // Function to handle the "Edit" action
  const handleEdit = (service) => {
    setEditServiceData(service);
    setAddModal(true);
  };
  const handleAddNewService = () => {
    // Reset editServiceData when adding a new service
    setEditServiceData(null);
    setAddModal(true);
  };
  return (
    <div>
      <Modal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        center
        classNames={{
          overlay: "service-delete",
          modal: "customModal",
          closeButton: "customButton",
        }}
      >
 <div className="w-full sm:w-[450px]  bg-[white] rounded-[10px] h-full"> 
 <div className="w-full sm:w-[450px] sm:h-[60px] p-2  rounded-t-[10px] flex items-left justify-left">
 <h1 className="text-[18px] p-4">Are you sure want to delete this service?</h1>
 </div>
 <div className="flex  pb-4 sm:pb-0 mt-[2.2rem] gap-3 justify-end px-4  ">
        <button
          className="bg-[#6499E9] text-[white] font-[600] font-inter px-[14px] rounded-[5px] flex justify-center  items-center text-[13.3px] h-[36px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          onClick={confirmDelete}
        >
          Delete
        </button>
        <button
          className=" border-1 border-[#6499E9] text-[#6499E9] font-[600] font-inter px-[14px] rounded-[5px] flex justify-center  items-center text-[13.3px] h-[36px]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          onClick={() => setConfirmModalOpen(false)}
        >
          Cancel
        </button>{" "}
      </div>
    </div>
    </Modal>
      
      {addModal && (
      <Modal
        open={addModal}
        onClose={closeAddModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "add-service error-service",
          closeButton: "customButton",
        }}
      >
        <AddNewService
          setServiceDataFromModal={setServiceDataFromModal}
          setOpenModal={openAddModal}
          onCloseModal={closeAddModal}
          editService={editServiceData} // Pass the selected service data as the editService prop
          mode={editServiceData ? "edit" : "add"}
          data={editServiceData ? "update": "add"}
        />
      </Modal>
)}
      <Modal
        open={modalOpen}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "preview",
          modal: "customModal",
          closeButton: "customButton",
        }}
      >
        {selectedService && (
          <ViewService service={selectedService} onCloseModal={onCloseModal} />
        )}
      </Modal>
      <div className="flex justify-between items-end">
        <h1 className="text-[22px] text-[#0C1A97]  mb-[-5px]">All Services</h1>
        <button
          className="bg-[#f8f8f8] px-[11px] py-[8px] text-[#5B76FC] font-[600] shadow-md rounded-[4px] mr-1 hover:text-[#4d61ba] hover:bg-[#fdfdfd]"
          onClick={handleAddNewService} // Call handleAddNewService function when "Add New Service" button is clicked
        >
          + Add Services
        </button>
      </div>
      <div className=" flex justify-center mt-[8px] rounded-[10px] w-full">
        <div className="max-h-[250px] overflow-y-auto rounded-[10px] w-full">
          <table className="table-auto border rounded-md w-full">
            <thead className="border rounded-[100px] sticky top-0">
              <tr className="h-[50px]  text-[15px] bg-[#d6e0fa] rounded-[10px] ">
                <th className="font-man font-medium md:w-[60px] text-center s-id s-th">ID</th>
                <th className="font-man font-medium md:w-[220px] text-center s-sname s-th">
                  Service Name
                </th>
                <th className="font-man font-medium md:w-[200px] text-center s-avi s-th">
                  Availability
                </th>
                <th className="font-man font-medium md:w-[150px] text-center s-dur s-th">Duration</th>
                <th className="font-man font-medium md:w-[120px] text-center s-visi s-th">
                  Visibility
                </th>
                <th className="font-man font-medium  md:w-[100px] text-center s-act s-th ">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {data.map((item) => ( */}
              {Array.isArray(serviceDataFromModal) &&
              serviceDataFromModal.length > 0 ? (
                // {formDataFromModal !== null ? (
                serviceDataFromModal.map((offer, index) => (
                  <tr key={offer.id} className="border h-[40px] bg-[#f4f2f2]">
                    <td className=" text-center">{offer.id}</td>
                    <td className="text-center">{offer.servicename}</td>
                    <td className="text-center flex items-center justify-center gap-[3px]">
                      {/* Render availability days */}
                      {offer.weekdays.map(
                        (day, dayIndex) =>
                          day.visibility && (
                            <button
                              key={dayIndex}
                              className="flex w-[30px] h-[32px]  justify-center items-center text-[#5B76FC] rounded-lg cursor-default"
                            >
                              {day.name.substring(0, 2).toUpperCase()}
                            </button>
                          )
                      )}
                    </td>
                    {/* <td className="text-center flex items-center justify-center">
                     
                      {offer.weekdays.map((day, dayIndex) =>
                        day.visibility && (
                          <React.Fragment key={dayIndex}>
                            {dayIndex > 0 && dayIndex < offer.weekdays.length - 1 && (
                              <span style={{ color: "#5B76FC" }}>, </span>
                            )}
                            <button
                              className="flex w-[35px] h-[28px] p-[10px] text-[14px] justify-center items-center  text-[#5B76FC] rounded-lg cursor-default"
                            >
                              {day.name}
                            </button>
                          </React.Fragment>
                        )
                      )}
                    </td> */}

                    <td className=" text-center text-[#00AA3A]">
                      {offer.duration}
                    </td>
                    <td className="flex items-center justify-evenly  h-[59px]  ">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          {/* Hidden input to hold the toggle state */}
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={offer.visibility}
                            onChange={() => handleToggle(offer.id)} // Use onChange instead of onClick
                          />
                          {/* Track (background) */}
                          <div
                            className={`w-[35px] h-[16px] rounded-full shadow-inner v-bg ${
                              offer.visibility ? "bg-[#08A0E9]" : " bg-gray-300"
                            }`}
                          ></div>
                          {/* Thumb (circle) */}
                          <div
                            className={`absolute top-0 left-0 w-[16px] h-[16px] bg-white rounded-full shadow transform transition-transform v-circle ${
                              offer.visibility
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          ></div>
                        </div>
                      </label>
                    </td>

                    <td className="text-center justify-center ">
                      <div className="flex gap-2 items-center justify-center w-[100px] action-inner">
                        <button onClick={() => handleEdit(offer)}>  
                        <img src={edit} alt="edit" className="w-5 cursor-pointer" title="edit"></img>
                        </button>
                        <button onClick={() => viewDetails(offer)}>
                          <img src={view} className="w-5" alt="view" title="view"></img>
                        </button>
                        <img
                          src={trash}
                          className="w-5 cursor-pointer"
                          alt="delete"
                          title="delete"
                          onClick={() => handleDelete(offer.id)}
                          // Call the handleDelete function on click
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className=" py-1 px-4 h-[45px] cursor-pointer new-s"  onClick={handleAddNewService}>
                  <p className="flex gap-[5px]"><FaPlus style={{marginTop:"2px", color:"#5B76FC"}}/> Add New Services</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Service;
