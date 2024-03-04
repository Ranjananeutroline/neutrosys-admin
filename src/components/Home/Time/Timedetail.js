import React, { Component, useEffect, useState } from "react";
import "./Timedetail.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BiSolidDownArrow } from "react-icons/bi";
import Data from "./Data";
import Modal from "react-bootstrap/Modal";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import AppointmentComponent from "./AppointmentComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllServicesHere } from "../../../redux/actions/showServices";


function Timedetail() {
  const [state, setstate] = useState(false);
  const [nextstate, setNextstate] = useState();
  const [showBoxInFull, setShowBoxInFull] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllServicesHere());
  }, [dispatch]);

  const services = useSelector((state) => state.service.service);
  console.log(services);

  const closeButton = () => {
    setstate(false);
  };

  const callAppointment = (item) => {
    setstate(!state);
    setNextstate(<AppointmentComponent item={item} />);
  };

  return (
    <>
      <div className="body-div">
        <div className="time-title">
          <h5>Select Services</h5>
        </div>
        {console.log(Data.length)}

        <Row className="time-box">
          {services && services.length > 0 ? (
            services.map((item) => {
              return (
                <>
                  {/* //for less than 6 box */}
                  <Col className="time-col" key={item.id}>
                    <div className="inner-time">
                      <img
                        src={item.icon || "15min-clock.png"}
                        alt=""
                        className="clock-img"
                        style={{
                          height: "40px",
                          width: "40px",
                          marginTop: "8px",
                        }}
                      />
                      <div
                        className="second-div"
                        style={{ padding: "0.7rem 0 0 1.5rem" }}
                      >
                        <h6>
                          {item.title}
                          <p className="time-p">{item.details}</p>
                        </h6>
                      </div>
                    </div>
                    <div className="inner-second">
                      <button
                        className="more-btn"
                        key={item.id}
                        onClick={() => {
                          callAppointment(item);
                        }}
                      >
                        Details&nbsp;<BiSolidDownArrow />
                        
                      </button>
                      <button className="nxt-btn">
                        <span className="tooltiptext">Next</span>
                        <Link
                          to={`/userappointment?item=${JSON.stringify(item)}`}
                        >
                          <img
                            src="icon-arrow.png"
                            alt=""
                            className="nxt-img"
                            style={{ height: "19px", width: "17px" }}
                          />
                        </Link>
                        <Outlet />
                      </button>
                    </div>
                  </Col>
                </>
              );
            })
          ) : (
            // You can display a loading message or handle the case when services are not available here
            <p>Loading services...</p>
          )}
        </Row>
        <Modal
          show={state}
          onHide={closeButton}
          className="modal-box"
          dialogClassName="modal-width"
        >
          <Modal.Header closeButton className="modalheader"></Modal.Header>
          <Modal.Body className="body-modal">{nextstate}</Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Timedetail;