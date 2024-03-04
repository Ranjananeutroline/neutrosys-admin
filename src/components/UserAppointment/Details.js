import React, { useState, useMemo} from 'react';
import './Details.css';
import './Form.css';
import './calendarTimeslot.css';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdOutlineMiscellaneousServices } from 'react-icons/md';
import { BsArrowLeft  } from 'react-icons/bs';
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, ButtonGroup } from "@mui/material";
import TimezoneSelect, { allTimezones } from "react-timezone-select"
import Calendar from 'react-calendar';
import Time from './Time.js'
import { useNavigate } from "react-router-dom";



 function Details(props) {
   
    const [selectedTimezone, setSelectedTimezone] =useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
      )
console.log(selectedTimezone?.value || selectedTimezone);
    // const [selectedTimezone, setSelectedTimezone] = useState({})

    const [show, setShow] = useState(false);
        
    const [value, setValue] = useState();
        
    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false)
console.log(date);
console.log(showTime);
console.log(props.item.heading);
    const ShowTime = () => {
      setShowTime(false);
    }
    const navigate = useNavigate(); 

  return (
    <>
    <div className='detail-main'>
        <Container>
          <Row className="back-row">
            <Col>
            <button className="back-btn" onClick={() => navigate(-1)}><BsArrowLeft /></button>
            </Col>
          </Row>
            <Row className="detail-row">
            <Col sm={6} className='detail-left'>
                <h3>Select Date and Time</h3>
                <div className="time-calendar">
                    <TimezoneSelect
                      sx={{height: "5px"}}
                      value={selectedTimezone}
                      onChange={setSelectedTimezone}
                      //  placeholder= {"Select Time zone"}
                      labelStyle="altName"
                      
                    />
                    <Calendar onChange={setDate}
                     value={date}
                      onClickDay={() => setShowTime(true)}
                      minDate={new Date()}
                     
                      />
                    { showTime ?
                     <Time
                    showTime={showTime} 
                    ShowTime={ShowTime}
                    selectedTimezone={selectedTimezone}
                    heading={props.item.heading}
                    date={date} 
                    value={date}
                    /> : null }
                </div>
            </Col>
            

            <Col sm={6} className='detail-right'>
                <div className='client-detail'>
                    <div className='heading'>
                        <h4>Appointments - Current Clients Only</h4>
                        <p>Neutroline Pvt. Ltd.</p>
                        
                    </div>
                    <div className='detail-body'>
                        <div className='phone'>
                            <p className='phn-icon'><MdOutlineMiscellaneousServices/>&nbsp;Services</p>
                        </div>
                        <p className='firstp'>
                        Please select an available time slot and complete the appointment form. 
                        We will contact you at the time that you have selected.
                        </p>
                        <p className='secondp'>
                        Note: Up to 15 mins to discuss any aspects of your case.
                        This meeting is set for 15 mins but you will be charged for the time spent on the case 
                        </p>
                    </div>
                </div>
            </Col>
            </Row>
            
           
           


        </Container>
        
    </div> 
    
    </>
  );
}



export default Details;
