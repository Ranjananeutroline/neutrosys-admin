import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./Sample.css";

export default function App({ onSelectDate }) {
  const [dateState, setDateState] = useState(new Date());
  const [error, setError] = useState("");

  const changeDate = (e) => {
    setDateState(e);
    setError(""); // Reset the error message when the date changes
  };

  function handleSelectedData(e) {
    e.preventDefault();

    const selectedMomentDate = moment(dateState);
    const currentMomentDate = moment();

    if (selectedMomentDate.isBefore(currentMomentDate, "day")) {
      // Selected date is older than today's date
      setError("Selected date cannot be older than today's date");
    } else {
      // Selected date is valid, proceed with your logic
      setError("");
      const date = selectedMomentDate.format("YYYY/MMM/D");
      onSelectDate(date);
      console.log(date);
    }
  }

  return (
    <>
      <Calendar
        value={dateState}
        onChange={changeDate}
        center
        minDate={new Date()}
        
      />
      <p className=" text-center">
        Selected date is <b>{moment(dateState).format("YYYY/MMM/D")}</b>
      </p>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex justify-end mr-3">
        <button
          onClick={handleSelectedData}
          className="border py-1 px-3 text-[15px] font-sans font-[500] rounded-md bg-[#a5a5e5]"
        >
          OK
        </button>
      </div>
    </>
  );
}
