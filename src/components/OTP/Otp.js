// import React, { useRef, useState } from "react";

// function Otp({ onUpdateParentState }) {
//   // Refs for each input element
//   const inputRefs = [useRef(), useRef(), useRef(), useRef()];

//   // State to store the OTP values
//   const [otpValues, setOtpValues] = useState({
//     digit1: "",
//     digit2: "",
//     digit3: "",
//     digit4: "",
//   });

//   // Function to navigate to the next input
//   const navigateToNextInput = (index) => {
//     if (index < inputRefs.length - 1) {
//       inputRefs[index + 1].current.focus();
//     }
//   };

//   const handleInputChange = (e, index) => {
//     let value = e.target.value;

//     // Remove any non-digit characters
//     value = value.replace(/\D/g, "");

//     // Update the state with the input value
//     setOtpValues((prevValues) => ({
//       ...prevValues,
//       [`digit${index + 1}`]: value,
//     }));

//     // Navigate to the next input
//     navigateToNextInput(index);
//   };

//   // Function to prevent typing non-digit characters
//   const handleKeyPress = (e) => {
//     const charCode = e.charCode;
//     if (charCode < 48 || charCode > 57) {
//       e.preventDefault();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Access and log the saved OTP values
//     console.log(otpValues);
//     onUpdateParentState("reset");

//     setOtpValues({
//       digit1: "",
//       digit2: "",
//       digit3: "",
//       digit4: "",
//     });
//   };

//   return (
//     <form
//       className="w-full  px-2 my-4  md:mx-12   flex flex-col md:justify-center gap-4 md:items-start md:w-auto"
//       onSubmit={handleSubmit} // Handle form submission
//     >
//       <div>
//         <h1 className="text-[20px] ml-1 text-start  font-sans font-[700]">
//           OTP Verification
//         </h1>
//         <p className="text-[12px] ml-1 text-start font-sans mt-2 ">
//           Enter the OTP to -{" "}
//           <span className="font-[600] text-[14px]"> k***zu@gmail.com</span>
//         </p>
//       </div>
//       <div className="flex mt-3 gap-4  w-auto justify-center  items-center">
//         {inputRefs.map((inputRef, index) => (
//           <input
//             key={index}
//             ref={inputRef}
//             className=" rounded-[6px] w-[30%] text-[30px] h-[39px] pl-[12px] focus:outline-none my-2 focus:bg-[#F6F6F6] bg-[#efeeee]  placeholder:text-[13px] placeholder:text-[#8B8989] md:w-[50px] md:h-[50px] md:placeholder:text-[14px] md:pl-[15px]"
//             style={{
//               border: "1px solid #DDE7F2",
//               boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.12) inset",
//             }}
//             type="text"
//             maxLength={1}
//             onChange={(e) => handleInputChange(e, index)}
//             onKeyPress={handleKeyPress} // Handle keypress to prevent non-digit characters
//             required
//           />
//         ))}
//       </div>
//       <p className="text-[11px] text-center ml-1  w-full font-sans mt-2 ">
//         Don’t receive code ?{" "}
//         <span className="font-[500] text-[#6A00BF] text-[13px]"> Re-send</span>
//       </p>

//       <button
//         className="text-center w-full h-[40px] mt-1 rounded-[6px] font-sans font-[600] text-[16px] bg-[#4556EA] md:w-[250px] md:h-[45px] text-white  hover:bg-[#3A45B4] active:bg-[#2C3477]"
//         type="button "
//         style={{
//           lineHeight: "normal",
//           letterSpacing: "0.4px",
//         }}
//         onClick={handleSubmit}
//       >
//         Submit
//       </button>
//     </form>
//   );
// }

// export default Otp;
