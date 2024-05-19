import { Link } from "react-router-dom";
import "./header.css";
import { SiReplit, SiGithub } from "react-icons/si";

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
        <a href="https://github.com/UnnatiShah07/inventory-sales-management" target="_blank" rel="noreferrer" className="code-link">
          <SiGithub />
        </a>
        <a href="https://replit.com/@UnnatiShah07/Assignment-18-Inventory-Sales" target="_blank" rel="noreferrer" className="code-link">
          <SiReplit />
        </a>
      </div>
    </div>
  );
};
