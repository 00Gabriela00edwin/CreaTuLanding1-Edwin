
import { Link } from "react-router-dom";
import bombillamessi from "../assets/messi.jpg";
import bombillaluna from "../assets/luna.jpg";
import bombillacorazon from "../assets/corazon.jpg";
import bombillapesca from "../assets/pesca.jpg";
import bombillaguitarra from "../assets/guitarra.jpg";
import bombillagato from "../assets/gato.jpg";

const IMAGE_MAP = {
    "bombilla messi": bombillamessi,
    "bombilla luna": bombillaluna,
    "bombilla corazon": bombillacorazon,
    "bombilla pesca": bombillapesca,
    "bombilla guitarra":bombillaguitarra,
    "bombilla gato": bombillagato,
  } 
    
function ItemCard({item}){
let itemNameKey = item.name.toLowerCase();
    const imageSrc = IMAGE_MAP[itemNameKey]; 
  return (
    <div className="card">
      <img className="item-image" src={imageSrc} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.material}</p>
      <p>${item.price}</p>
      <Link to={`/item/${item.id}`} className="item-button">Ver detalle</Link>
    </div>);
}
export default ItemCard;


