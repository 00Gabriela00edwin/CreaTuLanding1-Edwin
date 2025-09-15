import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="card">
      <h3>{item.name}</h3>
      <p>{item.material}</p>
      <p>${item.price}</p>
      <Link to={`/item/${item.id}`}>Ver detalle</Link>
    </div>
  );
};

export default ItemCard;