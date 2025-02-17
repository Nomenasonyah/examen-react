import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword 
} from "firebase/auth";

// Configuration Firebase
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user) {
        alert("Échec de la connexion. Vérifiez vos informations.");
        return;
      }

      const userData = {
        email: user.email,
        uid: user.uid,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false); 
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email) {
        alert("Impossible de récupérer votre email.");
        return;
      }

      const userData = {
        email: user.email,
        name: user.displayName,
        firstName: user.displayName?.split(" ")[0],
        uid: user.uid,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google :", error);
      alert("Une erreur est survenue lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <img src="./logo2.png" alt="Logo" className="logo" />
        
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
        
        <button className="btnlogin submit" type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
        
        <button className="btnlogin" type="button" onClick={handleGoogleLogin} disabled={loading}>
          <img className="iconLogin" src="./google.png" alt="Google Icon" />
          {loading ? "Connexion..." : "Continue avec Google"}
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
