const initialState = {
    days: "",
    hours: "",
    holidays: "",
    breaks: "",
  };
  
  const businesshoursReducerReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CREATE_businesshours":
        console.log(action.payload);
        console.log(state.businesshours);
        const newannouncement = [...state.businesshours, action.payload];
        console.log(businesshours);
        return { ...state, businesshours: newbusinesshours };
      case "GET_ALL_BUSINESSHOURS":
        return { ...state, error: null, businesshours: action.payload };
        case "DELETE_BUSINESSJOURS_BY_ID":
          console.log(state.businesshours);
            console.log(action.payload);
            const afterdeletedBusinesshours = state?.businesshours?.filter(
              (businesshours) => {
                console.log("okokokokokoko yeyeyey");
                // console.log(appointment._id);
                // console.log(action.payload);
                return businesshours._id !== action.payload;
  
              }
            );
            return {
              ...state,
              error: null,
              businesshours: afterdeletedBusinesshours,
            };  
  
            case "EDIT_BUSINESSHOURS_BY_ID":
              console.log(action.payload);
              console.log(state.announcement);
              const updatedBusinesshours = state?.businesshours?.map((businesshours) => {
                if (businesshours._id === action.payload._id) {
                  // Update the specific properties of the offer
                  return {
                    ...businesshours,
                    days: action.payload.days, // Replace the title with the new value
                    hours: action.payload.hours,
                    holidays: action.payload.holidays,
                    breaks: action.payload.breaks,
                  };
                }
                return businesshours; // Leave other business unchanged
              });
              return {
                ...state,
                error: null,
                businesshours: updatedBusinesshours,
              };
        
            case "DELETE_BUSINESSHOURS_BY_ID":
              // console.log(state.appointment);
              console.log(action.payload);
              const afterdeletedBhours = state?.businesshours?.filter((businesshours) => {
                console.log("okokokokokoko yeyeyey");
                console.log(businesshours._id);
                console.log(action.payload);
                return businesshours._id !== action.payload;
              });
              return {
                ...state,
                error: null,
                businesshours: afterdeletedBusinesshours,
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
  
  export default businesshoursReducer;
  