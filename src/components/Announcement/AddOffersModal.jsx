import React, { useState }  from "react";
import { Formtik, useFormik } from "formik";
import { offerSchema } from "../../schemas/offerSchema";
import { useDispatch, useSelector } from "react-redux";
import {createNewOffer } from "../../redux/actions/offerAction";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./offermodal.css";

const AddOffersModal = () => {
  const onHandleOfferSubmitButton = () => {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true); // State to control modal visibility
  const notify = () =>
    toast.success(
      "Offer created Successfully!!!",
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      },
      { className: "toast-message" }
    );
  const notifyFailure = () =>
    toast.error(
      "Error Occured !!!",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      },
      { className: "toast-message" }
    );
  const onSubmit = async (values, actions) => {

    const title = values.title;
    const message = values.message;
    const description = values.description;
    const date = values.date;
    console.log(title, message, description,date);
    // console.log("email is", newEmail);
    try {
      const success = await dispatch(
        createNewOffer({ title:title, message:message, description:description, validity:date })
      );
      if (success) {
        notify();
      setIsModalOpen(false); // Close the modal

        // navigate("/dashboard");
      } else {
        notifyFailure();
      }
    } catch (error) {
      notifyFailure();
      console.log(error);
    }
    actions.resetForm();
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      message: "",
      description: "",
      date: "",
    },
    validationSchema: offerSchema,
    onSubmit,
  });
  console.log(errors);
  return (
    <>
    {isModalOpen && ( // Render the modal conditionally based on the state
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex md:w-[400px] md:h-[auto] flex-col bg-[#ffffff] rounded-[10px] add-offers-form"
        >
          <h1 className="text-center  text-[22px] font-[600] md:py-4 text-[#19a7ce]">
            Add Offers
          </h1>
          <div className="flex items-center relative mx-3">
            {/* <img className="w-3.5  absolute left-4" src={user} alt="user"></img> */}
            <input
              className={`w-full rounded-[5px]  text-[14px] h-[39px] m-2 pl-[12px] border-[0.5px]  
              focus:bg-white focus:outline-none focus:ring-0.5 focus:ring-slate-500 
               placeholder:text-[#8B8989] bg-[#dceaff4d]   placeholder:text-[13px]  md:w-[400px]
                md:h-[45px] md:placeholder:text-[15px] md:pl-[12px] add-input ${
                errors.title && touched.title
                  ? "input-error"
                  : "border border-solid border-1  border-[#DDE7F2]"
              }`}
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Title"
            />
            {/* {formErrors.name && (
          <p className="text-red-500  absolute right-2 text-[12px] mx-3 ">
            {formErrors.name}*
          </p>
        )} */}
          </div>
          <div className="flex  items-center relative mx-3">
            {/* <img className="w-4 absolute left-4" src={mail} alt="mail"></img> */}
            <input
              className={`w-full rounded-[5px]  text-[14px] h-[39px] m-2 pl-[12px] border-[0.5px]  
              focus:bg-white focus:outline-none focus:ring-0.5 focus:ring-slate-500 
               placeholder:text-[#8B8989] bg-[#dceaff4d]   placeholder:text-[13px]  md:w-[400px]
                md:h-[45px] md:placeholder:text-[15px] md:pl-[12px] add-input ${
                errors.message && touched.message
                  ? "input-error"
                  : "border border-solid border-1  border-[#DDE7F2]"
              }`}
              type="text"
              name="message"
              value={values.message}
              onChange={handleChange}
              placeholder="Message"
            />
            {/* {formErrors.email && (
          <p className="text-red-500  absolute right-2 text-[12px] mx-3 ">
            {formErrors.email}*
          </p>
        )} */}
          </div>
          <div className="flex items-center relative mx-3">
            {/* <img
          className="w-4 h-4 absolute left-4"
          src={phone}
          alt="phone"
        ></img> */}
            <input
              className={`w-full rounded-[5px]  text-[14px] md:h-[90px] m-2 pl-[12px] border-[0.5px]  
              focus:bg-white focus:outline-none focus:ring-0.5 focus:ring-slate-500 
               placeholder:text-[#8B8989] bg-[#dceaff4d]   placeholder:text-[13px]  md:w-[400px]
                md:h-[45px] md:placeholder:text-[15px] md:pl-[12px] pb-5 add-input off-d ${
                errors.description && touched.description
                  ? "input-error"
                  : "border border-solid border-1  border-[#DDE7F2]"
              }`}
              type="text"
              name="description"
              placeholder="Description"
              value={values.description}
              onChange={handleChange}
            />
            {/* {formErrors.contact && (
          <p className="text-red-500  absolute right-2 text-[12px] mx-3 ">
            {formErrors.contact}*
          </p>
        )} */}
          </div>
          {/* SERVICE */}

          <div className="  mx-3 flex  flex-col md:justify-start md:items-center md:gap-5 md:flex-row ">
            <div className=" relative w-[100px] md:w-auto ">
              {/* <img
            className=" hidden md:block md:w-4 left-2 absolute md:left-4 top-[1.40rem]"
            src={calender}
            alt="calender"
          ></img> */}
              <input
                type="date"
                name="date"
                value={values.date}
                placeholder="Date"
                onChange={handleChange}
                className={` text-[14px] border-none h-[39px] pr-[8px] md:pl-[12px] w-full rounded-[5px]  
                text-[#8B8989]  m-2  border-[0.5px]  focus:bg-white focus:outline-none focus:ring-0.5 
                focus:ring-slate-500  bg-[#dceaff4d] shadow-shado2   md:w-[150px] md:h-[45px] 
                 md:text-[15px] add-input ${
                  errors.date && touched.date
                    ? "input-error"
                    : "border border-solid border-1  border-[#DDE7F2]  off-date"
                }`}
             />
                {/* <p>Select Offer Validity</p> */}
           
            </div>

            {/* <div className=" relative w-[100px] md:w-auto ">
              <select
                name="time"
                className="rounded-[5px] border-none m-2 mr-11 text-[14px] text-[#8B8989] h-[39px] md:m-2 pl-[17px] border-[0.5px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 bg-[#dceaff4d] shadow-shado2 md:w-[150px] md:h-[45px] md:pl-[30px] md:text-[15px]"
              >
                <option value="">Select Date</option>

                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
              </select>
            </div> */}
          </div>

          <div className="flex justify-center items-center mt-4 mb-4">
            <button
              type="submit"
              disabled={isSubmitting}
              // onClick={onHandleOfferSubmitButton}
              className="bg-[#0AA1DD] text-[white] font-[600] font-inter p-3 rounded-[5px] flex justify-center  items-center text-[14px] h-[39px] "
              style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
            >
              Submit
            </button>
          </div>

          {/* <Modal
        classNames={{
          modal: "customModalSucess",
        }}
        open={openSucess}
        onClose={onCloseSucess}
        center
        closeIcon={closeIcon2}
      >
        <div className="h-[55px] flex flex-col justify-center items-center bg-[#A2DC77]">
          <p className=" text-[white] w-full text-center text-[17px] font-[600] tracking-wide font-inter">
            Sucess
          </p>
          <div className=" w-full relative">
            <img
              src={sucessGreen}
              className="w-[30px] h-[30px] absolute bottom-[-30px]  left-1/2 transform -translate-x-1/2"
              alt=""
            />
          </div>
        </div>

        <Detail data={formData} />
        <div className=" font-roboto mb-3 gap-[90px]  flex justify-evenly">
          <button
            type="button"
            onClick={onCloseSucess}
            className="border-none text-white bg-[#A2DC77] hover:bg-[#8ed35a] rounded-md"
            style={{
              padding: "8px 17px 10px 18px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
          >
            Edit
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="border-none  text-[#4a4a4a] rounded-md bg-[#e9edf5] hover:bg-[#e2e9f7] "
            style={{
              padding: "8px 17px 10px 18px",

              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
          >
            Submit
          </button>
        </div>
      </Modal> */}
        </form>

        {/* <Modal
      classNames={{
        modal: "customModalCalender",
      }}
      open={open}
      onClose={onCloseModal}
      center
      closeIcon={closeIcon}
    >
      <Simple onSelectDate={handleSelectedDate} />
      {/* <Calendar onSelectDate={handleSelectedDate} /> */}
        {/* </Modal> */}
      </div>
      )}
    </>
  );
};

export default AddOffersModal;
