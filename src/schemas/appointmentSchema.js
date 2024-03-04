import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const appointmentSchema = yup.object().shape({
  fullname: yup.string().min(6).required("Required"),
   email: yup.string().email("Please enter a valid email").required("Required"),
  phonenumber: yup
    .string()
    .matches(/^\d{9,}$/, "Phone number must be at least 9 digits")
    .required("Phone number is required"),
    service: yup.string().required("Please select a Service"),
    // date: yup.string().required("Date is required"),   
    time: yup.string().required("Time is required"),
});
