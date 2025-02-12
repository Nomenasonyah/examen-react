import React from "react";
import { useEffect, useState } from "react";
import UserCompte from "../user_compte/user";

// import { render } from "react-dom";
import "./Dashboard.scss";
import Products, { Product } from "../Products/Products";
import PieChart from "../../Components/Graphe/Components/Graph1/PieActiveArc";
import Graph2 from "../Graphe/Components/Graph2/GrideDemo";
import BaresData from "../Graphe/Components/Graph3/BarsData";


const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [isOut, setOut] = useState<Product[]>([]);
  useEffect(() => {
    fetch(
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const totalProduct = () => {
    return products.reduce(
      (total, product) => total + product.id * product.price,
      0
    );
  };
  return (
    <div className="dashboard">
      <div className="title_compte">
        <h1>Sales analytics</h1>
        <UserCompte/>
      </div>

      <p className="total">CA : {totalProduct().toFixed(0)}M ar</p>

      <div className="graphique">
        <div className="top_vente">
          <p className="p_data">Top vente</p>
          <div className="graphe barData">
            <BaresData />
          </div>
        </div>
        <div className="top_product">
          <p className="p_data">Top Product</p>
          <div className="graphe piedata">
            <PieChart />
          </div>
        </div>
        <div className="progress">
          <p className="p_data">Progress</p>
          <div className="graphe lineData">
            <Graph2 />
          </div>
        </div>
      </div>
      <div className="Liste-Vente">
        <h2>Liste de ventes</h2>
        <Products
          limit={6}
          hideTitle={true}
          image={true}
          customClass="my-custom-style"
        />
        <div className="style"></div>
      </div>
    </div>
  );
};
export default Dashboard;
