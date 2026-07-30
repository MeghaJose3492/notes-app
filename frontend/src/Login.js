import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from "motion/react";
import Api from './services/Api';
function Login() {
    const[user, setUser] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
// login function to handle form submission and API call
const submitLogin = async (event) => {
    event.preventDefault();
    try {
        const response = await Api.post("/auth/login", {
            email: user.username,
            password: user.password
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard  ");
    } catch (error) {
      console.log(error);
    console.log(error.response);

    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
    }
        alert("Invalid email or password.");
        console.error(error);
    }
};

  return (
    <div className="login-page">
      <main className="register-page login-layout">
        <section className="register-intro login-intro" aria-label="Login introduction">
                <motion.div initial={{
    opacity: 0,
    scale: 0.5,
    y: 50
  }}
  animate={{
    opacity: 1,
    scale: 1,
    y: 0
  }} transition={{
  type: "spring",
  stiffness: 100,
  damping: 10
}} className="brand-mark" aria-hidden="true">Motion</motion.div>
                <p className="eyebrow">Welcome back</p>
                <h1>Return to your ideas.</h1>
                <p className="intro-copy">
                  Pick up where you left off and keep the thoughts that matter within reach.
                </p>
                <div className="intro-detail">
                    <span className="detail-line" aria-hidden="true" />
                    <p>Your next chapter starts here.</p>
                </div>
            </section>
            <section className="form-panel">
                <div className="login-heading">
                  <p className="eyebrow">Your private space</p>
                  <h2>Sign in</h2>
                  <p>Enter your details to continue to your notes.</p>
                </div>
                <form className="login-form" onSubmit={submitLogin}>
                    <label className="login-field" htmlFor="username">
                      <span>Username</span>
                      <input type="text" id="username" name="username" placeholder="Your username" required  onChange={(e) => setUser({...user, username: e.target.value})} />
                    </label>
                    <label className="login-field" htmlFor="password">
                      <span>Password</span>
                      <input type="password" id="password" name="password" placeholder="Your password" required onChange={(e) => setUser({...user, password: e.target.value})} />
                    </label>
                    <div className="button-group">
                    <button type="submit" className="btn login-submit">Sign in</button>
                    <Link to="/register" className="login-register">Create an account <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                </form>
            </section>
        </main>
    </div>
  );
}



export default Login;