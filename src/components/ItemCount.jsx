

import { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const incrementar = () => {
    // Validación: No superar el stock
    if (count < stock) setCount(count + 1);
  };

  const decrementar = () => {
    // Validación: Mínimo 1 unidad
    if (count > 1) setCount(count - 1);
  };

  return (
    <div>
      <button onClick={decrementar} disabled={count === 1}>-</button>
      <span style={{ margin: "0 10px" }}>{count}</span>
      <button onClick={incrementar} disabled={count === stock}>+</button>
      <br />
      {/* Llamar a onAdd con la cantidad seleccionada */}
      <button 
        style={{ marginTop: "10px" }} 
        onClick={() => onAdd(count)}
        disabled={stock === 0} // Deshabilitar si no hay stock
      >
        Agregar al carrito ({count})
      </button>
      {stock === 0 && <p style={{ color: 'red' }}>Sin stock</p>}
    </div>
  );
};

export default ItemCount;