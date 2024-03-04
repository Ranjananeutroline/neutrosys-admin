import React from "react";
import { GoClock } from "react-icons/go";


function AppointmentComponent({ item }) {
  console.log(item);

  return (
    <>
      <div className="inner-main">
        <div className="inner-time-detail">
          <img
            src="first1.png"
            alt=""
            className="modaltime-icon"
            style={{ height: "47px", width: "47px" }}
          />
          <h6>
            {item?.title}
            <p className="modaltime-p">{item?.details}</p>
          </h6>
        </div>
      </div>


    </>
  );
}

export default AppointmentComponent;