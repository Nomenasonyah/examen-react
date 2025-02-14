import women from "../../../public/man.avif";
import man from "../../../public/man.avif";
// import UserCompte from "../user_compte/user";
import { useEffect, useState } from "react";
import "./Client.scss";
import { Link } from "react-router-dom";

type Client = {
  id: number;
  name: string;
  first?: string;
  email: string;
  image?: string;
};
export type UserProps={
  customClass?:string
}

const Clients: React.FC <UserProps>= ({customClass}) => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const users = JSON.parse(userData);
      console.log(users)

      if (Array.isArray(users)) {
        const formattedClients = users.map((user, index) => ({
          id: index + 1, 
          name: user.name || "Nom inconnu",
          first: user.firstName || "Prénom inconnu",
          email: user.email || "Email inconnu",
          image: index % 2 === 0 ? women : man, 
        }));
        setClients(formattedClients);
      } else if (typeof users === "object") {
        
        setClients([
          {
            id: 1,
            name: users.name || "Nom inconnu",
            first: users.first || "Prénom inconnu",
            email: users.email || "Email inconnu",
            image: women,
          },
        ]);
      }
    }
  }, []);

  return (
    <div className="clients">
      <div className="title">
        <h1 className={`title ${customClass || ""}`}>Clients</h1>
        <button className={`btnCreate ${customClass || ""}`} >Create</button>
      </div>
     
      <ul className={`clientContainer ${customClass || ""}`}>
        {clients.map((client) => (
          <li className={`client-list ${customClass || ""}`}  key={client.id}>
            <div className={`info-user ${customClass || ""}`}>
              <img src={client.image} alt={client.name} />
              <p className={`name ${customClass || ""}`}>
                {client.name} <br />
                <span>{client.first}</span>
              </p>
            </div>
            <p>
              <span className={`email ${customClass || ""}`}>E-mail: </span>{client.email}email
            </p>
            <Link to="/cart"><button className={`btnAmount ${customClass || ""}`}>Amount</button></Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
