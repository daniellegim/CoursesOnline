import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()
const UpdateCartContext = createContext()

export const useCartContext = () => {
    return useContext(CartContext)
}

export const useCartFunctions = () => {
    return useContext(UpdateCartContext)
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (course) => {
        setCart([...cart, course])
    }

    const removeFromCart = (courseToRemove) => {
        setCart(prev => prev.filter(course => course._id !== courseToRemove._id))
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={cart}>
            <UpdateCartContext.Provider value={{ addToCart, removeFromCart, clearCart }}>
                {children}
            </UpdateCartContext.Provider>
        </CartContext.Provider>
    )
}