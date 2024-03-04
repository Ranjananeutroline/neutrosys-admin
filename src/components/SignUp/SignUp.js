import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupSchema } from "../../schemas/signupSchema";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/actions/authAction.js";

export default function SignUp() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const notify = () =>
    toast.success(
      "Signed up successfully!!!",
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
    notify();
    const newFullName = values.fullname;
    const newEmail = values.email;
    const newPhoneNumber = values.phonenumber;
    const newPassword = values.password;
    try {
      const success = await dispatch(
        signup({
          fullname:newFullName,
          email:newEmail,
          phonenumber:newPhoneNumber,
          password:newPassword,
        })
      );
      if (success) {
        navigate("/");
      }
    } catch (error) {
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
      fullname: "",
      email: "",
      phonenumber: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: signupSchema,
    onSubmit,
  });
  console.log(errors);
  return (
    <div className="flex flex-col w-full md:w-[420px] sign-up-right">
      {/* bg-[#EEECEC] focus:bg-[#F4F3F3] */}
      {/* bg-[#F5F9FF] focus:bg-white */}
      <p className="m-[-5px] text-[18px]  tracking-wide font-[650] font-sans">
        ADMIN SIGNUP
      </p>
      <p
        className="m-1.5 text-[13px] tracking-normal font-[50] font-sans text-[#575757] "
        style={{
          fontStyle: "normal",
          fontWeight: "400",
        }}
      >
        Please enter your details.
      </p>
      <form
        className="flex flex-col w-full mt-3 justify-center items-center gap-1 px-2 md:px-0 "
        onSubmit={handleSubmit}
      >
        <div className="  relative w-full mr-2 md:mr-0">
          <input
            className={`w-full signup-input border-none rounded-[5px]  text-[14px] h-[39px] mx-1.5  mt-1 pl-[12px] bg-[#F5F9FF] focus:bg-white focus:outline-none  placeholder:text-[#8B8989]  placeholder:text-[13px]  md:w-[400px] md:h-[43px] md:placeholder:text-[14px] md:pl-[17px] ${
              errors.fullname && touched.fullname ? "input-error" : ""
            }`}
            style={{
              // boxShadow: "0px 0.8px 0px 0px rgba(0, 0, 0, 0.19)",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
            }}
            type="text"
            name="fullname"
            id="fullname"
            value={values.fullname}
            onChange={handleChange}
            placeholder="Full Name"
          />
        </div>

        <div className="relative w-full mr-2 md:mr-0">
          <input
            className={`w-full signup-input border-none rounded-[5px]  text-[14px] h-[39px] mx-1.5  mt-[0.4rem]  pl-[12px] border-[0.5px] bg-[#F5F9FF] focus:bg-white focus:outline-none  placeholder:text-[#8B8989]  placeholder:text-[13px]  md:w-[400px] md:h-[43px] md:placeholder:text-[14px] md:pl-[17px] ${
              errors.email && touched.email ? "input-error" : ""
            }`}
            style={{
              // boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.25)",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
            }}
            type="text"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="relative w-full mr-2 md:mr-0">
          <input
            className={`w-full border-none signup-input rounded-[5px]  text-[14px] h-[39px] mx-1.5  mt-[0.4rem]  pl-[12px] border-[0.5px] bg-[#F5F9FF] focus:bg-white focus:outline-none   placeholder:text-[#8B8989]  placeholder:text-[13px]  md:w-[400px] md:h-[43px] md:placeholder:text-[14px] md:pl-[17px] ${
              errors.phonenumber && touched.phonenumber ? "input-error" : ""
            }`}
            style={{
              // boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.25)",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
            }}
            type="string"
            id="phonenumber"
            name="phonenumber"
            // value={values.phonenumber}
            onChange={handleChange}
            placeholder="Phone No"
          />
        </div>
        <div className="relative w-full mr-2 md:mr-0">
          <input
            className={`w-full border-none rounded-[5px] signup-input text-[14px] h-[39px] mx-1.5  mt-[0.4rem] pl-[12px] border-[0.5px] bg-[#F5F9FF] focus:bg-white focus:outline-none  placeholder:text-[#8B8989]  placeholder:text-[13px]  md:w-[400px] md:h-[43px] md:placeholder:text-[14px] md:pl-[17px] ${
              errors.password && touched.password ? "input-error" : ""
            } `}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
            }}
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>

        <div className="relative w-full mr-2 md:mr-0">
          <input
            className={`w-full border-none rounded-[5px] signup-input text-[14px] h-[39px] mx-1.5  mt-[0.4rem] pl-[12px] border-[0.5px] bg-[#F5F9FF] focus:bg-white focus:outline-none  placeholder:text-[#8B8989]  placeholder:text-[13px]  md:w-[400px] md:h-[43px] md:placeholder:text-[14px] md:pl-[17px] ${
              errors.confirmpassword && touched.confirmpassword
                ? "input-error"
                : ""
            }`}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
            }}
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            // value={values.confirmpassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </div>

        <button
          className="w-full h-[40px] mt-4 rounded-[10px] signup-input sign-up-btn font-sans font-[600] text-[17px] bg-[#60BFE5] md:w-[400px] md:h-[45px] text-white hover:bg-[#4FAED7] active:bg-[#3aa8d7] focus:outline-none"
          type="submit"
          disabled={isSubmitting}
          style={{
            lineHeight: "normal",
            letterSpacing: "0.4px",
          }}
        >
          Sign up
        </button>
        <p className=" w-full  mt-1 text-[11px] text-[#474749]  agree-p">
          By signing up, you agree to the Neutroline User Agreement, Privacy
          Policy, and Cookie Policy.
        </p>
        <p className="mt-2.5 font-sans  text-[#474749]">
          Already have an account?
          <Link to="/">
            <span className="text-[#1E4AE9] font-[700] ml-3 font-sans hover:text-[#3A45B4] active:text-[#2C3477]">
              Sign In
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
}
