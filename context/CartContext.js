"use client";

import reducerHandler from "@/reducer/CartReducer";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

// initial
const initialState = {
    loading: false,
    cart: [],
    totalAmount: 0,
    totalPrice: 0,
};

const CartContextWrapper = ({ children }) => {
    // cart state
    const [state, dispatch] = useReducer(reducerHandler, initialState);

    // Fetching Cart data
    const fetchHandler = () => {
        dispatch({ type: "LOADING" });

        const cartData = localStorage.getItem("zesty-cart");
        const data = cartData ? JSON.parse(cartData) : [];

        dispatch({ type: "UPDATE_STATE_WITH_FETCH_DATA", fetchData: data });
    };
    useEffect(() => fetchHandler(), []);

    // Key Function Handlers -----------------------------------------------
    // 01.Add to cart
    const handleItemAddToCart = (item) => {
        dispatch({ type: "ADD_ITEM_IN_CART", data: item });
    };

    // 02.Remove item from cart
    const handleRemoveItemFromCart = (id) => {
        dispatch({ type: "REMOVE_ITEM_FROM_CART", ID: id });
    };

    // Passing Prop Object
    const value = { state, handleItemAddToCart, handleRemoveItemFromCart };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

// Creating context hook and exporting
export const useCartContext = () => useContext(CartContext);
export default CartContextWrapper;
