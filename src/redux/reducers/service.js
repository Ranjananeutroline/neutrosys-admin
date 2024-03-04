const initialState = {
  userId: "",
  servicename: "",
  duration: "",
  visibility: "",
  availability:"",
  description:"",
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_SERVICE":
      console.log(action.payload);
      console.log(state.service);
      const newservice = [...state.service, action.payload];
      console.log(newservice);
      return { ...state, service: newservice };
    case "GET_ALL_SERVICE":
      return { ...state, error: null, service: action.payload };

    case "EDIT_SERVICE_BY_ID":
      console.log(action.payload);
      console.log(state.offer);
      const updatedServices = state?.service?.map((service) => {
        if (service._id === action.payload._id) {
          // Update the specific properties of the offer
          return {
            ...service,
            userId: action.payload.userId, // Replace the title with the new value
            description: action.payload.description,
            validity: action.payload.validity,
            duration: action.payload.duration,
            availability: action.payload.availability,
            servicename: action.payload.servicename,
          };
        }
        return service; // Leave other offers unchanged
      });
      return {
        ...state,
        error: null,
        service: updatedServices,
      };

    case "DELETE_SERVICE_BY_ID":
      // console.log(state.appointment);
      console.log(action.payload);
      const afterdeletedServices = state?.service?.filter((service) => {
        console.log("okokokokokoko yeyeyey");
        console.log(service._id);
        console.log(action.payload);
        return service._id !== action.payload;
      });
      return {
        ...state,
        error: null,
        service: afterdeletedServices,
      };

    default:
      return state;
  }
};

export default serviceReducer;

