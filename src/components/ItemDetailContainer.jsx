import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import ItemCount from "./ItemCount";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.find((prod) => prod.id === parseInt(id)));
      }, 500);
    });

    fetchData.then((res) => setItem(res));
  }, [id]);

  if (!item) return <p>Cargando...</p>;

  return (
    <main>
      <h2>{item.name}</h2>
      <p>Material: {item.material}</p>
      <p>Precio: ${item.price}</p>
      <ItemCount stock={5} initial={1} />
    </main>
  );
};

export default ItemDetailContainer;