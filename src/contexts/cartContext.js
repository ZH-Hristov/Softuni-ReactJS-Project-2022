import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CartContext = createContext()

export const CartProvider = ({
    children,
}) => {

    const [cart, setCart] = useLocalStorage('cart', {})
    const [cartPrice, setCartPrice] = useState(0)

    useEffect(() => {
        let sum = 0
        for (const cartItem in cart) {
            sum += Number(cart[cartItem]['product-price'])
        }
        setCartPrice(sum)
    }, [cart])

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
        <CartContext.Provider value={{ cartItems: cart, cartPrice, addCartItem, removeCartItem, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}