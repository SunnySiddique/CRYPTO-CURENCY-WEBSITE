import { Link } from "react-router-dom";
import arrowIcon from "../../assets/arrow_icon.png";
import logo from "../../assets/logo.png";
import { useCoinData } from "../../context/CoinContext";
import "./Navbar.css";

const Navbar = () => {
  const { setCurrency } = useCoinData();

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;

      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign up <img src={arrowIcon} alt="" />{" "}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
