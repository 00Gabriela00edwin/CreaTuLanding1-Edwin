import { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
export const CartContext = createContext();

// Hook personalizado para usar el contexto de forma más simple
export const useCartContext = () => useContext(CartContext);

// 2. Crear el Componente Proveedor (Provider)
export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Función para agregar un item al carrito
    const addItem = (item, quantity) => {
        // Clonar el producto, añadir la cantidad, y crear un ID único para el carrito (por si se agrega el mismo item varias veces)
        const itemToAdd = { ...item, quantity };
        
        // Verificar si el producto ya está en el carrito
        const index = cart.findIndex(prod => prod.id === item.id);

        if (index > -1) {
            // Si existe, actualizar la cantidad
            const newCart = [...cart];
            newCart[index].quantity += quantity;
            setCart(newCart);
        } else {
            // Si no existe, agregarlo
            setCart([...cart, itemToAdd]);
        }
    };

    // Función para remover un item por su ID
    const removeItem = (id) => {
        setCart(cart.filter(prod => prod.id !== id));
    };

    // Función para vaciar el carrito
    const clear = () => {
        setCart([]);
    };

    // Función para verificar si un item ya está en el carrito
    const isInCart = (id) => {
        return cart.some(prod => prod.id === id);
    };

    // Función para calcular el total de unidades en el carrito
    const totalQuantity = () => {
        return cart.reduce((acc, prod) => acc + prod.quantity, 0);
    };

    // Función para calcular el precio total de la compra
    const totalPrice = () => {
        return cart.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
    };

    // Objeto de valor del contexto
    const contextValue = {
        cart,
        addItem,
        removeItem,
        clear,
        isInCart,
        totalQuantity,
        totalPrice,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};