import { Link } from "react-router-dom";
import bombillaBronce from "../assets/messibronce.jpg";
import bombillaLuna from "../assets/lunabronce.jpg";
import bombillaReel from "../assets/reelbronce.jpg";

const ItemCard = ({ item }) => {
  
  let imageSrc;
  switch (item.name) {
    case "Bombilla de bronce":
      imageSrc = <messibronce className="jpg">MESSI</messibronce>;
      break;
    case "Bombilla Luna":
      imageSrc = <lunabronce className="jpg">LUNA</lunabronce>;
      break;
    case "Bombilla Reel":
      imageSrc = <reelbronce className="jpg">REEL</reelbronce>;
      break;
   
  }

  return (
    <div className="card">
      <img className="item-image" src={imageSrc} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.material}</p>
      <p>${item.price}</p>
      <Link to={`/item/${item.id}`} className="item-button">Ver detalle</Link>
    </div>
  );
};

export default ItemCard;
