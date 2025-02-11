import React, { useState } from "react";
import "./index.scss";

type ModalStockProps = {
  productId: number;
  onSave: (productId: number, quantity: number) => void;
};

const ModalStock: React.FC<ModalStockProps> = ({ productId, onSave }) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleSave = () => {
    if (quantity > 0) {
      onSave(productId, quantity);
    }
  };

  return (
    <div className="modal">
      <input
        type="number"
        placeholder="Ajouter la quantité"
        className="quantiter"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button className="valider" onClick={handleSave}>Valider</button>
    </div>
  );
};

export default ModalStock;
