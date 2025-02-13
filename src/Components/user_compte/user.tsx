import { useEffect, useState } from "react";
import women from "../../img/women.avif";
import "./user.scss";

interface UserProps {
  name: string;
  firstName?: string;
  image?: string;
}

const LastSignUp: React.FC = () => {
  const [lastUser, setLastUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const users = JSON.parse(userData);
      if (Array.isArray(users)) {
        const latestUser = users[users.length - 1];  
        setLastUser({
          name: latestUser.name || "Nom inconnu",
          firstName: latestUser.firstName || "Prénom inconnu",
          image: latestUser.image || "/img/woman.jpg",  
        });
      } else if (typeof users === "object") {
        setLastUser({
          name: users.name || "Nom inconnu",
          firstName: users.firstName || "Prénom inconnu",
          image: users.image || "/img/man.jpg",
        });
      }
    }
  }, []);

  if (!lastUser) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="user_compte">
      <img className="user_image"src={women} alt={lastUser.name} />
      <p>
        {lastUser.name} <br />
        <span>{lastUser.firstName}</span>
      </p>
      <a href="/">
        <img src="/img/logOut.png" alt="Log out" />
      </a>
    </div>
  );
};

export default LastSignUp;
