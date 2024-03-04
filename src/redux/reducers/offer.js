// reducers/auth.js
const initialState = {
  title: "",
  message: "",
  description: "",
  date: "",
};

const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_OFFER":
      console.log(action.payload);
      console.log(state.offer);
      const newoffer = [...state.offer, action.payload];
      console.log(newoffer);
      return { ...state, offer: newoffer };
    case "GET_ALL_OFFERS":
      return { ...state, error: null, offer: action.payload };

    case "EDIT_OFFER_BY_ID":
      console.log(action.payload);
      console.log(state.offer);
      const updatedOffers = state?.offer?.map((offer) => {
        if (offer._id === action.payload._id) {
          // Update the specific properties of the offer
          return {
            ...offer,
            title: action.payload.title, // Replace the title with the new value
            description: action.payload.description,
            validity: action.payload.validity,
          };
        }
        return offer; // Leave other offers unchanged
      });
      return {
        ...state,
        error: null,
        offer: updatedOffers,
      };

    case "DELETE_OFFER_BY_ID":
      // console.log(state.appointment);
      console.log(action.payload);
      const afterdeletedOffers = state?.offer?.filter((offer) => {
        console.log("okokokokokoko yeyeyey");
        console.log(offer._id);
        console.log(action.payload);
        return offer._id !== action.payload;
      });
      return {
        ...state,
        error: null,
        offer: afterdeletedOffers,
      };

    //     case "CONFIRM_BOOKING_REQUEST":
    //       console.log(state.appointment);
    //       console.log(action.payload);
    //       const updatedAppointments = state?.appointment?.map((appointment) => {
    //         console.log("okokokokokoko");
    //         if (appointment._id === action.payload) {
    //           console.log("hurray");
    //           console.log(appointment);
    //           // Update the specific properties of the appointment
    //           return {
    //             ...appointment,
    //             isRequestPending: false,
    //           };
    //         }
    //         return appointment; // Leave other appointments unchanged
    //       });
    //       return {
    //         ...state,
    //         error: null,
    //         appointment: updatedAppointments,
    //       };

    //     case "DELETE_APPOINTMENT":
    //       // console.log(state.appointment);
    //       console.log(action.payload);
    //       const afterdeletedAppointments = state?.appointment?.filter(
    //         (appointment) => {
    //           console.log("okokokokokoko yeyeyey");
    //           console.log(appointment._id);
    //           console.log(action.payload);
    //           return appointment._id !== action.payload;

    //         }
    //       );
    //       return {
    //         ...state,
    //         error: null,
    //         appointment: afterdeletedAppointments,
    //       };
    //     case "NOTIFY_APPOINTMENT":
    //       console.log("yeha samma ni ok xa");
    //       console.log(state.appointment);
    //       console.log(action.payload);
    //       const itemIndex = state.appointment.findIndex(
    //         (appointment) => appointment._id === action.payload
    //       );

    //       console.log(itemIndex);
    //       if (itemIndex !== -1) {
    //         // Create a new array with the updated item
    //         const updatedAppointment = {
    //           ...state.appointment[itemIndex],
    //           toNotify: true,
    //         };
    // console.log(updatedAppointment);
    //         const newData = [...state.appointment];
    //         newData[itemIndex] = updatedAppointment;
    //         console.log(newData);
    //         // Return the updated state
    //         return {
    //           ...state,
    //           appointment: newData,
    //         };
    //       }
    //       return state; // No item found with the given ID, return the current state

    //     case "CREATE_APPOINTMENT_FAILED":
    //       return { ...state, error: action.payload };
    //     case "ACCEPT_APPOINTMENT_REQUEST":
    //       return { ...state, appointment: action.payload, error: null };
    //     case "REJECT_APPOINTMENT_REQUEST":
    //       return { ...state, appointment: action.payload, error: null };
    default:
      return state;
  }
};

export default offerReducer;
