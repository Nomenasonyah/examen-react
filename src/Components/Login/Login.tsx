import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJET",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "TON_MESSAGING_SENDER_ID",
  appId: "TON_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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
      firstName,
    };
    const users = JSON.parse(localStorage.getItem("user") || "[]");
    users.push(user);
    localStorage.setItem("user", JSON.stringify(users));
    navigate("/dashboard");
  };

  // 🔹 Connexion avec Google après vérification de l'email
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (!email) {
        console.error("Impossible d'obtenir l'email de l'utilisateur.");
        alert("Erreur : Impossible de récupérer votre email.");
        return;
      }

      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length === 0) {
        console.error("Cet email n'est pas enregistré sur Google.");
        alert("Votre compte Google n'est pas autorisé à se connecter.");
        return;
      }

      const user = {
        email,
        name: result.user.displayName,
        firstName: result.user.displayName?.split(" ")[0],
      };

      localStorage.setItem("user", JSON.stringify([user]));
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google :", error);
      alert("Une erreur est survenue lors de la connexion.");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <img src="./logo2.png" alt="Logo" className="logo" />
        
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
          placeholder="First Name"
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
        
        <button className="btnlogin submit" type="submit">
          Se connecter
        </button>
        
        <button className="btnlogin" type="button" onClick={handleGoogleLogin}>
          <img className="iconLogin" src="./google.png" alt="Google Icon" />
          Continue avec Google
        </button>
        
        <button className="btnlogin">
          <img className="iconLogin" src="./apple.png" alt="Apple Icon" />
          Continue avec Apple
        </button>
      </form>
    </div>
  );
};

export default Login;
