import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
  // API url
  const apiHost = import.meta.env.VITE_API_HOST + '/api/users/login';

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Form submission handler
  async function addUser(data) {
    // Log the data to verify it's being captured
    console.log('Form data:', data);

    // Check if the server expects JSON instead of form-urlencoded
    const jsonData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch(apiHost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Change to JSON if required
        },
        body: JSON.stringify(jsonData),  // Send data as JSON
      });

      if (response.ok) {
        // Redirect on successful login
        window.location.href = '/';
      } else {
        // Log the error message from the response
        console.error('Login failed:', await response.text());
        // Optionally, display an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Optionally, display an error message to the user
    }
  }

  return (
    <>
      <h1>Login</h1> {/* Changed to "Login" */}
      <p>Login to your account</p>

      {/* Form submission triggers "addUser" */}
      <form onSubmit={handleSubmit(addUser)}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="form-control bg-light"
          />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="form-control bg-light"
          />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
        <Link to="/signup" className="btn btn-outline-secondary ms-3">New?</Link>
      </form>
    </>
  );
}
