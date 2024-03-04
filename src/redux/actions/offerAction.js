import axios from "axios";
import { useNavigate } from "react-router-dom";

// actions/auth.js
export const createOfferSuccess = (data) => ({
  type: "CREATE_OFFER",
  payload: data,
});

export const getAllOffers = (data) => ({
  type: "GET_ALL_OFFERS",
  payload: data,
});
export const editOfferById = (data) => ({
  type: "EDIT_OFFER_BY_ID",
  payload: data,
});
export const deleteOfferById = (data) => ({
  type: "DELETE_OFFER_BY_ID",
  payload:data,
})

// export const rescheduleAppointmentRequest = () => ({ type: "RESCHEDULE_APPOINTMENT_REQUEST"})
// export const deleteAppointment = (id) => ({type:"DELETE_APPOINTMENT",payload:id})
// export const notifyAppointment = (id)=>({type:"NOTIFY_APPOINTMENT",payload:id})

export const createNewOffer = (credentials) => {
  return async (dispatch) => {
    // dispatch(authStart());

    try {
      console.log(credentials);
      const response = await axios.post(
        "http://localhost:8000/api/announcement/offer/new",
        credentials
      );
      console.log(response);
      dispatch(createOfferSuccess(response.data));
      // dispatch(authSuccess(user));
      return response;
    } catch (error) {
      // dispatch(authFail("Invalid credentials"));
      throw error;
    }
  };
};

export const getAllOffersHere = () => {
  return async (dispatch) => {
    try {
      console.log("yeta");
      const response = await axios.get(
        "http://localhost:8000/api/announcement/allOffers"
      );
      console.log(response);
      dispatch(getAllOffers(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const editOfferByIdHere = (data) => {
  return async (dispatch) => {
    try {    
       const response = await axios.patch(`http://localhost:8000/api/announcement/offer/${data._id}`,data)
      console.log(response);
      dispatch(editOfferById(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const deleteOfferByIdHere = (id) =>{
  return async (dispatch) =>{
    try {
      const response = await axios.delete(`http://localhost:8000/api/announcement/offer/${id}`)
      console.log(response);
      dispatch(deleteOfferById(id))
    } catch (error) {
      
    }
  }
}

// export const deleteAppointmentHere =(deleteId)=>{
//   console.log(deleteId);
//   return async (dispatch)=>{
//     console.log('ok');
//     try {
//       console.log('yeha samma');
//       const response = await axios.delete(`http://localhost:8000/api/user/${deleteId}`);
//       console.log(response);
//       console.log('bigariyo');
//       // console.log(response);
//       dispatch(deleteAppointment(deleteId))

//     } catch (error) {
//       throw error
//     }
//   }
// }
// export const notifyAppointmentHere = (item)=>{
//   return async (dispatch)=>{
//     try {
//       const appointmentId = item.docid;
//      const email = item.email;
//       console.log(appointmentId,email);
//       console.log('yeha samma aayo');
//       const response = await axios.patch(`http://localhost:8000/api/user/${appointmentId}`,{toNotify:true});
//       console.log(response.data);

//       dispatch(notifyAppointment(appointmentId))
//       return response
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
