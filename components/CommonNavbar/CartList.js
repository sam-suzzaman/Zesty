import { useCartContext } from "@/context/CartContext";
import Link from "next/link";
import React from "react";

import { MdDelete } from "react-icons/md";

const CartList = ({ showCart, cartRef }) => {
    const { state, handleRemoveItemFromCart } = useCartContext();

    return (
        <div className={`cart-menu ${showCart && "show"}`} ref={cartRef}>
            <div className="top-row">
                <h6 className="title">your cart: {state?.cart?.length || 0}</h6>

                <div className="list">
                    {state?.cart?.map((food) => (
                        <li className="item" key={food?._id}>
                            <img
                                src={food?.foodThumbnail}
                                alt="thumb"
                                className="left"
                            />
                            <div className="center">
                                <h4 className="title">{food?.foodTitle}</h4>
                                <p className="price">
                                    Price:
                                    <span className="fancy">
                                        {food?.foodPrice}
                                    </span>
                                </p>
                            </div>
                            <button
                                className="right"
                                onClick={() =>
                                    handleRemoveItemFromCart(food?._id)
                                }
                            >
                                <MdDelete className="icon" />
                            </button>
                        </li>
                    ))}
                </div>
            </div>
            <div className="bottom-row">
                <Link className="checkoutBtn" href="/cart">
                    checkout
                </Link>
            </div>
        </div>
    );
};

export default CartList;
