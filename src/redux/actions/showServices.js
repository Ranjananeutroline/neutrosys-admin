import axios from "axios";
import { useNavigate } from "react-router-dom";



export const getAllServices = (data) => ({
  type: "GET_ALL_SERVICES",
  payload: data,
});

export const getAllServicesHere = () => {
  return async (dispatch) => {
    try {
      console.log("yeta");
      const response = await axios.get(
        "http://localhost:8000/api/service/allServices"
      );
      console.log(response);
      dispatch(getAllServices(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
};