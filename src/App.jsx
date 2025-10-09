import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart"; // Nuevo componente
import CheckoutForm from "./components/CheckoutForm"; // Nuevo componente
import { CartContextProvider } from "./context/CartContext"; // Importar Context Provider
import "./App.css";

function App() {
  return (
    <CartContextProvider> {/* Envolver toda la aplicación */}
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greeting="Catálogo completo" />} />
        {/* Usamos el mismo componente para las categorías, aprovechando la URL dinámica */}
        <Route path="/category/:categoryId" element={<ItemListContainer greeting="Categorías" />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} /> {/* Nueva ruta para el carrito */}
        <Route path="/checkout" element={<CheckoutForm />} /> {/* Nueva ruta para el checkout */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Página no encontrada</h2>} />
      </Routes>
    </CartContextProvider>
  );
}

export default App;