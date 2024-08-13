"use client";
import React, { useEffect, useState } from "react";
import "./style.css";

import { useCartContext } from "@/context/CartContext";
import Link from "next/link";
import CartTable from "./CartTable";
import EmtpyTableInfo from "./EmtpyTableInfo";

// const food = {
//     _id: 1,
//     foodTitle: "margarita pizza",
//     foodPrice: "19.25",
//     foodThumbnail:
//         "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
//     quantity: 1,
// };
const CartPage = () => {
    const { state } = useCartContext();
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const navbar = document.getElementById("main-navbar");
        if (navbar) {
            setNavbarHeight(navbar.offsetHeight);
        }
    }, []);

    return (
        <>
            <section
                className="cart-page-wrapper"
                style={{ minHeight: `calc(100vh - ${navbarHeight}px)` }}
            >
                <div className="cart-page-container">
                    <h4 className="page-title">my shoping cart</h4>
                    <div className="cart-card-container">
                        <div className="cart-left">
                            {state?.cart?.length ? (
                                <CartTable />
                            ) : (
                                <EmtpyTableInfo />
                            )}
                        </div>
                        <div className="cart-right">
                            <h4 className="title">total summery</h4>
                            <div className="cost-row">
                                <div className="sub-total">
                                    <p className="left">sub total</p>

                                    <p className="value">
                                        {state?.subTotalPrice}
                                        <span className="tk">tk</span>
                                    </p>
                                </div>
                                <div className="sub-total">
                                    <p className="left">delivery Charge</p>
                                    <p className="value">
                                        {state?.subTotalPrice ? 50 : 0}
                                        <span className="tk">tk</span>
                                    </p>
                                </div>
                                <div className="sub-total">
                                    <p className="left">tax(10%)</p>
                                    <p className="value">
                                        {parseFloat(
                                            (
                                                state?.subTotalPrice * 0.1
                                            ).toFixed(2)
                                        )}
                                        <span className="tk">tk</span>
                                    </p>
                                </div>
                                <div className="sub-total total">
                                    <p className="left">total</p>
                                    <p className="value">
                                        {state?.finalPrice}
                                        <span className="tk">tk</span>
                                    </p>
                                </div>
                            </div>
                            <div className="cart-btn-row">
                                <Link
                                    href="/order"
                                    className={`btn checkout ${
                                        state?.cart?.length == 0 && "disabled"
                                    }`}
                                >
                                    order now
                                </Link>
                                {state?.cart?.length ? (
                                    <Link href="/" className="btn shop">
                                        continue shopping
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CartPage;
