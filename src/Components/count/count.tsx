import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
};

const Count: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="cart-container">
      <h1>Panier</h1>
      {cart.length === 0 ? (
        <p>Aucun produit sélectionné.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Nom du produit</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total : ${totalPrice.toFixed(2)}</h3>
          <button onClick={() => navigate("/")}>Retour aux produits</button>
        </>
      )}
    </div>
  );
};

export default Count;
