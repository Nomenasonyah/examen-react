import { Link } from "react-router-dom";
import "./Navbar.scss"
const Navbar: React.FC = () => {
  return (
    <div className="navBar">
      <img src="/img/logo.png" alt="logo" />
    <nav>
      <ul className="list_nav" style={{ display: "flex", gap: "20px", listStyle: "none" ,flexDirection:"column",padding:"0px"}}>
        <li className="li_nav"><img src="/img/dash.png" alt="" /><Link to="/dashboard" className="link_style">Dashboard</Link></li>
        <li className="li_nav"><img src="/img/star.png" alt="" /><Link to="/products" className="link_style">Products</Link></li>
        <li className="li_nav"><img src="/img/user.png" alt="" /><Link to="/clients" className="link_style">Clients</Link></li>
        <li className="li_nav"><img src="/img/store.png" alt="" /><Link to="/store" className="link_style">Store</Link></li>
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
