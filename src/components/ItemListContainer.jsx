import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import ItemCard from "./ItemCard";

export default function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);     // nunca null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = new Promise((resolve) => {
      setTimeout(() => {
        let data = products;
        if (categoryId) {
          const cat = String(categoryId).toLowerCase();
          data = products.filter(
            (p) => String(p.category).toLowerCase() === cat
          );
        }
        resolve(data);
      }, 300);
    });

    fetchData.then((res) => {
      setItems(res);
      setLoading(false);
    });
  }, [categoryId]); 

  if (loading) return <p>Cargando...</p>;
  if (!items.length) return <p>No hay productos para esta categoría.</p>;

  return (
    <>
      <h2 style={{ margin: "1rem 0" }}>{greeting}</h2>
      <div className="grid">
        {items.map((it) => (
          <ItemCard key={it.id} item={it} />
        ))}
      </div>
    </>
  );
}