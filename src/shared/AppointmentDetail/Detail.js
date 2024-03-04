import React from "react";

function Detail({ data }) {
  return (
    <div className="p-10 flex flex-col items-center">
      <div>
      <div className="flex gap-5">
        <p className="w-[60px] sm:w-[90px] text-start font-bold text-slate-600">Name:</p>
        <p className=" text-start">{data.name}</p>
      </div>
      <div className="flex gap-5">
        <p className="w-[60px] sm:w-[90px] text-start font-bold text-slate-600">Email:</p>
        <p className=" text-start ">{data.email}</p>
      </div>

      <div className="flex gap-5">
        <p className="w-[60px] sm:w-[90px] text-start font-bold text-slate-600">Contact:</p>
        <p className=" text-start">{data.contact}</p>
      </div>
      <div className="flex gap-5">
        <p className="w-[60px] sm:w-[90px] text-start font-bold text-slate-600">Service:</p>
        <p className=" text-start">{data.services}</p>
      </div>
      <div className="flex gap-5">
        <p className="w-[60px] sm:w-[90px] text-start font-bold text-slate-600">Duration:</p>
        <p className=" text-start text-indigo-500">{data.duration}</p>
      </div>
      <div className="flex gap-5">
        <p className="w-[60px] sm:w-[90px] text-start font-bold text-slate-600">Date:</p>
        <p className=" text-start text-indigo-500">{data.date}</p>
      </div>
      <div className="flex gap-5">
        <p className="w-[60px] sm:w-[90px] text-start font-bold text-slate-600">Time:</p>
        <p className=" text-start text-indigo-500">{data.time}</p>
      </div>
      <div className="flex gap-5">
        <p className="w-[60px] sm:w-[90px] text-start font-bold text-slate-600">Status:</p>
        <p className=" text-start text-green-500">{data.status}</p>
      </div>
      </div>
    </div>
  );
}

export default Detail;
