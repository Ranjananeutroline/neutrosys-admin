import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, ButtonGroup } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdDateRange } from "react-icons/md";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createNewAppointment } from "../../redux/actions/appointmentAction";

const time = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:00 AM",
  "12:00 PM",
  "12:30 PM",
  "13:00 PM",
  "13:30 PM",
  "14:00 PM",
  "14:30 PM",
  "15:00 PM",
  "15:30 PM",
  "16:00 PM",
  "16:30 PM",
];

function Times(props) {
  const dispatch = useDispatch();
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);
  const [book, setBook] = useState(false);
  const [focus, setFocus] = useState("00:00");
  const [showClicked, setShowClicked] = useState(false);
  const [date, setDate] = useState(new Date());
  console.log(props.selectedTimezone.value || props.selectedTimezone);
  console.log("Time:", focus);
  console.log("Date:", date);
  console.log(props.heading);
  const options = {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  };
  const fullDayOfWeek = date.toLocaleString("en-US", options);

  const [show, setShow] = useState(false);

  // const [toggle, setToggle] = React.useState(false);
  // const toggleButton = () => setToggle(!toggle);

  const handleClick = () => {
    props.ShowTime();
  };

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    control,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    console.log(data);
    // const success = await dispatch(
    //   createNewAppointment({ fullname: data.name, email:data.email, phonenumber:data.phone, service:service, date:date,time:time})
    // );
    console.log("time finallyy", focus);
    const success = await dispatch(
      createNewAppointment({
        fullname: data.name,
        email: data.email,
        phonenumber: data.phone,
        date: date,
        time: focus,
        service: props.heading,
      })
    );

    console.log(success);
    reset();
    resetField();
    setShow(false);
    // const token = captchaRef.current.getValue();
    // captchaRef.current.reset();
    // swal("Form has been Submitted");
    toast.success("Success\n your form has been submitted", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  function displayInfo(e) {
    setInfo(true);
    setEvent(e.target.innerText);
  }
  const handleTimeButtonClick = (time) => {
    console.log("yesma");
    setInfo(true);
    setEvent(time);
    console.log(time);
    setFocus(time);
    setShowClicked(!showClicked);
    console.log(focus);
  };
  console.log("focys", focus);

  const handleCloseModal = () => {
    setShow(false);
    reset();
  };

  return (
    <div className="times">
      <div className="date-div">
        <button className="backbtn" onClick={handleClick}>
          <BsArrowLeft />
        </button>

        {date.length > 0 ? (
          <p>
            <span>Start:</span>
            {date[0].toDateString()}
            &nbsp; &nbsp;
            <span>End:</span>
            {date[1].toDateString()}
          </p>
        ) : (
          <p className="date-p">
            <MdDateRange />{fullDayOfWeek}
          </p>
        )}
        {showClicked && info ? (
          <p className="set-p">
            <MdOutlineAccessTimeFilled />
            &nbsp;Appointment is set to {event},&nbsp;
            {props.date.toDateString()}
          </p>
        ) : null}
      </div>

      <div className="timeslot-div">
        {time.map((times) => {
          return (
            <div className="space">
              <div className="btn-width">
                {/* <button onClick={(e)=> displayInfo(e)}
      //  style={{backgroundColor: toggle ? '#FFF' : 'blue'}}
        className='time-btn'
       > {times} </button> */}
                <button
                  key={times}
                  onClick={(e) => handleTimeButtonClick(times)}
                  //  style={{backgroundColor: toggle ? '#FFF' : 'blue'}}
                  className={
                    showClicked
                      ? focus === times
                        ? "new-time-btn"
                        : "time-btn"
                      : "time-btn"
                  }
                >
                  {" "}
                  {times}{" "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="book-div">
        <div className="bookbtn-div">
          {info ? (
            <Button onClick={() => setShow(true)} className="bookbtn">
              Book Appointment
            </Button>
          ) : null}
        </div>
        {/* <button style={{backgroundColor: toggle ? '#FFF' : 'blue'}}
       onClick={toggleButton}>Click Me</button> */}
      </div>

      {show ? (
        <Modal
          show={show}
          onHide={handleCloseModal}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton className="header-form">
            <Modal.Title id="example-custom-modal-styling-title">
              Enter Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="form-body">
            <div>
              <div className="services-form-container">
                {" "}
                <div className="mainForm">
                  <form
                    className="form_container"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Row
                      className="form-row m-0"
                      style={{ height: "auto", width: "auto" }}
                    >
                      <Col sm={12} lg={12} md={12} className="form-col ">
                        <TextField
                          // required

                          fullWidth
                          label="Full Name"
                          margin="dense"
                          name="name"
                          variant="filled"
                          // placeholder="Full Name"
                          // value={myForm.values.name}
                          // onChange={myForm.handleChange}
                          // error={!!myForm.errors.companyName}
                          // helperText={myForm.errors.name}
                          autoComplete="off"
                          sx={{
                            "& .MuiFilledInput-underline:before": {
                              borderBottom: "none",
                            },
                            "& .MuiFilledInput-underline:after": {
                              borderBottom: "none",
                            },
                            "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before":
                              {
                                borderBottom: "none",
                              },
                          }}
                          {...register("name", {
                            required: "Required",
                            minLength: 3,
                          })}
                          error={!!errors?.name}
                          // helperText={errors?.name ? errors.name.message : null}
                        />

                        <TextField
                          // required
                          fullWidth
                          label="Email"
                          margin="dense"
                          name="email"
                          variant="filled"
                          // placeholder="Email"
                          autoComplete="off"
                          sx={{
                            "& .MuiFilledInput-underline:before": {
                              borderBottom: "none",
                            },
                            "& .MuiFilledInput-underline:after": {
                              borderBottom: "none",
                            },
                            "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before":
                              {
                                borderBottom: "none",
                              },
                          }}
                          {...register("email", {
                            required: "Required field",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          error={!!errors?.email}
                        />

                        <TextField
                          // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                          fullWidth
                          label="Phone"
                          margin="dense"
                          name="phone"
                          autoComplete="off"
                          variant="filled"
                          placeholder=" Landline/Mobile Number"
                          type="number"
                          className="txtfield_phone "
                          sx={{
                            "& .MuiFilledInput-underline:before": {
                              borderBottom: "none",
                            },
                            "& .MuiFilledInput-underline:after": {
                              borderBottom: "none",
                            },
                            "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before":
                              {
                                borderBottom: "none",
                              },
                          }}
                          {...register("phone", { required: "Required" })}
                          error={!!errors?.phone}
                        />

                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Company name (Optional)"
                          variant="filled"
                          size="small"
                          margin="dense"
                          name="CompanyName"
                          placeholder="Company name"
                          autoComplete="off"
                          sx={{
                            "& .MuiFilledInput-underline:before": {
                              borderBottom: "none",
                            },
                            "& .MuiFilledInput-underline:after": {
                              borderBottom: "none",
                            },
                            "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before":
                              {
                                borderBottom: "none",
                              },
                          }}
                          // {...register("CompanyName", { required: "Required" })}
                          // error={!!errors?.CompanyName}
                        />

                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          label="Message"
                          margin="dense"
                          name="message"
                          variant="filled"
                          placeholder="Your Message"
                          // value={myForm.values.message}
                          // onChange={myForm.handleChange}
                          // error={!!myForm.errors.companyName}
                          // helperText={myForm.errors.message}
                          autoComplete="off"
                          sx={{
                            "& .MuiFilledInput-underline:before": {
                              borderBottom: "none",
                            },
                            "& .MuiFilledInput-underline:after": {
                              borderBottom: "none",
                            },
                            "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before":
                              {
                                borderBottom: "none",
                              },
                          }}
                          // {...register("message", { required: "Required" })}
                          // error={!!errors?.message}
                        />
                        {/* <Form.Group className="mb-3 mt-1">
                    <Form.Check
                      required
                      label="Agree to terms and conditions"
                      feedback="You must agree before submitting."
                      feedbackType="invalid"
                      className='agree-term'
                    />
                  </Form.Group> */}

                        <div className="buttonsubmit">
                          <Button
                            className="submit-btn"
                            // disabled={!myForm.isValid}
                            // onClick={myForm.submitForm}
                            type="submit"
                            variant="contained"

                            // onClick={handleCloseModal}
                          >
                            Submit
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <ToastContainer />
      )}
    </div>
  );
}

export default Times;
