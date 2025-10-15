
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartContext();
  const { id } = useParams();

  useEffect(() => {
    const ref = doc(db, "products", id);
    getDoc(ref).then((res) => {
      setProduct({ id: res.id, ...res.data() });
    });
  }, [id]);

  const handleOnAdd = (quantity) => {
    setIsAdded(true);
    addItem(product, quantity);
  };

  if (!product) return <p>Cargando producto...</p>;

  return <ItemDetail product={product} isAdded={isAdded} onAdd={handleOnAdd} />;
};

export default ItemDetailContainer;
