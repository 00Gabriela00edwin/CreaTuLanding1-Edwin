import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <header>
      <nav>
        
        <Link to="/" className="logo">AYG Bombillas</Link> 

        <ul>
        
          <li><Link to="/category/alpaca">Alpaca</Link></li>
          <li><Link to="/category/bronce">Bronce</Link></li>
          <li><Link to="/category/cobre">Cobre</Link></li>
        </ul>
        <CartWidget /> 
      </nav>
    </header>
  );
};

export default NavBar;