import React, { useState, useEffect, useContext } from "react";
import "./addnewservice.css";
import add from "../assets/add.png";
import trash from "../assets/trash.png";
import { AppContext } from "../../AppContext";
const AddNewService = ({
  setOpenModal,
  onCloseModal,
  editService,
  mode,
  data,
}) => {
  const { serviceDataFromModal, setServiceDataFromModal, setHello } =
    useContext(AppContext);
  const { businessDataFromModal } = useContext(AppContext);
 // Initialize lastAssignedId with the maximum existing service ID + 1
 const existingServiceIds = serviceDataFromModal.map((service) =>
 parseInt(service.id)
);
const initialLastAssignedId = Math.max(...existingServiceIds, 0) + 1;
const [lastAssignedId, setLastAssignedId] = useState(initialLastAssignedId);
  const [newService, setNewService] = useState({
    id: editService ? editService.id : (lastAssignedId ).toString(), // Set id for editing, or leave it empty for new service
    servicename: editService ? editService.servicename : "",
    availability: editService ? editService.availability : "",
    duration: editService ? editService.duration : "",
    visibility: editService ? editService.visibility : false,
    description: editService ? editService.description : "",
    weekdays: [
      {
        name: "Mon",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        option5: "",
        option6: "",
        visibility: false,
        selected: false,
      },
      {
        name: "Tue",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        option5: "",
        option6: "",
        visibility: false,
        selected: false,
      },
      {
        name: "Wed",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        option5: "",
        option6: "",
        visibility: false,
        selected: false,
      },
      {
        name: "Thu",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        option5: "",
        option6: "",
        visibility: false,
        selected: false,
      },
      {
        name: "Fri",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        option5: "",
        option6: "",
        visibility: false,
        selected: false,
      },
      {
        name: "Sat",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        option5: "",
        option6: "",
        visibility: false,
        selected: false,
      },
      {
        name: "Sun",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        option5: "",
        option6: "",
        visibility: false,
        selected: false,
      },
    ],
  });
  const [useCustomHours, setUseCustomHours] = useState(false);

  // Set visibility and selected properties based on businessDaysFrom and businessDaysTo
  useEffect(() => {
    if (!useCustomHours) {
      const businessDaysFrom = businessDataFromModal.workHours.businessDaysFrom;
      const businessDaysTo = businessDataFromModal.workHours.businessDaysTo;
      const updatedWeekdays = newService.weekdays.map((weekday, i) => ({
        ...weekday,
        visibility: i >= businessDaysFrom && i <= businessDaysTo,
        selected: i >= businessDaysFrom && i <= businessDaysTo,
      }));
      setNewService((prevState) => ({
        ...prevState,
        weekdays: updatedWeekdays,
      }));
    }
  }, [useCustomHours, businessDataFromModal]);

  const handleWeekdayButtonClick = (index) => {
    if (!useCustomHours) {
      // If customizeHours is not checked, set availability days based on businessDaysFrom and businessDaysTo
      const businessDaysFrom = businessDataFromModal.workHours.businessDaysFrom;
      const businessDaysTo = businessDataFromModal.workHours.businessDaysTo;

      const updatedWeekdays = newService.weekdays.map((weekday, i) => ({
        ...weekday,
        visibility: i >= businessDaysFrom && i <= businessDaysTo,
        selected: i >= businessDaysFrom && i <= businessDaysTo,
      }));

      setNewService((prevState) => ({
        ...prevState,
        weekdays: updatedWeekdays,
      }));
    } else {
      // If customizeHours is checked, update selected property for the clicked weekday
      const updatedWeekdays = newService.weekdays.map((weekday, i) => ({
        ...weekday,
        selected: i === index,
      }));

      setNewService((prevState) => ({
        ...prevState,
        weekdays: updatedWeekdays,
      }));
    }

    setSelectedWeekday(index); // Always update selected weekday regardless of customizeHours status
  };

  const [formErrors, setFormErrors] = useState({
    servicename: "",
    duration: "",
    description: "",
  });
  const validateForms = () => {
    let isValid = true;
    if (!newService.servicename) {
      setFormErrors((prevData) => ({
        ...prevData,
        servicename: "Required",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        servicename: "",
      }));
    }

    if (!newService.duration) {
      setFormErrors((prevData) => ({
        ...prevData,
        duration: "Required",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        duration: "",
      }));
    }
    if (!newService.description) {
      setFormErrors((prevData) => ({
        ...prevData,
        description: "Required",
      }));
      isValid = false;
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        description: "",
      }));
    }
    return isValid;
  };
  const defaultOptions = {
    option1: "09:00 AM", // Set your default value for option1 here
    option2: "03:00 PM", // Set your default value for option2 here
    // ... Add more options as needed
  };
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (
      name === "servicename" ||
      name === "availability" ||
      name === "duration" ||
      name === "description"
    ) {
      // Handle regular inputs
      setNewService((prevState) => ({ ...prevState, [name]: value }));
    } else if (name.startsWith("weekday_")) {
      // Handle custom hours for weekdays
      const weekdayIndex = parseInt(name.split("_")[1], 10);
      setNewService((prevService) => {
        const updatedWeekdays = [...prevService.weekdays];
        updatedWeekdays[weekdayIndex][value] = value;
        return {
          ...prevService,
          weekdays: updatedWeekdays,
        };
      });
    } else {
      // Handle custom hours (Option 1 and Option 2)
      setNewService((prevService) => ({
        ...prevService,
        [name]: value,
      }));
    }
    if (type === "checkbox") {
      // Handle checkboxes (for weekday visibility)
      const weekdayIndex = parseInt(name.split("_")[1], 10); // Extract the index from the checkbox name
      setNewService((prevService) => {
        const updatedWeekdays = [...prevService.weekdays];
        updatedWeekdays[weekdayIndex].visibility = checked;
        return {
          ...prevService,
          weekdays: updatedWeekdays,
        };
      });
    } else if (name === "customizeHours") {
      // Handle custom hours checkbox
      setUseCustomHours(checked);
      if (!checked) {
        // Reset availability to "ALL WEEK" when custom hours are not selected
        setNewService((prevService) => ({
          ...prevService,
          weekdays: prevService.weekdays.map((weekday) => ({
            ...weekday,
            visibility: true,
          })),
        }));
      }
    } else {
      // Handle other inputs
      setNewService((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForms()) {
      const newId = lastAssignedId + 1;
    setLastAssignedId(newId);
    const updatedService = {
      ...newService,
      id: newId.toString(),
    };

      if (mode === "edit") {
        // Update existing service data in serviceDataFromModal
        const updatedServiceData = serviceDataFromModal.map((service) =>
          service.id === newService.id ? newService : service
        );
        setServiceDataFromModal(updatedServiceData);
      } else {
        // Add new service data to serviceDataFromModal
        setServiceDataFromModal((prevData) => [...prevData, newService]);
      }
      setHello(true);
      onCloseModal();
      console.log(
        "service data:" + businessDataFromModal.workHours.businessDaysFrom
      );
      console.log(
        "service data:" + businessDataFromModal.workHours.businessDaysTo
      );
    }
  };
  const [selectedWeekday, setSelectedWeekday] = useState(null);

  const handleOptionChange = (event, weekdayIndex, optionType) => {
    // if (useCustomHours) {
    //   const { name, value } = event.target;
    //   setNewService((prevService) => ({
    //     ...prevService,
    //     [name]: value,
    //   }));
    // }
    const { value } = event.target;
    setNewService((prevService) => {
      const updatedWeekdays = [...prevService.weekdays];
      updatedWeekdays[weekdayIndex][optionType] = value;
      return {
        ...prevService,
        weekdays: updatedWeekdays,
      };
    });
  };
  const handleVisibilityToggle = () => {
    setNewService((prevState) => ({
      ...prevState,
      visibility: !prevState.visibility,
    }));
  };

  const handleCustomHoursToggle = () => {
    setUseCustomHours(!useCustomHours);
    if (!useCustomHours) {
      // // Set default values when custom hours are disabled
      // setNewService((prevService) => ({
      //   ...prevService,
      //   option1: defaultOptions.option1,
      //   option2: defaultOptions.option2,
      //   weekdays: prevService.weekdays.map((weekday) => ({
      //     ...weekday,
      //     option1: defaultOptions.option1,
      //     option2: defaultOptions.option2,
      //   })),
      // }));
      // Check if businessDataFromModal includes Monday to Friday
      const businessDaysFrom =
        businessDataFromModal.workHours?.businessDaysFrom || "From";
      const businessDaysTo =
        businessDataFromModal.workHours?.businessDaysTo || "To";
      // Set availability days based on businessDaysFrom and businessDaysTo
      const weekdaysAvailability = newService.weekdays.map(
        (weekday, index) => ({
          ...weekday,
          visibility: index >= businessDaysFrom && index <= businessDaysTo,
          selected: index >= businessDaysFrom && index <= businessDaysTo,
        })
      );
      console.log("businessDaysFrom:", businessDaysFrom);
      console.log("businessDaysTo:", businessDaysTo);
      setNewService((prevService) => ({
        ...prevService,
        weekdays: weekdaysAvailability,
      }));
    } else {
      // Clear values when custom hours are enabled
      setNewService((prevService) => ({
        ...prevService,
        option1: "",
        option2: "",
      }));
      setAdditionalTime([]);
    }
  };

  useEffect(() => {
    const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
    handleWeekdayButtonClick(today === 0 ? 6 : today - 1); // Adjust to map Sunday to 6
  }, []);

  const [additionalTime, setAdditionalTime] = useState([]);

  const handleAdditionalTime = (index, field, value) => {
    const updatedAdditionalTime = [...additionalTime];
    if (field === "delete") {
      updatedAdditionalTime.splice(index, 1); // Remove the selected entry
    } else {
      updatedAdditionalTime[index][field] = value;
    }
    setNewService((prevService) => {
      const updatedWeekdays = [...prevService.weekdays];
      updatedWeekdays[selectedWeekday][field] = value;
      return {
        ...prevService,
        weekdays: updatedWeekdays,
      };
    });
    setAdditionalTime(updatedAdditionalTime);
  };
  const handleAddTime = () => {
    if (additionalTime.length < 2) {
      setAdditionalTime([...additionalTime, { from: "", to: "" }]);
    }
  };

  const handleWeekdayCheckboxChange = (weekdayIndex) => {
    setNewService((prevService) => {
      const updatedWeekdays = [...prevService.weekdays];
      updatedWeekdays[weekdayIndex].visibility =
        !updatedWeekdays[weekdayIndex].visibility;
      return {
        ...prevService,
        weekdays: updatedWeekdays,
      };
    });
  };
  useEffect(() => {
    if (editService) {
      setNewService(editService);
    }
  }, [editService]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-[#c7d4ed] w-[590px]  flex flex-col gap-4 px-5 py-3 rounded-md">
        <h2 className=" flex items-center justify-center text-[22px]">
          {mode === "edit" ? "Edit Service" : "Add New Service"}
        </h2>
        <div className="mx-4 ">
          <label>
            Service Name
            <input
              type="text"
              name="servicename"
              autoFocus={false}
              // value={newService.servicename}
              // onChange={handleChange}
              placeholder="Service Name"
              value={newService.servicename}
              onChange={handleChange}
              className={`w-full rounded-[5px]   text-[14px] h-[39px] mt-1   ${
                formErrors.servicename
                  ? "border-[#f17070]  border-[0.5px]  shadow-shado3"
                  : "border-[#ffffff] border-[0.5px] shadow-shado2"
              }  focus:bg-white focus:outline-none focus:ring-[0.5px] focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#ffffffdf]   placeholder:text-[13px]  md:w-full md:h-[45px] md:placeholder:text-[15px] md:pl-4`}
            />
          </label>
        </div>
        <div className="flex justify-end pr-4 mb-[-10px]">
          <label className="flex items-center gap-1  text-[12px]">
            <input
              type="checkbox"
              name="customizeHours"
              className="form-checkbox h-[14px] w-[14px] text-blue-500"
              checked={useCustomHours}
              onChange={handleCustomHoursToggle}
            />
            Customize Hours
          </label>
        </div>
        <div className="bg-[#f3f4f8] py-2 rounded-[5px] mx-4">
          <div className="flex justify-between   mx-4">
            <label className="mb-1">Availability</label>
          </div>

          <div className="flex  items-center justify-between mx-4 my-1">
            {newService.weekdays.map((weekday, index) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  className={` py-[5px] rounded-md text-[14px] border-[0.5px] border-[#dddded] shadow-shado3 w-[65px] hover:bg-[#a0b9ef] ${
                    selectedWeekday === index
                      ? "bg-[#6586ea] text-white"
                      : "bg-[#ccd5f2]"
                  }`}
                  onClick={() => handleWeekdayButtonClick(index)} // Handle button click to show options
                >
                  {useCustomHours && (
                    <input
                      type="checkbox"
                      name={`weekday_${index}`}
                      className="form-checkbox h-[10px] w-[10px] text-blue-500 mr-[5px]"
                      checked={newService.weekdays[index].visibility}
                      onChange={handleChange}
                    />
                  )}

                  {weekday.name}
                </button>
              </div>
            ))}
          </div>

          {selectedWeekday !== null && (
            <div className="flex items-center  my-3 justify-center">
              {/* {useCustomHours &&(
          <input
            type="checkbox"
            name={`weekday_${selectedWeekday}`}
            className="form-checkbox h-[13px] w-[13px] text-blue-500 mr-2"
            checked={newService.weekdays[selectedWeekday].visibility}
            onChange={() => handleWeekdayCheckboxChange(selectedWeekday)}
          />
          )} */}

              {/* <label className="w-[70px] text-[14px]">{newService.weekdays[selectedWeekday].name}</label> */}
              {newService.weekdays.map((weekday, index) => (
                <div key={index} className="custom-dropdown">
                  {/* <select
  name={`weekday_${selectedWeekday}_option1`}
  value={newService.weekdays[selectedWeekday].option1 || defaultOptions.option1}
  onChange={handleChange}
  className="text-[15px] border w-[100px] h-[35px] px-3 rounded-[5px] shadow-sm focus:ring-0.5"
  disabled={!useCustomHours}
> */}
                  {/* {selectedWeekday && ( // Conditionally render dropdown for selected weekday */}
                  {weekday.selected && (
                    <div className="flex gap-3">
                      <label className="w-[52px]">{weekday.name}</label>
                      <select
                        name={`weekday_${index}_option1`}
                        value={weekday.option1}
                        onChange={(e) =>
                          handleOptionChange(e, index, "option1")
                        }
                        className="text-[15px] border w-[100px] h-[35px]  rounded-[5px] shadow-sm focus:ring-0.5"
                        disabled={!useCustomHours}
                      >
                        <option value="08:00 AM">08:00 AM</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                      </select>
                      {/* </div>
          <div className="custom-dropdown "> */}
                      {/* <select
  name={`weekday_${selectedWeekday}_option2`}
  value={newService.weekdays[selectedWeekday].option2 || defaultOptions.option2}
  onChange={handleChange}
  className="text-[15px] border w-[100px] h-[35px] px-3 rounded-[5px] shadow-sm focus:ring-0.5"
  disabled={!useCustomHours}
> */}
                      <select
                        name={`weekday_${index}_option2`}
                        value={weekday.option2}
                        onChange={(e) =>
                          handleOptionChange(e, index, "option2")
                        }
                        className="text-[15px] border w-[100px] h-[35px] rounded-[5px] shadow-sm focus:ring-0.5"
                        disabled={!useCustomHours}
                      >
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        {/* Add your options for Option 2 */}
                      </select>
                    </div>
                  )}
                </div>
              ))}

              {useCustomHours && (
                <img
                  src={add}
                  onClick={handleAddTime}
                  className="h-[13px] w-[13px] ml-[60px]"
                />
              )}
            </div>
          )}
          {additionalTime.map((weekday, index) => (
            <div
              key={index}
              className="  ml-[179px] flex gap-3 items-center pb-[10px]"
            >
              <div className="custom-dropdown ">
                <select
                  name={`weekday_${index}_option3`}
                  value={weekday.option3}
                  className="text-[15px] border w-[100px] h-[35px] px-3 rounded-[5px] shadow-sm focus:ring-0.5"
                  onChange={(e) =>
                    handleAdditionalTime(index, "option3", e.target.value)
                  }
                >
                  <option>Select</option>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>6
                </select>
              </div>

              <div className="custom-dropdown">
                <select
                  name={`weekday_${index}_option4`}
                  value={weekday.option4}
                  className="text-[15px] border w-[100px] h-[35px] px-3 rounded-[5px] shadow-sm focus:ring-0.5"
                  onChange={(e) =>
                    handleAdditionalTime(index, "option4", e.target.value)
                  }
                >
                  <option>Select</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>

              <img
                src={trash}
                alt="trash"
                className=" h-[15px] w-[15px] ml-[48px]"
                onClick={() => handleAdditionalTime(index, "delete")}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mx-4 ">
          <div className="flex items-center gap-3">
            <label>Visibility</label>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                {/* Hidden input to hold the toggle state */}
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={newService.visibility}
                  onChange={() => handleVisibilityToggle()} // Use onChange to toggle visibility
                />
                {/* Track (background) */}
                <div
                  className={`w-[40px] h-[19px] rounded-full shadow-inner ${
                    newService.visibility ? "bg-[#6586ea]" : " bg-gray-300"
                  }`}
                ></div>
                {/* Thumb (circle) */}
                <div
                  className={`absolute top-[1px] left-[1px] w-[17px] h-[17px] bg-white rounded-full shadow transform transition-transform ${
                    newService.visibility ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <label>Duration</label>
            <div className="custom-drop">
              <select
                name="duration"
                value={newService.duration}
                onChange={handleChange}
                autoFocus={false}
                className={`border w-full h-[50px] px-3 rounded-[5px] ${
                  formErrors.duration
                    ?"border-[#f17070]  border-[0.5px]  shadow-shado3"
                    : "border-[#ffffff] border-[0.5px] shadow-shado2"
                } focus:bg-white focus:outline-none focus:ring-[0.5px] focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#ffffffdf] `}
              >
                <option value="">Select</option>
                <option value="30 Min">30 Min</option>
                <option value="1 Hour">1 Hour</option>
                <option value="1 Hour">1.5 Hour</option>
                <option value="2 Hour">2 Hour</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col mx-4 ">
          <label>
            Description
            <textarea
              name="description"
              value={newService.description}
              onChange={handleChange}
              autoFocus={false}
              placeholder="Description"
              className={`flex border w-full h-[100px] px-4 py-2 rounded-[5px]  place-items-start bg-[#ffffffdf] mt-1 resize-none ${
                formErrors.description
                  ? "border-[#f17070]  border-[0.5px]  shadow-shado3"
                  : "border-[#ffffff] border-[0.5px] shadow-shado2"
              } focus:bg-white focus:outline-none focus:ring-[0.5px] focus:ring-slate-500  `}
            />
          </label>
        </div>

        <div className="flex items-center justify-center mb-3 mt-1">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#0aa1ddf5] text-[white] font-[500] font-inter p-4 rounded-[5px] flex justify-center  items-center text-[16px] h-[39px] "
            style={{ boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}
          >
            {data === "update" ? "Update Service" : "Add Service"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddNewService;
