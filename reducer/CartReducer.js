import toast from "react-hot-toast";

const reducerHandler = (prevState, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...prevState, loading: true };

        case "UPDATE_STATE_WITH_FETCH_DATA":
            return { ...prevState, cart: action.fetchData, loading: false };

        case "ADD_ITEM_IN_CART":
            const prevCart = prevState.cart;
            let isItemAlreadyInCart = prevCart.find(
                (item) => item._id === action.data._id
            );

            if (isItemAlreadyInCart) {
                toast.error("Already in Cart");
                return prevState;
            } else {
                const updatedCart = [...prevCart, action.data];
                toast.success("Added to cart");
                localStorage.setItem("zesty-cart", JSON.stringify(updatedCart));
                return { ...prevState, cart: updatedCart };
            }

        case "REMOVE_ITEM_FROM_CART":
            const updatedCart = prevState.cart.filter(
                (food) => food._id !== action.ID
            );
            toast.success("Food removed");
            localStorage.setItem("zesty-cart", JSON.stringify(updatedCart));
            return { ...prevState, cart: updatedCart };

        // case "CLEAR_CART":
        //     return;

        // case "INCREASE_ITEM_QUANTITY":
        //     return;

        // case "DECREASE_ITEM_QUANTITY":
        //     return;

        // case "GET_TOTAL":
        //     return;

        default:
            return prevState;
    }
};

// exporting
export default reducerHandler;
