import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext"; 

const CartWidget = () => {
  const { totalQuantity } = useCartContext();
  const total = totalQuantity(); 

  if (total === 0) return null;

  return (
    
    <Link to="/cart" className="cart">
      🛒 {total}
    </Link>
  );
};

export default CartWidget;