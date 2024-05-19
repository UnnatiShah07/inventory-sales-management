import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
  return (
    <div className="header">
      <Link className="link" to="/">
        Inventory/Sales Management
      </Link>
      <div className="links">
        <Link className="link" to="/inventory">
          Inventory
        </Link>
        <Link className="link" to="/sales">
          Sales
        </Link>
      </div>
    </div>
  );
};
