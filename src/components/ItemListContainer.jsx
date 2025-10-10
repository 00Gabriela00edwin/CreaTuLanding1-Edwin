import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import { db } from "../firebase/config"; 
import { collection, getDocs, query, where } from "firebase/firestore"; 

export default function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
   
    const productsRef = collection(db, "products");

    const q = categoryId 
        ? query(productsRef, where("category", "==", categoryId))
        : productsRef;

    getDocs(q)
        .then((snapshot) => {
            
            const productsDB = snapshot.docs.map((doc) => ({
                id: doc.id, 
                ...doc.data(), 
            }));
            setItems(productsDB);
        })
        .catch((error) => console.error("Error al cargar productos:", error))
        .finally(() => {
            setLoading(false);
        });

  }, [categoryId]);

  
  if (loading) return <p>Cargando productos...</p>;
  
  
  if (!items.length) return <p>No hay productos para esta categoría.</p>;

  return (
    <>
      <h2 style={{ margin: "1rem 0" }}>{greeting}</h2>
      {/* Llama al componente presentacional, pasándole los items */}
      <ItemList items={items} /> 
    </>
  );
}



const ItemList = ({ items }) => (
    <div className="grid">
        {items.map((it) => (
        
            <ItemCard key={it.id} item={it} />
        ))}
    </div>
);