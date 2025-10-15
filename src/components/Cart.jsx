import { useCartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, totalPrice, clear } = useCartContext();

  if (cart.length === 0) {
    return (
      <main className="empty-cart">
        <h2>🛒 Carrito vacío</h2>
        <p>Parece que no has agregado nada aún.</p>
        <Link className="btn btn-gold" to="/">Volver al catálogo</Link>
      </main>
    );
  }

  const total = totalPrice()
    ? Number(totalPrice()).toFixed(2)
    : "0.00";

  return (
    <main className="cart">
      <h2>Tu Carrito de Compras</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total de la compra: ${total}</h3>
        <button onClick={clear} className="btn btn-bronze">
          Vaciar carrito
        </button>
        <Link className="btn btn-gold" to="/checkout">
          Finalizar Compra
        </Link>
      </div>
    </main>
  );
};

export default Cart;
