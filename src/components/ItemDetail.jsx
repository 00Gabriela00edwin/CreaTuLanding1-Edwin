import { useState } from "react";
import ItemCount from "./ItemCount";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ItemDetail = ({ item }) => {
  const [isAdded, setIsAdded] = useState(false); // Estado para controlar si ya se agregó al carrito
  const { addItem } = useCartContext();

  // Función que se ejecuta al presionar "Agregar al carrito" en ItemCount
  const handleOnAdd = (quantity) => {
    setIsAdded(true);
    addItem(item, quantity); // Usar la función del Context
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{item.name}</h2>
      <p>Material: {item.material}</p>
      <p>Descripción: {item.description || "Producto de alta calidad."}</p>
      <p>Precio: ${item.price}</p>
      <p>Stock disponible: {item.stock}</p>
      
      {/* Renderizado condicional */}
      {isAdded ? (
        <div style={{ marginTop: '20px' }}>
            <p>✅ Producto agregado con éxito.</p>
            <Link to="/cart" style={{ margin: "0 10px", padding: "10px", backgroundColor: "#D4AF37", color: "black", textDecoration: "none", borderRadius: "5px" }}>
                Ir al carrito
            </Link>
            <Link to="/" style={{ padding: "10px", backgroundColor: "#C0C0C0", color: "black", textDecoration: "none", borderRadius: "5px" }}>
                Seguir comprando
            </Link>
        </div>
      ) : (
        <ItemCount 
          stock={item.stock} 
          initial={1} 
          onAdd={handleOnAdd} 
        />
      )}
    </div>
  );
};

export default ItemDetail;