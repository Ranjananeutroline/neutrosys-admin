import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./Sample.css";

export default function App({ onSelectDate }) {
  const [dateState, setDateState] = useState(new Date());

  const changeDate = (e) => {
    setDateState(e);
  };

  function handleSelectedData(e) {
    e.preventDefault();

    const selectedMomentDate = moment(dateState);

    const date = selectedMomentDate.format("YYYY/MM/D");
    onSelectDate(date);
  }

  return (
    <>
      <Calendar
        value={dateState}
        center
        onChange={changeDate}
        minDate={new Date()}
        
      />
      <p className=" text-center mt-2 mb-6 ">
        Selected date is{" "}
        <b className="text-[#8585e7] ">
          {moment(dateState).format("YYYY/MM/D")}
        </b>
      </p>

      <div className="flex justify-end mr-9 mb-5">
        <button
          onClick={handleSelectedData}
          className=" flex tracking-[1px] text-[white] items-center py-2 px-3 text-[16px]  font-sans font-[600] rounded-md bg-[#47B5FF] hover:bg-[#42C2FF]"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          OK
        </button>
      </div>
    </>
  );
}
