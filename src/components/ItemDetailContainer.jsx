
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import ItemDetail from "./ItemDetail"; // Importar componente de presentación ItemDetail

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // 1. Referencia al documento 'id' en la colección 'products'
    const docRef = doc(db, "products", id);

    // 2. Obtener el documento
    getDoc(docRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                setItem({ id: docSnapshot.id, ...docSnapshot.data() });
            } else {
                console.log("No such document!");
                setItem(null);
            }
        })
        .catch((error) => console.error("Error al obtener detalle:", error))
        .finally(() => {
            setLoading(false);
        });

  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  
  if (!item) return <p>Producto no encontrado.</p>;

  return (
    <main>
      {/* Separación de responsabilidad: ItemDetail Container llama al Presentacional */}
      <ItemDetail item={item} />
    </main>
  );
};

export default ItemDetailContainer;