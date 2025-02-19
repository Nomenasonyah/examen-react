import { useEffect, useState } from "react";
import "./count.scss";
import { Link } from "react-router-dom";
import "./count.scss"
export type Product = {
  id: number;
  name: string;
  price: number;
  image_link?: string;
};

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [user, setUser] = useState<{ firstName?: string; email?: string } | null>(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    const storedUsers = JSON.parse(localStorage.getItem("user") || "[]");
    if (Array.isArray(storedUsers) && storedUsers.length > 0) {
      setUser(storedUsers[0]); // Prend le premier utilisateur stocké
    }
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((acc, product) => acc + Number(product.price), 0);

  return (
    <div className="cart_container">
      <h1>Shopping Cart</h1>

      {user?.email ? (
        <div className="user_info">
          <p>
          <strong>Name:</strong> {user.email.split("@")[0]}

          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p className="warning">Please log in to see your cart.</p>
      )}

      {cart.length > 0 ? (
        <>
          <table className="cart_table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.image_link ? (
                      <img src={product.image_link} alt={product.name} className="cart_image" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(product.id)} className="remove_btn">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total_price">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>

          <div className="checkout_section">
            <Link to="/checkout">
              <button className="checkout_btn">Proceed to Checkout</button>
            </Link>
          </div>
        </>
      ) : (
        <p className="empty_cart">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
