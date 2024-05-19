import { useDispatch, useSelector } from "react-redux";
import {
  addItemInInventory,
  deleteInventoryItem,
  filterItemsByCategory,
  getInventoryItems,
  updateInventoryItem,
} from "../../redux/actions";
import { useState, useEffect } from "react";
import { Modal } from "../../components";
import { formatToCurrency } from "../../utils";

export const Inventory = () => {
  const [inputItem, setInputItem] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [updatedItemId, setUpdatedItemId] = useState(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [soldingItem, setSoldingItem] = useState(null);

  const dispatch = useDispatch();
  const { inventoryItems, error, loading } = useSelector((state) => state);

  useEffect(() => {
    inventoryItems?.length <= 0 && dispatch(getInventoryItems());
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();

    if (
      inputItem.name &&
      inputItem.quantity &&
      inputItem.price &&
      inputItem.category
    ) {
      const item = {
        name: inputItem.name,
        quantity: Number(inputItem.quantity),
        price: Number(inputItem.price),
        category: inputItem.category,
      };
      dispatch(addItemInInventory(item));
      setInputItem({
        name: "",
        price: "",
        quantity: "",
        category: "",
      });
    } else {
      alert("Please fill all required data.");
    }
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteInventoryItem(id));
  };

  const handleEditItem = (e) => {
    e.preventDefault();
    const updatedItem = {
      name: inputItem.name,
      quantity: Number(inputItem.quantity),
      price: Number(inputItem.price),
      category: inputItem.category,
    };
    dispatch(updateInventoryItem(updatedItemId, updatedItem));
    clearEditItemData();
  };

  const setEditItemInInput = (item) => {
    setUpdatedItemId(item._id);
    const { name, price, quantity, category } = item;
    setInputItem({ name, price, quantity, category });
  };

  const clearEditItemData = () => {
    updatedItemId && setUpdatedItemId(null);
    setInputItem({
      name: "",
      price: "",
      quantity: "",
      category: "",
    });
  };

  const handleFilterByCategory = (category) => {
    setIsFilterApplied(true);
    dispatch(filterItemsByCategory(category));
  };

  const clearFilter = () => {
    setIsFilterApplied(false);
    dispatch(getInventoryItems());
  };

  return (
    <div className="main-container">
      <h3>{updatedItemId ? "Edit Item" : "Add New Item"}</h3>
      <div className="sub-container">
        <form className="form">
          <input
            type="text"
            placeholder="* Enter name"
            value={inputItem.name}
            onChange={(e) =>
              setInputItem((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="number"
            placeholder="* Enter quantity"
            value={inputItem.quantity}
            onChange={(e) =>
              setInputItem((prev) => ({ ...prev, quantity: e.target.value }))
            }
          />
          <input
            type="number"
            placeholder="* Enter price"
            value={inputItem.price}
            onChange={(e) =>
              setInputItem((prev) => ({ ...prev, price: e.target.value }))
            }
          />
          <select
            name="category"
            id="item-category"
            value={inputItem.category}
            onChange={(e) =>
              setInputItem((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="clothes">Clothes</option>
            <option value="shoes">Shoes</option>
            <option value="goggles">Goggles</option>
            <option value="perfume">Perfume</option>
          </select>
          <button onClick={updatedItemId ? handleEditItem : handleAddItem}>
            {updatedItemId ? "Edit Item" : "Add Item"}
          </button>
          {updatedItemId && (
            <button type="reset" onClick={clearEditItemData}>
              Clear
            </button>
          )}
        </form>
      </div>

      <h3>Invertory Items</h3>
      <div>
        <label htmlFor="filterCategory">
          <b>Filter item by category:</b>
        </label>
        <select
          name="category"
          id="item-category"
          onChange={(e) => handleFilterByCategory(e.target.value)}
          style={{ marginLeft: 20 }}
        >
          <option value="clothes">Clothes</option>
          <option value="shoes">Shoes</option>
          <option value="goggles">Goggles</option>
          <option value="perfume">Perfume</option>
        </select>
        {isFilterApplied && (
          <button style={{ marginLeft: 20 }} onClick={clearFilter}>
            Clear
          </button>
        )}
      </div>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{formatToCurrency(item.price)}</td>
              <td>{item.category}</td>
              <td>
                <button onClick={() => setEditItemInInput(item)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteItem(item._id)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => setSoldingItem(item)}>Buy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {soldingItem && (
        <Modal closeModal={() => setSoldingItem(null)} item={soldingItem} />
      )}
    </div>
  );
};
