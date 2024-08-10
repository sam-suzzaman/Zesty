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
                const newFood = { ...action.data, quantity: 1 };
                const updatedCart = [...prevCart, newFood];

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

        case "CLEAR_CART":
            localStorage.setItem("zesty-cart", JSON.stringify([]));
            return { ...prevState, cart: [] };

        case "INCREASE_ITEM_QUANTITY":
            let updatedFoodQuantityCart = prevState.cart.map((food) => {
                if (food._id === action.ID) {
                    console.log("matched");
                    return { ...food, quantity: food.quantity + 1 };
                }
                return food;
            });

            localStorage.setItem(
                "zesty-cart",
                JSON.stringify(updatedFoodQuantityCart)
            );
            return { ...prevState, cart: updatedFoodQuantityCart };

        case "DECREASE_ITEM_QUANTITY":
            let cartOfNewQuantity = prevState.cart.map((food) => {
                if (food._id === action.ID) {
                    console.log("matched");
                    return { ...food, quantity: food.quantity - 1 };
                }
                return food;
            });

            localStorage.setItem(
                "zesty-cart",
                JSON.stringify(cartOfNewQuantity)
            );
            return { ...prevState, cart: cartOfNewQuantity };

        case "GET_TOTAL":
            let calculatedData = prevState.cart.reduce(
                (acc, food) => {
                    const { foodPrice, quantity } = food;

                    acc.totalQuantity = acc.totalQuantity + quantity;

                    const itemTotalPrice = quantity * foodPrice;
                    acc.subTotalPrice = acc.subTotalPrice + itemTotalPrice;

                    return acc;
                },
                {
                    totalQuantity: 0,
                    subTotalPrice: 0,
                }
            );

            let { totalQuantity, subTotalPrice } = calculatedData;

            // let tax=10%
            let tax = subTotalPrice * 0.1;
            let delivery_charge = subTotalPrice ? 50 : 0;
            let finalPrice = subTotalPrice + tax + delivery_charge;

            // converting
            subTotalPrice = parseFloat(subTotalPrice.toFixed(2));
            finalPrice = parseFloat(finalPrice.toFixed(2));

            return {
                ...prevState,
                totalQuantity,
                subTotalPrice,
                finalPrice,
            };

        default:
            return prevState;
    }
};

// exporting
export default reducerHandler;
