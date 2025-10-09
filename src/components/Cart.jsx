import { useCartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, totalPrice, clear } = useCartContext();

  // Renderizado condicional: carrito vacío
  if (cart.length === 0) {
    return (
      <main style={{ textAlign: "center" }}>
        <h2>🛒 Carrito vacío</h2>
        <p>Parece que no has agregado nada aún.</p>
        <Link to="/" style={{ padding: "10px", backgroundColor: "#D4AF37", color: "black", textDecoration: "none", borderRadius: "5px" }}>
            Volver al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h2>Tu Carrito de Compras</h2>
      <div className="grid" style={{ gridTemplateColumns: "1fr", gap: "20px" }}>
        {cart.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <div style={{ marginTop: "30px", borderTop: "1px solid #C0C0C0", paddingTop: "20px" }}>
        <h3>Total de la compra: ${totalPrice().toFixed(2)}</h3>
        <button 
          onClick={clear}
          style={{ backgroundColor: '#B87333', color: 'white', marginRight: '15px' }}
        >
          Vaciar carrito
        </button>
        <Link to="/checkout" style={{ padding: "10px", backgroundColor: "#D4AF37", color: "black", textDecoration: "none", borderRadius: "5px" }}>
            Finalizar Compra
        </Link>
      </div>
    </main>
  );
};

export default Cart;