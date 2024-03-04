import React from 'react';
// import Details from "../Components/Appointment/Details";
// import Detail from '../../shared/AppointmentDetail/Detail';
import Details from "../../components/UserAppointment/Details"
import { useLocation } from 'react-router-dom';

function UserAppointment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemData = searchParams.get('item');
  const item = JSON.parse(itemData);
  console.log(item);
  return (
    <>
     <Details item={item}/>
      
    </>
  );
}

export default UserAppointment;
