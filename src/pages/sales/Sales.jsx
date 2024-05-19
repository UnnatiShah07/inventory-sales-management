import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTransactionByDate,
  getAllTransations,
} from "../../redux/actions";
import { formatDate, formatToCurrency } from "../../utils";

export const Sales = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const dispatch = useDispatch();
  const { transactions, error, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllTransations());
  }, []);

  const handleFilter = () => {
    if (startDate && endDate) {
      setIsFilterApplied(true);
      const dates = {
        start: startDate,
        end: endDate,
      };
      dispatch(filterTransactionByDate(dates));
    } else {
      alert("Select dates.");
    }
  };

  const clearFilter = () => {
    setIsFilterApplied(false);
    setStartDate("");
    setEndDate("");
    dispatch(getAllTransations());
  };

  return (
    <div className="main-container">
      <h3>Transactions</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h4>Select date range:</h4>
        <p>
          Start date:{" "}
          <input
            type="date"
            name="start-date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </p>
        <p>
          End date:{" "}
          <input
            type="date"
            name="end-date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </p>
        <div>
          <button style={{ marginRight: "10px" }} onClick={handleFilter}>
            Apply
          </button>
          {isFilterApplied && <button onClick={clearFilter}>Clear</button>}
        </div>
      </div>
      {transactions?.length > 0 ? (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>No</th>
              <th>Sold Item</th>
              <th>Sold Item Category</th>
              <th>Sold Quantity</th>
              <th>Total Revenue</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.soldItem.name}</td>
                  <td>{item.soldItem.category}</td>
                  <td>{item.itemQuantity}</td>
                  <td>{formatToCurrency(item.totalRevenue)}</td>
                  <td>{formatDate(new Date(item.transactionDate))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h4>No transcation between these dates.</h4>
      )}
    </div>
  );
};
