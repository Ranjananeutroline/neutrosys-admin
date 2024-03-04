// reducers/auth.js
const initialState = {
  id: null,
  timezone: "Kathmandu, Nepal",
  date: "2078-04-06",
  time: "10:30",
  fullname: "Alex Nepali",
  email: "AlexNepali@gmail.com",
  phonenumber: "9801234567",
  companyname: "Neutroline pvt.ltd",
  message: "Hlo I need a appointment asap",
  error: null,
  appointment: [],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_APPOINTMENT":
      console.log(action.payload);
      const currentAppointments = Array.isArray(state.appointment)
        ? state.appointment
        : [];
    
      const updatedAppointmentsAfterCreating = [
        ...currentAppointments,
        action.payload,
      ];
    
      return {
        ...state,
        error: null,
        appointment: updatedAppointmentsAfterCreating,
      };
    // return { ...state, error: null, appointment: action.payload };
    case "GET_ALL_APPOINTMENT":
      return { ...state, error: null, appointment: action.payload };
    case "CONFIRM_BOOKING_REQUEST":
      console.log(state.appointment);
      console.log(action.payload);
      const updatedAppointments = state?.appointment?.map((appointment) => {
        // console.log('here id is',action.payload.id);
        console.log("okokokokokoko");
        if (appointment._id === action.payload) {
          console.log("hurray");
          console.log(appointment);
          // Update the specific properties of the appointment
          return {
            ...appointment,
            isRequestPending: false,
          };
        }
        return appointment; // Leave other appointments unchanged
      });
      return {
        ...state,
        error: null,
        appointment: updatedAppointments,
      };
    // ..
    // return {...state, isRequestPending:false,error:null}
    // case 'AUTH_SUCCESS':
    //   return { ...state, isLoading: false, isLoggedIn: true, user: action.payload, error: null };
    case "DELETE_APPOINTMENT":
      // console.log(state.appointment);
      console.log(action.payload);
      const afterdeletedAppointments = state?.appointment?.filter(
        (appointment) => {
          // console.log('here id is',action.payload.id);
          console.log("okokokokokoko yeyeyey");
          console.log(appointment._id);
          console.log(action.payload);
          return appointment._id !== action.payload;
          // if (appointment._id === action.payload) {
          //   console.log("hurray");
          //   console.log(appointment);
          //   // Update the specific properties of the appointment
          //   return {
          //     ...appointment,
          //   };
          // }
          // return appointment; // Leave other appointments unchanged
        }
      );
      return {
        ...state,
        error: null,
        appointment: afterdeletedAppointments,
      };
    case "NOTIFY_APPOINTMENT":
      console.log("yeha samma ni ok xa");
      console.log(state.appointment);
      console.log(action.payload);
      const itemIndex = state.appointment.findIndex(
        (appointment) => appointment._id === action.payload
      );

      console.log(itemIndex);
      if (itemIndex !== -1) {
        // Create a new array with the updated item
        const updatedAppointment = {
          ...state.appointment[itemIndex],
          toNotify: true,
        };
console.log(updatedAppointment);
        const newData = [...state.appointment];
        newData[itemIndex] = updatedAppointment;
        console.log(newData);
        // Return the updated state
        return {
          ...state,
          appointment: newData,
        };
      }
      return state; // No item found with the given ID, return the current state

    // const selectedAppointment = state?.appointment.filter((appointment)=>{
    //   return appointment._id = action.payload;
    // })

    case "CREATE_APPOINTMENT_FAILED":
      return { ...state, error: action.payload };
    case "ACCEPT_APPOINTMENT_REQUEST":
      return { ...state, appointment: action.payload, error: null };
    case "REJECT_APPOINTMENT_REQUEST":
      return { ...state, appointment: action.payload, error: null };
    default:
      return state;
  }
};

export default bookingReducer;