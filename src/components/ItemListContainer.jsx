import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import { db } from "../firebase/config"; // Importar la configuración de Firebase
import { collection, getDocs, query, where } from "firebase/firestore"; // Importar funciones de Firestore

export default function ItemListContainer({ greeting }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // 1. Referencia a la colección 'products' en Firestore
    const productsRef = collection(db, "products");

    // 2. Crear la consulta
    const q = categoryId 
        ? query(productsRef, where("category", "==", categoryId))
        : productsRef;

    // 3. Ejecutar la consulta
    getDocs(q)
        .then((snapshot) => {
            const productsDB = snapshot.docs.map((doc) => ({
                id: doc.id, // El ID de Firestore es importante
                ...doc.data(), // El resto de los datos
            }));
            setItems(productsDB);
        })
        .catch((error) => console.error("Error al cargar productos:", error))
        .finally(() => {
            setLoading(false);
        });

  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;
  
  // Renderizado condicional para "producto sin stock" o "sin productos para esta categoría"
  if (!items.length) return <p>No hay productos para esta categoría.</p>;

  return (
    <>
      <h2 style={{ margin: "1rem 0" }}>{greeting}</h2>
      {/* Separación de responsabilidad: ItemList Container llama al Presentacional */}
      <ItemList items={items} /> 
    </>
  );
}

// Componente Presentacional (ItemList)
const ItemList = ({ items }) => (
    <div className="grid">
        {items.map((it) => (
            <ItemCard key={it.id} item={it} />
        ))}
    </div>
);