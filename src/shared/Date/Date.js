import React from "react";

const currentDate = new Date();

const getFormattedDate = (date) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${dayOfMonth}, ${month} ${year}`;
};

const App = () => {
  return (
    <div className="font-[600] text-[15px] text-indigo-500 ">
      {getFormattedDate(currentDate)}
    </div>
  );
};

export default App;
