import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext"; // Importar hook del Context

const CartWidget = () => {
  const { totalQuantity } = useCartContext(); // Obtener la función para la cantidad
  const total = totalQuantity(); // Calcular el total

  // Renderizado condicional: Solo se muestra si hay items
  if (total === 0) return null;

  return (
    // Enlace al carrito
    <Link to="/cart" className="cart">
      🛒 {total}
    </Link>
  );
};

export default CartWidget;
