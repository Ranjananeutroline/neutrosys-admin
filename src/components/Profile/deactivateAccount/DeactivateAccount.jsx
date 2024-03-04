import React from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Modal from "react-responsive-modal";
import "./deactivateAccount.css";
import { logout } from "../../../redux/actions/authAction";
export const DeactivateAccount = ({
  openDeactivatePopup,
  setOpenDeactivatePopup,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const notify = () => toast.warn('Account is Deactivated Successfully!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  const notifyNotDeactivated = () => toast.warn('Account is Not Deactivated!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  const handleDeactivatePopup = () => {
    setOpenDeactivatePopup(false);
  };
  const handleDeactivateAccount = async() => {
    notify();
    const email = user?.data.details.email;
    const response = await axios.post("http://localhost:8000/api/auth/deactivateaccount",{email})
    console.log(response);
    if(response){
      // dispatch(logout())
      localStorage.removeItem("user")
      navigate("/");
      
    }
    else{
      notifyNotDeactivated()
      // console.log('not done correctly');
    }
  };
  return (
    <div>
      <Modal
        className="hello"
        open={openDeactivatePopup}
        onClose={handleDeactivatePopup}
        classNames={{
          overlay: "customOverlay deactiveOverlay",
          modal: "customModal deactiveModal",
          closeButton: "closeIconInDeactivateAccount",
        }}
        center
      >
        <div className=" w-full p-4 sm:px-10 md:w-[500px]  flex flex-col justify-center items-start gap-5 bg-[#FFFFFF]">
          <div>
            <h4 className="text-[22px] text-[#3d3d3d] text-left font-[550] mb-1 tracking-wide w-[100%] ">
              Confirm
            </h4>
            <p className="text-[15px]  text-[#3d3d3d] text-left  w-[100%]  font-roboto ">
              Are you sure want to deactivate Your Account?
            </p>
          </div>

          <div className=" w-[100%] flex gap-3 justify-end">
            <button
              className=" bg-[#60BFE5] text-[#ffffff]  font-[600] inline-block rounded  active:bg-[#2C3477] px-[14px] py-[8px] focus:outline-none "
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px",
                lineHeight: "normal",
                letterSpacing: "0.2px",
              }}
              onClick={handleDeactivateAccount}
            >
              Yes
            </button>
            <button
              className="text-[#60BFE5] border-[0.5px]  font-[600]  border-[#60BFE5] rounded  focus:outline-none px-[14px] py-[8px]"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px",
                lineHeight: "normal",
                letterSpacing: "0.2px",
              }}
              onClick={() => navigate("/")}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
   
  );
};
