import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  // API url
  const apiHost = import.meta.env.VITE_API_HOST + '/api/users/signup';

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Form state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');

  function addUser(data) {
    // Create a URL-encoded string
    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('email', data.email);
    urlEncodedData.append('password', data.password);
    urlEncodedData.append('first_name', data.first_name);
    urlEncodedData.append('last_name', data.last_name);

    // Use fetch to post to API
    async function postData() {
      const response = await fetch(apiHost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        body: urlEncodedData.toString(), 
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        // handle error
      }
    }

    postData();
  }

  return (
    <>
      <h1>Signup</h1>
      <p>Signup Page</p>

      {/* handle submit will validate your input invoking "addUser" */}
      <form onSubmit={handleSubmit(addUser)} method="post">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            {...register("email", { required: true })}
            type="text"
            className="form-control bg-light"
          />
          {errors.email && <span className="text-danger">Email is required</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            className="form-control bg-light"
          />
          {errors.password && <span className="text-danger">Password is required</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            {...register("first_name", { required: true })}
            type="text"
            className="form-control bg-light"
          />
          {errors.first_name && <span className="text-danger">First name is required</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            {...register("last_name", { required: true })}
            type="text"
            className="form-control bg-light"
          />
          {errors.last_name && <span className="text-danger">Last name is required</span>}
        </div>

        <button type="submit" className="btn btn-primary">Create</button>
        <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
      </form>
    </>
  );
}
