import axios from "axios";
import { useNavigate } from "react-router-dom";
import { sentNotifyAppointmentEmailHere } from "./mailAction";

// actions/auth.js
export const createAppointmentSuccess = (data) => ({ type: "CREATE_APPOINTMENT", payload:data });

export const getAllAppointment = (data)=> ({type:"GET_ALL_APPOINTMENT", payload:data})
export const confirmAppointmentRequest = (data)=> ({type:"CONFIRM_BOOKING_REQUEST", payload:data})
export const createAppointmentFailed = ()=> ({type: "CREATE_APPOINTMENT_FAILED"})
export const acceptAppointmentRequest = () => ({ type: "ACCEPT_APPOINTMENT_REQUEST"});
export const rejectAppointmentRequest = () => ({ type: "REJECT_APPOINTMENT_REQUEST" });
export const rescheduleAppointmentRequest = () => ({ type: "RESCHEDULE_APPOINTMENT_REQUEST"})
export const deleteAppointment = (id) => ({type:"DELETE_APPOINTMENT",payload:id})
export const notifyAppointment = (id)=>({type:"NOTIFY_APPOINTMENT",payload:id})


export const createNewAppointment = (credentials) => {
  return async (dispatch) => {
    // dispatch(authStart());

    try {
      console.log(credentials);
      const response = await axios.post(
        "http://localhost:8000/api/user/new",
        credentials
      );
      console.log(response);
      dispatch(createAppointmentSuccess(response.data))
      
      const appointment = await response;
      console.log("response aayo from user", appointment);

      // dispatch(authSuccess(user));
      return response.data;
    } catch (error) {
      console.error("Error creating appointment:", error);
      dispatch(createAppointmentFailed());
      // dispatch(authFail("Invalid credentials"));
      throw error;
    }
  };
};

export const getAllAppointments = ()=>{
 
  return async (dispatch)=>{
    try {
      // console.log('yeta');
      const response = await axios.get(
        "http://localhost:8000/api/user/allAppointments",
       
      );
     console.log(response);
      dispatch(getAllAppointment(response.data))

    } catch (error) {
      throw error
    }
  }
}

export const confirmAppointmentRequestHere =(commitId)=>{
  console.log(commitId);
  return async (dispatch)=>{
    try {
      console.log('yeha samma');
      const response = await axios.patch(`http://localhost:8000/api/user/${commitId}`,{isRequestPending:false});
      console.log(response);
   
      dispatch(confirmAppointmentRequest(commitId))
      
    } catch (error) {
      throw error
    }
  }
}
export const deleteAppointmentHere =(deleteId)=>{
  console.log(deleteId);
  return async (dispatch)=>{
    console.log('ok');
    try {
      console.log('yeha samma');
      const response = await axios.delete(`http://localhost:8000/api/user/${deleteId}`);
      console.log(response);
      console.log('bigariyo');
      // console.log(response);
      dispatch(deleteAppointment(deleteId))
     
    } catch (error) {
      throw error
    }
  }
}
export const notifyAppointmentHere = (item)=>{
  return async (dispatch)=>{
    try {
      const appointmentId = item.docid;
     const email = item.email;
      console.log(appointmentId,email);
      console.log('yeha samma aayo');
      const response = await axios.patch(`http://localhost:8000/api/user/${appointmentId}`,{toNotify:true});
      console.log(response.data);
      dispatch(sentNotifyAppointmentEmailHere(item))
      dispatch(notifyAppointment(appointmentId))
      return response
    } catch (error) {
      console.log(error);
    }
  }
}