import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const offerSchema = yup.object().shape({
  title: yup.string().min(6).required("Required"),
   message: yup.string().required("Required"),
    description: yup.string().required("Required"),
    date: yup.string().required("Date is required"),   
});
