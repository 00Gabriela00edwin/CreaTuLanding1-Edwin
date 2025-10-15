import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";

const ItemDetail = ({ product, isAdded, onAdd }) => {
  return (
    <div className="item-detail">
      <h2>{product.name}</h2>
      <p>Material: {product.material}</p>
      <p>Descripción: {product.description || "Producto de alta calidad."}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock disponible: {product.stock}</p>

      {isAdded ? (
        <div className="after-add">
          <p>✅ Producto agregado con éxito.</p>
          <Link className="btn btn-primary" to="/cart">Ir al carrito</Link>
          <Link className="btn btn-secondary" to="/">Seguir comprando</Link>
        </div>
      ) : (
        <ItemCount stock={product.stock} initial={1} onAdd={onAdd} />
      )}
    </div>
  );
};

export default ItemDetail;
