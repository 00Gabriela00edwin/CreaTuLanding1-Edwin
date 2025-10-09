import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import { db } from "../firebase/config"; 
import { collection, getDocs, query, where } from "firebase/firestore"; 

// ----------------------------------------------------------------------
// COMPONENTE CONTENEDOR (ItemListContainer)
// Maneja el estado (loading, items) y la lógica de la base de datos (Firestore)
// ----------------------------------------------------------------------

export default function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // 1. Referencia a la colección 'products' en Firestore
    const productsRef = collection(db, "products");

    // 2. Crear la consulta: si existe categoryId, filtra, si no, trae todos.
    const q = categoryId 
        ? query(productsRef, where("category", "==", categoryId))
        : productsRef;

    // 3. Ejecutar la consulta
    getDocs(q)
        .then((snapshot) => {
            // Mapear los documentos para incluir el id de Firestore
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

  // Renderizado condicional: Loader
  if (loading) return <p>Cargando productos...</p>;
  
  // Renderizado condicional: No hay productos
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