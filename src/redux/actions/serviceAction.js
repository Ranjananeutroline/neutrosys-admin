import axios from "axios";
import { useNavigate } from "react-router-dom";

// actions/auth.js
export const createServiceSuccess = (data) => ({ type: "CREATE_SERVICE", payload:data });

export const getAllServices = (data)=> ({type:"GET_ALL_SERVICE", payload:data})
export const deleteServiceByID = (data)=> ({type:"DELETE_SERVICE_BY_ID", payload:data})
export const editServiceById = (data)=> ({type:"EDIT_SERVICE_BY_ID", payload:data})
// export const rescheduleAppointmentRequest = () => ({ type: "RESCHEDULE_APPOINTMENT_REQUEST"})
// export const deleteAppointment = (id) => ({type:"DELETE_APPOINTMENT",payload:id})
// export const notifyAppointment = (id)=>({type:"NOTIFY_APPOINTMENT",payload:id})


export const createNewService = (credentials) => {
  return async (dispatch) => {
    // dispatch(authStart());

    try {
      console.log(credentials);
      const response = await axios.post(
        "http://localhost:8000/api/service/new",
        credentials
      );
      console.log(response);
      dispatch(createServiceSuccess(response.data))
      // dispatch(authSuccess(user));
      return response;
    } catch (error) {

      // dispatch(authFail("Invalid credentials"));
      throw error;
    }
  };
};

export const getAllServicesHere = ()=>{
 
  return async (dispatch)=>{
    try {
      console.log('yeta');
      const response = await axios.get(
        "http://localhost:8000/api/service/allServices",
       
      );
     console.log(response.data);
      dispatch(getAllServices(response.data))
return response
    } catch (error) {
      throw error
    }
  }
}

export const deleteServiceByIDHere = (deleteId)=>{
  console.log(deleteId);
  return async (dispatch) =>{
    try {
      const response = await axios.delete(`http://localhost:8000/api/service/${deleteId}`)
      console.log(response);
      dispatch(deleteServiceByID(deleteId))
    } catch (error) {
      console.log(error);
    }
  }
}

export const editServiceByIdHere = (data) => {
  return async (dispatch) => {
    try {    
       const response = await axios.patch(`http://localhost:8000/api/service/${data._id}`,data)
      console.log(response);
      dispatch(editServiceById(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
};
