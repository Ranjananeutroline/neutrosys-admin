import axios from "axios";
import { useNavigate } from "react-router-dom";

// actions/auth.js
export const createBusinesshoursSuccess = (data) => ({ type: "CREATE_BUSINESSHOURS", payload:data });

export const getAllBusinesshours = (data)=> ({type:"GET_ALL_BUSINESSHOURS", payload:data})
export const deleteBusinesshoursByID = (data)=> ({type:"DELETE_BUSINESSHOURS_BY_ID", payload:data})
export const editBusinesshoursById = (data)=> ({type:"EDIT_BUSINESSHOURS_BY_ID", payload:data})
// export const rescheduleAppointmentRequest = () => ({ type: "RESCHEDULE_APPOINTMENT_REQUEST"})
// export const deleteAppointment = (id) => ({type:"DELETE_APPOINTMENT",payload:id})
// export const notifyAppointment = (id)=>({type:"NOTIFY_APPOINTMENT",payload:id})


export const createNewBusinesshours = (credentials) => {
  return async (dispatch) => {
    // dispatch(authStart());

    try {
      console.log(credentials);
      const response = await axios.post(
        "http://localhost:8000/api/business/new",
        credentials
      );
      console.log(response);
      dispatch(createBusinesshoursSuccess(response.data))
      // dispatch(authSuccess(user));
      return response;
    } catch (error) {

      // dispatch(authFail("Invalid credentials"));
      throw error;
    }
  };
};

export const getAllBusinesshoursHere = ()=>{
 
  return async (dispatch)=>{
    try {
      console.log('yeta');
      const response = await axios.get(
        "http://localhost:8000/api/allHours",
       
      );
     console.log(response.data);
      dispatch(getAllBusinesshours(response.data))
return response
    } catch (error) {
      throw error
    }
  }
}

export const deleteBusinesshoursByIDHere = (deleteId)=>{
  console.log(deleteId);
  return async (dispatch) =>{
    try {
      const response = await axios.delete(`http://localhost:8000/api/business/${deleteId}`)
      console.log(response);
      dispatch(deleteBusinesshoursByID(deleteId))
    } catch (error) {
      console.log(error);
    }
  }
}

export const editBusinesshoursByIdHere = (data) => {
  return async (dispatch) => {
    try {    
       const response = await axios.patch(`http://localhost:8000/api/business/${data._id}`,data)
      console.log(response);
      dispatch(editBusinesshoursById(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
};
