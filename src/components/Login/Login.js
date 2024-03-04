import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Formik, useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forget from "../ForgetPassword/Forget";
import Reset from "../../components/Reset/Reset";
import Otp from "../OTP/Otp";
import { loginSchema } from "../../schemas/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authAction.js";
import "./login.css";

const EyeIcon = () => (
  <svg
    width="18"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Edit / Show">
      <g id="Vector">
        <path
          d="M3.5868 13.7788C5.36623 15.5478 8.46953 17.9999 12.0002 17.9999C15.5308 17.9999 18.6335 15.5478 20.413 13.7788C20.8823 13.3123 21.1177 13.0782 21.2671 12.6201C21.3738 12.2933 21.3738 11.7067 21.2671 11.3799C21.1177 10.9218 20.8823 10.6877 20.413 10.2211C18.6335 8.45208 15.5308 6 12.0002 6C8.46953 6 5.36623 8.45208 3.5868 10.2211C3.11714 10.688 2.88229 10.9216 2.7328 11.3799C2.62618 11.7067 2.62618 12.2933 2.7328 12.6201C2.88229 13.0784 3.11714 13.3119 3.5868 13.7788Z"
          stroke="black"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z"
          stroke="black"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </g>
  </svg>
);
const closeIcon = (
  <svg
    width="25"
    height="30"
    viewBox="2 9 20 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.3331 21.3331L15.9999 15.9999M15.9999 15.9999L10.6665 10.6665M15.9999 15.9999L21.3332 10.6665M15.9999 15.9999L10.6665 21.3332"
      stroke="black"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const UnShow = () => (
  <svg
    width="18"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Edit / Hide">
      <path
        id="Vector"
        d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   // console.log(username, password);
  //   try {
  //     const success = await dispatch(login({ email, password }));
  //     if (success) {
  //       navigate("/dashboard");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // navigate('/dashboard')
  // };

  const notify = () =>
    toast.success(
      "Logged in successfully!!!",
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
  const notifyFailure = () =>
    toast.error(
      "Wrong email or password!!!",
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

  const [data, setData] = useState({});
  // const [login, setLogin] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setActiveTab("forget");
  };

  const [activeTab, setActiveTab] = useState("forget");

  const childData = (data) => {
    setActiveTab(data);
  };
  // function fetchData() {
  //   axios
  //     .get("http://localhost:3030/login")
  //     .then((res) => {
  //       setData(res.data);
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const togglePasswordVisibility = () => {
    setShow(!show);
  };
  const onSubmit = async (values, actions) => {
    const newEmail = values.email;
    const newPassword = values.password;
    console.log("email is", newEmail);
    try {
      const success = await dispatch(
        login({ email: newEmail, password: newPassword })
      );
      if (success) {
        notify();

        navigate("/dashboard");
      } else {
        notifyFailure();
      }
    } catch (error) {
      notifyFailure();
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
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });
  console.log(errors);
  return (
    <>
      {/* <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={isLoading}>Loginn</button>
      {error && <p>{error}</p>} */}
      <div className=" relative flex flex-col w-full md:w-[420px] sign-in-right">
        <p className="m-[-5px] text-[18px]  tracking-wide font-[650] font-sans">
          ADMIN LOGIN
        </p>
        <p
          className="m-2.5 text-[13px] tracking-normal font-[50] font-sans text-[#575757] "
          style={{
            fontStyle: "normal",
            fontWeight: "400",
          }}
        >
          Welcome! Please enter your details.
        </p>

        <form
          className=" relative flex flex-col w-full px-2 mt-4 justify-center font-sans items-center md:px-0 "
          onSubmit={handleSubmit}
        >
          <label
            className="w-full text-left pl-3"
            style={{
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "normal",
            }}
          >
            Email
          </label>
          <div className=" w-full  flex justify-center">
            <input
              className={`w-full rounded-[10px] text-[14px] h-[39px] m-2  pl-[12px] focus:outline-none bg-[#FFF]   placeholder:text-[13px] placeholder:text-[#8B8989]  md:w-[400px] md:h-[50px] md:placeholder:text-[14px] md:pl-[17px] ${
                errors.email && touched.email
                  ? "input-error"
                  : "border border-solid border-2  border-[#DDE7F2]"
              } `}
              style={{
                // border: "1px solid #DDE7F2",
                boxShadow: "0px 2px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
              type="text"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <label
            className="w-full text-left pl-3 mt-4"
            style={{
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "normal",
            }}
          >
            Password
          </label>
          <div className="relative w-full flex justify-center">
            <input
              className={`w-full border-none rounded-[10px]  text-[14px] h-[39px] m-2 pl-[12px] focus:bg-white focus:outline-none bg-[#FFF]   placeholder:text-[13px] placeholder:text-[#8B8989]  md:w-[400px] md:h-[50px] md:placeholder:text-[14px] md:pl-[17px] ${
                errors.password && touched.password
                  ? "input-error"
                  : "border border-solid border-2  border-[#DDE7F2]"
              }`}
              style={{
                // border: "1px solid #DDE7F2",
                boxShadow: "0px 2px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
              type={showPassword ? "text" : "password"} // Use the showPassword state to toggle the input type
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Password"
            />

            <div
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              // Use the toggle function as the onClick handler
            >
              {values.password !== "" && (
                <div className="mr-2" onClick={togglePasswordVisibility}>
                  {show ? <UnShow /> : <EyeIcon />}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-2 mb-3 w-full pl-3 pr-3  ">
            <div className=" flex justify-center gap-2 items-center text-center  ">
              <input className="w-[18px] h-[18px]" type="checkbox"></input>
              <div className="text-[13px] font-man">Remember me</div>
            </div>
            <div>
              <div>
                <button
                  type="button"
                  className="text-[#09329D] text-[13px] hover:text-[#0078D4] active:text-[#005A9E]"
                  onClick={onOpenModal}
                >
                  Forgot password
                </button>
                <Modal
                  open={open}
                  onClose={onCloseModal}
                  center
                  closeIcon={closeIcon}
                  closeOnOverlayClick={true}
                  classNames={{
                    modal: "CustomModal forgetPassword",
                  }}
                >
                  <div>
                    {activeTab === "forget" && (
                      <Forget onUpdateParentState={childData} />
                    )}

                    {activeTab === "otp" && (
                      <Otp onUpdateParentState={childData} />
                    )}
                    {activeTab === "reset" && <Reset />}
                  </div>
                </Modal>
              </div>
            </div>
          </div>

          <button
            className="w-full h-[40px] mt-5 rounded-[10px] font-sans font-[600] text-[17px] bg-[#4556EA] md:w-[400px] md:h-[45px] text-white hover:bg-[#3A45B4] active:bg-[#2C3477] sign-in-btn"
            type="submit"
            disabled={isSubmitting}
            style={{
              lineHeight: "normal",
              letterSpacing: "0.4px",
            }}
          >
            Sign in
          </button>

          <p className="mt-4 font-sans text-[#474749]">
            Don’t have an account?
            <Link to="/signup">
              <span className="text-[#1E4AE9] font-[600] ml-3  font-sans  hover:text-[#3A45B4] active:text-[#2C3477] ">
                Sign Up
              </span>
            </Link>
            {/* {login ? <Navigate to="dashboard" /> : null} */}
          </p>
        </form>
        {/* <button onClick={() => setLogin(true)}>
          -- {login ? <Navigate to="dashboard" /> : null}
        </button> */}
      </div>
    </>
  );
}
