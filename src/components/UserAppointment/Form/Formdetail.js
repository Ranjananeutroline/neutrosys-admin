import React, {useState} from "react";
import "./Formdetail.css";


function Formdetail() {

   const [formState, setFormState] = useState({
      name: "",
      email: "",
      phoneNumber: "",
     
    });
  
    const [formErrors, setFormErrors] = useState({
      name: "",
      email: "",
      phoneNumber: "",
      
    });
    const validateForm = () => {
      let isValid = true;
  
      if (!formState.name) {
        setFormErrors((prevState) => ({
          ...prevState,
          name: "Name is required",
        }));
        isValid = false;
      } else if (formState.name.length < 8) {
        setFormErrors((prevState) => ({
          ...prevState,
          name: " Must be at least 8 characters",
        }));
        isValid = false;
      } else {
        setFormErrors((prevState) => ({
          ...prevState,
          name: "",
        }));
      }
  
      if (!formState.email) {
        setFormErrors((prevState) => ({
          ...prevState,
          email: "Required",
        }));
        isValid = false;
      } else {
        const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  
        if (!emailRegex.test(formState.email)) {
          setFormErrors((prevState) => ({
            ...prevState,
            email: "Invalid",
          }));
          isValid = false;
        } else {
          setFormErrors((prevState) => ({
            ...prevState,
            email: "",
          }));
        }
      }
  
      if (!formState.phoneNumber) {
        setFormErrors((prevState) => ({
          ...prevState,
          phoneNumber: " Required",
        }));
        isValid = false;
      } else if (!/^[0-9]{10}$/i.test(formState.phoneNumber)) {
        setFormErrors((prevState) => ({
          ...prevState,
          phoneNumber: "Invalid",
        }));
        isValid = false;
      } else {
        setFormErrors((prevState) => ({
          ...prevState,
          phoneNumber: "",
        }));
      }
  
      
  
      return isValid;
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    };
  
    const handlePhoneNumberChange = (e) => {
      const { value } = e.target;
      const sanitizedValue = value.replace(/[^0-9]/g, "");
      setFormState((prevState) => ({
        ...prevState,
        phoneNumber: sanitizedValue,
      }));
      setFormErrors((prevState) => ({
        ...prevState,
        phoneNumber: "",
      }));
    };
    function handleSubmit(e) {
      e.preventDefault();
      console.log(formState);
      if (validateForm()) {
        console.log("validated")
  
            
      }
    }

   return(
    <>
     <form onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <p>
         {formErrors.name}
          
        </p>
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <p>
         {formErrors.email}
          
        </p>
      </div>

      <div className="form-field">
        <input
          type="tel"
          name="phoneNumber"
          onChange={handlePhoneNumberChange}
          value={formState.phoneNumber}
          placeholder="Phone No"
        />
        <p>
         {formErrors.phoneNumber}
          
        </p>
      </div>
      <button type="submit">Submit</button>
    </form>

    </>
   )
}

export default Formdetail;
