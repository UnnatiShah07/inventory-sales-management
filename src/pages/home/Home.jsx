import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryItems, getSalesReport } from "../../redux/actions";
import { formatToCurrency } from "../../utils";

export const Home = () => {
  const [reportType, setReportType] = useState("inventory");
  const dispatch = useDispatch();
  const { salesReport, inventoryItems } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getSalesReport());
    dispatch(getInventoryItems());
  }, []);

  return (
    <div className="main-container">
      <select
        name="report-type"
        id="report-type"
        onChange={(e) => setReportType(e.target.value)}
        style={{ marginTop: "50px" }}
      >
        <option value="inventory">Inventory Report</option>
        <option value="sales">Sales Report</option>
      </select>
      {reportType === "inventory" ? (
        <>
          <h3>Invetory Report</h3>
          <table border={1} cellPadding={10}>
            <thead>
              <tr>
                <th>Item name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems?.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatToCurrency(item.price)}</td>
                  <td>{item.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h3>Sales Report</h3>
          <table border={1} cellPadding={10}>
            <thead>
              <tr>
                <th>Sold Item</th>
                <th>Total Quantity</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {salesReport?.map((item) => (
                <tr key={item.itemId}>
                  <td>{item.itemName}</td>
                  <td>{item.totalQuantity}</td>
                  <td>{formatToCurrency(item.totalRevenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
