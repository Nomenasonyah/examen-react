import { Routes, Route, useLocation } from "react-router-dom";
// import { render } from "react-dom";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashborad";
import Products from "./Components/Products/Products";
import Clients from "./Components/Client/Clients";
import Store from "./Components/Store/Store";
import Login from "./Components/Login/Login";
// import 
// import ProductTable from "./Components/ChildProduct/ChildProduct";


const App: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="container">
      {pathname !== "/" ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/products" element={<Products price={true} image={true}  />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </div>
  );
};

export default App;
