import { useCartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeItem } = useCartContext();

  return (
    <div className="cart-item">
      <h4>{item.name}</h4>
      <p>Cantidad: {item.quantity}</p>
      <p>Precio unitario: ${item.price}</p>
      <p>Subtotal: ${item.price * item.quantity}</p>
      <button 
        onClick={() => removeItem(item.id)} 
        style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
      >
        ❌ Eliminar
      </button>
    </div>
  );
};

export default CartItem;