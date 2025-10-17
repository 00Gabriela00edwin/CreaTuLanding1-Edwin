import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart"; 
import CheckoutForm from "./components/CheckoutForm"; 
import { CartContextProvider } from "./context/CartContext"; 
import "./App.css";

function App() {
  return (
    <CartContextProvider> 
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer greeting="Catálogo completo" />} />
        <Route path="/category/:categoryId" element={<ItemListContainer greeting="Categorías" />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/checkout" element={<CheckoutForm />} /> 
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Página no encontrada</h2>} />
      </Routes>
    </CartContextProvider>
  );
}

export default App;