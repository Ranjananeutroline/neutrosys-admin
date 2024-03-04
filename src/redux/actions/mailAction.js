import axios from "axios";
import { useNavigate } from "react-router-dom";

// actions/auth.js
import { deleteAppointment, deleteAppointmentHere } from "./appointmentAction";

export const sentRescheduleEmail = (data) => ({
  type: "SENT_RESCHEDULE_EMAIL",
  payload: data,
});
export const sentNotifyAppointmentEmail = (data) => ({
  type: "SENT_NOTIFY_EMAIL",
  payload: data,
});


export const sentRescheduleEmailHere = (email, id) => {
  return async (dispatch) => {
    // dispatch(authStart());

    try {
      console.log("kehi hola ta aba");
      console.log(id);
      console.log("email is", email);
      dispatch(deleteAppointmentHere(id));
      const response = await axios.post(
        "http://localhost:8000/api/user/mailsend/rescheduleAppointment",
        { email }
      );
      console.log(response);
     
      return response;
    } catch (error) {
      // dispatch(authFail("Invalid credentials"));
      throw error;
    }
  };
};

export const sentNotifyAppointmentEmailHere = (item) => {
  return async (dispatch) => {
    try {
      console.log("kehi hola ta aba");
      // console.log(id);
      const appointmentId = item.docid;
     const email = item.email;
      console.log(appointmentId,email);
      console.log("email is", email);
      const response = await axios.post(
        "http://localhost:8000/api/user/mailsend/notifyAppointment",
        { email, item }
      );
      console.log(response);
      
      // return response;
    } catch (error) {
      throw error;
    }
  };
};
