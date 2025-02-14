import { useEffect, useState } from "react";
import "./count.scss";

export type Product = {
  id: number;
  name: string;
  price: number;
  image_link?: string;
};

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [user, setUser] = useState<{ firstname: string; email: string } | null>(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.email) {
      setUser(storedUser);
    }
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="cart_container">
      <h1>Shopping Cart</h1>

      {user ? (
        <div className="user_info">
          <p>
            <strong>Name:</strong> {user.firstname}
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
                  <td>${product.price.toFixed(2)}</td>
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
        </>
      ) : (
        <p className="empty_cart">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
