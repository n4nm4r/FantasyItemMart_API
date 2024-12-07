import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {useState} from "react";

export default function Login() {

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const[loginFail,setLoginFail]=useState(false);


  // Form submission handler
  async function formSubmit(data) {
    const apiUrl = import.meta.env.VITE_API_HOST + '/api/users/login';


    const response = await fetch(apiUrl,{
      method: "POST",
      headers:{
        "Content-Type":"Application/json"},
        body:JSON.stringify(data),
        credentials: 'include'  //this includes the cookies
      
    });

    if(response.ok){
      window.location.href= '/';

    }
    else{
      setLoginFail(true);
    }


  }
    
    

  return (
    <>
      <h1>Login</h1> {/* Changed to "Login" */}
      <p>Login to your account</p>

      {/* Form submission triggers "addUser" */}
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            {...register("email", { required: "Email is required" })} type="text" className="form-control bg-light"/>
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            {...register("password", { required: "Password is required" })} type="text" className="form-control bg-light"/>
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
        <Link to="/signup" className="btn btn-outline-secondary ms-3">New?</Link>
      </form>
    </>
  );
}
