import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <header>
      <nav>
        {/* Enlace al catálogo completo */}
        <Link to="/" className="logo">AYG Bombillas</Link> 

        <ul>
          {/* Enlaces de categorías */}
          <li><Link to="/category/alpaca">Alpaca</Link></li>
          <li><Link to="/category/bronce">Bronce</Link></li>
          <li><Link to="/category/cobre">Cobre</Link></li>
        </ul>

        {/* Componente que usa el Context para mostrar la cantidad */}
        <CartWidget /> 
      </nav>
    </header>
  );
};

export default NavBar;