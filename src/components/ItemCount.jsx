import { useState } from "react";

const ItemCount = ({ stock, initial }) => {
  const [count, setCount] = useState(initial);

  const incrementar = () => {
    if (count < stock) setCount(count + 1);
  };

  const decrementar = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div>
      <button onClick={decrementar}>-</button>
      <span style={{ margin: "0 10px" }}>{count}</span>
      <button onClick={incrementar}>+</button>
      <br />
      <button style={{ marginTop: "10px" }}>Agregar al carrito</button>
    </div>
  );
};

export default ItemCount;