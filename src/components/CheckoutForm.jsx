import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";

const CheckoutForm = () => {
    const { cart, totalPrice, clear } = useCartContext();
    const [buyer, setBuyer] = useState({ name: "", phone: "", email: "" });
    const [orderId, setOrderId] = useState(null);
    const [loading, setLoading] = useState(false);
     const navigate = useNavigate ();
    const handleChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const order = {
            buyer,
            items: cart.map(item => ({ 
                id: item.id, 
                name: item.name, 
                price: item.price, 
                quantity: item.quantity 
            })),
            total: totalPrice(),
            date: serverTimestamp(),
        };

        try {
            
            const ordersRef = collection(db, "orders");
            const docRef = await addDoc(ordersRef, order);
            setOrderId(docRef.id);

    
            const updateStockPromises = cart.map(item => {
                const itemRef = doc(db, "products", item.id);
                
                return updateDoc(itemRef, { stock: item.stock - item.quantity });
            });
            await Promise.all(updateStockPromises);


            clear();

        } catch (error) {
            console.error("Error al generar la orden:", error);
            alert("Hubo un error al procesar la compra.");
        } finally {
            setLoading(false);
        }
    };

    if (orderId) {
        return (
            <main style={{ textAlign: "center" }}>
                <h2>🎉 ¡Compra finalizada con éxito!</h2>
                <p>Gracias por tu compra, **{buyer.name}**.</p>
                <p>Tu **ID de Orden** es: **{orderId}**</p>
                <Link to="/" style={{ padding: "10px", backgroundColor: "#D4AF37", color: "black", textDecoration: "none", borderRadius: "5px" }}>
                    Volver al inicio
                </Link>
            </main>
        );
    }
    
    if (loading) return <main><p>Procesando compra...</p></main>;
    if (cart.length === 0) return <main><p>Tu carrito está vacío, no puedes finalizar la compra.</p><Link to="/">Volver</Link></main>;

    return (
        <main>
            <h2>Finalizar Compra</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre completo"
                    value={buyer.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="phone"
                    name="phone"
                    placeholder="Teléfono"
                    value={buyer.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={buyer.email}
                    onChange={handleChange}
                    required
                />
                <p style={{ marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>Total a pagar: ${totalPrice().toFixed(2)}</p>
                <button type="submit" style={{ backgroundColor: '#D4AF37', color: 'black' }}>
                    Confirmar Compra
                </button>
            </form>
        </main>
    );
};

export default CheckoutForm;