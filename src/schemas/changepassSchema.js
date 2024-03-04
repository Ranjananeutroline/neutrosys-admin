import * as yup from 'yup'

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const basicPassSchema = yup.object().shape({
 
  
  oldpassword:yup.string().min(6).required("Required"),
  newpassword:yup.string().min(6).required("Required"),
 confirmnewpassword: yup.string().oneOf([yup.ref('newpassword'),null],"Password must match").required("Required") 
  
}
)
