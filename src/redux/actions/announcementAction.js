import axios from "axios";
import { useNavigate } from "react-router-dom";

// actions/auth.js
export const createAnnouncementSuccess = (data) => ({ type: "CREATE_ANNOUNCEMENT", payload:data });

export const getAllAnnouncements = (data)=> ({type:"GET_ALL_ANNOUNCEMENT", payload:data})
export const deleteAnnouncementByID = (data)=> ({type:"DELETE_ANNOUNCEMENT_BY_ID", payload:data})
export const editAnnouncementById = (data)=> ({type:"EDIT_ANNOUNCEMENT_BY_ID", payload:data})
// export const rescheduleAppointmentRequest = () => ({ type: "RESCHEDULE_APPOINTMENT_REQUEST"})
// export const deleteAppointment = (id) => ({type:"DELETE_APPOINTMENT",payload:id})
// export const notifyAppointment = (id)=>({type:"NOTIFY_APPOINTMENT",payload:id})


export const createNewAnnouncement = (credentials) => {
  return async (dispatch) => {
    // dispatch(authStart());

    try {
      console.log(credentials);
      const response = await axios.post(
        "http://localhost:8000/api/announcement/announcement/new",
        credentials
      );
      console.log(response);
      dispatch(createAnnouncementSuccess(response.data))
      // dispatch(authSuccess(user));
      return response;
    } catch (error) {

      // dispatch(authFail("Invalid credentials"));
      throw error;
    }
  };
};

export const getAllAnnouncementsHere = ()=>{
 
  return async (dispatch)=>{
    try {
      console.log('yeta');
      const response = await axios.get(
        "http://localhost:8000/api/announcement/allAnnouncements",
       
      );
     console.log(response.data);
      dispatch(getAllAnnouncements(response.data))
return response
    } catch (error) {
      throw error
    }
  }
}

export const deleteAnnouncementByIDHere = (deleteId)=>{
  console.log(deleteId);
  return async (dispatch) =>{
    try {
      const response = await axios.delete(`http://localhost:8000/api/announcement/announcement/${deleteId}`)
      console.log(response);
      dispatch(deleteAnnouncementByID(deleteId))
    } catch (error) {
      console.log(error);
    }
  }
}

export const editAnnouncementByIdHere = (data) => {
  console.log('hello from here',data);
  console.log(data._id);
  return async (dispatch) => {
    try {    
       const response = await axios.patch(`http://localhost:8000/api/announcement/announcement/${data._id}`,data)
      console.log(response);
      dispatch(editAnnouncementById(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
};