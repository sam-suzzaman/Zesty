import { useCartContext } from "@/context/CartContext";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const CartTable = () => {
    const {
        state,
        handleRemoveItemFromCart,
        handleIncreaseItemQuantity,
        handleDecreaseItemQuantity,
    } = useCartContext();
    return (
        <table className="cart-table">
            <thead>
                <td>product details</td>
                <td>quantity</td>
                <td>price</td>
                <td>total</td>
                <td></td>
            </thead>
            <tbody>
                {state?.cart?.map((food) => (
                    <tr key={food._id}>
                        <td>
                            <div className="food-info">
                                <img
                                    src={food?.foodThumbnail}
                                    alt=""
                                    className="thumb"
                                />
                                <div className="col">
                                    <h3 className="title">{food?.foodTitle}</h3>
                                    <p className="quantity">
                                        quantity:
                                        <span className="fancy ml-1">
                                            {food?.quantity < 10
                                                ? `0${food?.quantity}`
                                                : food?.quantity}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </td>
                        {/* controllers */}
                        <td>
                            <div className="controllers">
                                <button
                                    className="control-btn"
                                    onClick={() =>
                                        handleDecreaseItemQuantity(food._id)
                                    }
                                    disabled={food?.quantity == 1 && true}
                                >
                                    <FaMinus className="icon" />
                                </button>
                                <span className="display">
                                    {food?.quantity}
                                </span>
                                <button
                                    className="control-btn"
                                    onClick={() =>
                                        handleIncreaseItemQuantity(food._id)
                                    }
                                    disabled={food?.quantity == 10 && true}
                                >
                                    <FaPlus className="icon" />
                                </button>
                            </div>
                        </td>
                        {/* per food price */}
                        <td>
                            <p className="price">
                                <span className="fancy">{food?.foodPrice}</span>
                                Tk
                            </p>
                        </td>
                        {/* item total price for n quantity */}
                        <td>
                            <p className="total">
                                <span className="fancy">
                                    {food?.quantity * food?.foodPrice}
                                </span>
                                Tk
                            </p>
                        </td>
                        <td>
                            <button
                                className="remove-btn"
                                onClick={() =>
                                    handleRemoveItemFromCart(food?._id)
                                }
                            >
                                <MdDelete className="remove-icon" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CartTable;
