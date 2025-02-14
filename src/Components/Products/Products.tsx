import { useEffect, useState } from "react";
import "./Products.scss";
import { Link } from "react-router-dom";
import ModalStock from "../ModalStock";

export type Product = {
  id: number;
  name: string;
  price: number;
  image_link?: string;
};

export type ProductsProps = {
  filterFunction?: (product: Product) => boolean;
  limit?: number;
  hideTitle?: boolean;
  image?: boolean;
  customClass?: string;
  maxNameLength?: number;
  price?: boolean;
};

const byAlert = () => {
  alert("Are you sure to buy this product?");
};

const Products: React.FC<ProductsProps> = ({
  // filterFunction,
  limit,
  hideTitle,
  image,
  customClass,
  maxNameLength = 30,
  price,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stockValues, setStockValues] = useState<{ [key: number]: number }>({});
  const [modalOpen, setModalOpen] = useState<{ [key: number]: boolean }>({});
  const updateStock = (productId: number, quantity: number) => {
    setStockValues((prevStock) => ({
      ...prevStock,
      [productId]: quantity,
    }));
    setModalOpen((prev) => ({ ...prev, [productId]: false })); 
  };
  const byAlert = () => {
    alert("Are you sure to buy this product?");
  };
  useEffect(() => {
    fetch(
      "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const httpSimulation = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    };

    const fetchProductFromSimulation = async () => {
      await httpSimulation();
      setIsLoading(false);
    };

    fetchProductFromSimulation();
  }, []);


  return (
    <div className="products_container">
      {isLoading ? (
        <span>Loading in progress...</span>
      ) : (
        <>
          {!hideTitle && <h1>Products</h1>}
          <div className={`container_title ${customClass || ""}`}>
            <h3>Name</h3>
            <h3>Price</h3>
            <h3>Stock</h3>
          </div>
          <ul className={`product_list ${customClass || ""}`}>
            {products.slice(0, limit).map((product) => (
              <li className={`product ${customClass || ""}`} key={product.id}>
                <div className="img_name">
                  {image && product.image_link && (
                    <img src={product.image_link} alt={product.name} />
                  )}
                  <p>{product.name.length > maxNameLength ? `${product.name.slice(0, maxNameLength)}...` : product.name}</p>
                </div>
                <div className="price_Content">
                  {price && product.price && (
                    <p className={`price ${customClass || ""}`}>
                      ${product.price}
                    </p>
                  )}
                </div>
                <div className={`adress_manage ${customClass || ""}`}>
                  {product.id - 100 < 0 ? (
                    <>
                      <p className="outOf">out of stock</p>
                    </>
                  ) : (
                    <>
                    <p>stock :{product.id}</p>
                      <Link to="/cart"><button className="manage">Manage count</button></Link>
                      <button
                        onClick={byAlert}
                        className={`btnBuy ${customClass || ""}`}
                      >
                        Buy
                      </button>
                    </>
                  )}
                </div>
                <div className={`stock ${customClass || ""}`}>
                  {product.id - 100 < 0 && !stockValues[product.id] ? (
                    <>
                      <p className="no-Stock">No stock</p>
                      <button
                        className="btnCreate"
                        onClick={() =>
                          setModalOpen((prev) => ({ ...prev, [product.id]: true }))
                        }
                      >
                        Create Stock
                      </button>
                    </>
                  ) : (
                    <p>{stockValues[product.id] || product.id}</p>
                  )}
                </div>

                <div className="detailStock">
                  <p className={`nbrStock ${customClass || ""}`}>
                    {(product.id * product.price).toFixed(0)}M ar
                  </p>
                  <p className={`btnStock ${customClass || ""}`}>
                    <Link to="/products">see details</Link>{" "}
                  </p>
                </div>

                {modalOpen[product.id] && (
                  <ModalStock productId={product.id} onSave={updateStock} />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Products;
