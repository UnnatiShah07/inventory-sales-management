import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTransction } from "../../redux/actions";
import "./modal.css";
import { INVENTORY } from "../../redux/actions.contants";

export const Modal = ({ closeModal, item }) => {
  const [quantityToBuy, setQuantityToBuy] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleAddTransction = () => {
    if (quantityToBuy < item.quantity) {
      error && setError("");
      const soldItem = {
        soldItem: item._id,
        itemQuantity: Number(quantityToBuy),
        itemPrice: item.price,
        totalRevenue: Number(item.price) * Number(quantityToBuy),
        transactionDate: new Date(),
      };
      dispatch(addTransction(soldItem));
      dispatch({
        type: INVENTORY.UPDATE_ITEM_SUCCESS,
        payload: {
          ...item,
          quantity: Number(item.quantity) - Number(quantityToBuy),
        },
      });
      closeModal();
    } else {
      setError("Quantity should be less than available quantity.");
    }
  };

  return (
    <div className="modal-background">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Add Transaction</h4>
          <h4 onClick={closeModal}>✖️</h4>
        </div>
        <p>
          <b>Item name:</b> {item.name}
        </p>
        <p>
          <b>Item price:</b> {item.price}
        </p>
        <p>
          <b>Available item quantity:</b> {item.quantity}
        </p>
        <b>
          <p>Enter quantity to buy: </p>
        </b>
        <input
          type="number"
          placeholder="Quantity"
          max={item.quantity}
          value={quantityToBuy}
          onChange={(e) => setQuantityToBuy(e.target.value)}
        />
        <p style={{ color: "red" }}>{error}</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={handleAddTransction}>Add</button>
        </div>
      </div>
    </div>
  );
};
