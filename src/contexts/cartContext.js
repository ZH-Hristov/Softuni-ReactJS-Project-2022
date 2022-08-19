import { createContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CartContext = createContext()

export const CartProvider = ({
    children,
}) => {

    const [cart, setCart] = useLocalStorage('cart', {})

    const addCartItem = (itemData) => {
        setCart({ ...cart, [itemData._id]: itemData })
    }

    const removeCartItem = (itemID) => {
        const newItems = { ...cart }
        delete newItems[itemID]
        setCart(newItems)
    }

    const clearCart = () => {
        setCart({})
    }

    return (
        <CartContext.Provider value={{ cartItems: cart, addCartItem, removeCartItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}