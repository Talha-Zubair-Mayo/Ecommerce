import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../../../Redux/actions/UserActions";


function Login() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const dispatch = useDispatch();
  // getting global state for login
  const userLoginn = useSelector((state) => state.userLogin);
  const { loading, error, userLogin } = userLoginn;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginAction(email, pass));
    if (error) {
      alert(`${error.message}`);
    } else {
      window.location.href = "/";
      localStorage.setItem("LoggedIn", true);
    }
  };
   
  return (
    <>
      <div className="login-page">
        {error && <h1>errorrrrrrr</h1>}
        
        <form onSubmit={loginSubmit}>
          <h2>Login</h2>

          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="pass"
            required
            autoComplete="on"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <div className="row">
            <button type="submit">Login</button>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
