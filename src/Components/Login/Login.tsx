import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";



const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = {
      email,
      password,
      name,
      firstName
    };
    const users = JSON.parse(localStorage.getItem("user") || "[]");
    users.push(user)
    localStorage.setItem("user", JSON.stringify(users));
    navigate("/dashboard");
  };





  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <img src="./img/logo2.png" alt="Logo" className="logo" />
        <input
          id="input_lastName"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
          <input
          id="input_firstName"
          type="text"
          placeholder="first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          id="input_email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="input_password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="btnlogin submit"
          type="submit"
          
        >
          Se connecter
        </button>
        <button className="btnlogin">
          <img className="iconLogin" src="./img/google.png" alt="" />
          Continue avec Google
        </button>
        <button className="btnlogin">
          <img className="iconLogin" src="./img/apple.png" alt="" />
          Continue avec Apple
        </button>
      </form>
    </div>
  );
};

export default Login;
