import Link from "next/link";
import React from "react";

import { MdDelete } from "react-icons/md";

const items = [
    {
        _id: 1,
        img: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "Margherita Pizza Margherita",
        price: "50.25",
    },
    {
        _id: 2,
        img: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "Margherita Pizza",
        price: "50.25",
    },
    {
        _id: 1,
        img: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "Margherita Pizza",
        price: "50.25",
    },
    {
        _id: 1,
        img: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "Margherita Pizza",
        price: "50.25",
    },
];

const CartList = ({ showCart, cartRef }) => {
    return (
        <div className={`cart-menu ${showCart && "show"}`} ref={cartRef}>
            <div className="top-row">
                <h6 className="title">your cart</h6>

                <div className="list">
                    {items?.map((item) => (
                        <li className="item" key={item._id}>
                            <img src={item.img} alt="thumb" className="left" />
                            <div className="center">
                                <h4 className="title">{item.title}</h4>
                                <p className="price">
                                    Price:
                                    <span className="fancy">{item.price}</span>
                                </p>
                            </div>
                            <button className="right">
                                <MdDelete className="icon" />
                            </button>
                        </li>
                    ))}
                </div>
            </div>
            <div className="bottom-row">
                <Link className="checkoutBtn" href="/">
                    checkout
                </Link>
            </div>
        </div>
    );
};

export default CartList;
