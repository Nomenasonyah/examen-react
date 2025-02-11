import React from "react";

interface Product {
  id: number;
  name: string;
  price?: number;
  stock?: number;
  image_link?: string;
}

interface ProductTableProps {
  limitedProducts: Product[];
  customClass?: string;
  image?: boolean;
  price?: boolean;
  maxNameLength?: number;
}

const truncateText = (text: string, maxLength: number = 20) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const ProductTable: React.FC<ProductTableProps> = ({
  limitedProducts,
  customClass = "",
  image = false,
  price = true,
  maxNameLength = 20,
}) => {
  return (
    <table className={`product_table ${customClass}`}>
      <thead>
        <tr className="container_title">
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          {image && <th>Image</th>}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className={`product_list ${customClass}`}>
        {limitedProducts.map((product) => (
          <tr className={`product ${customClass}`} key={product.id}>
            <td>{truncateText(product.name, maxNameLength)}</td>
            <td>
              {price && product.price ? `$${product.price.toFixed(2)}` : "N/A"}
            </td>
            <td>{product.id - 100}</td>
            {image && product.image_link && (
              <td>
                <img src={product.image_link} alt={product.name} width="50" />
              </td>
            )}
            <td>
              <button className="btnCreate">Create</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
