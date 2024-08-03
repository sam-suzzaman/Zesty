"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Logo from "../Shared/Logo/Logo";
import "./style.css";
import { usePathname } from "next/navigation";

import { MdOutlineShoppingCart } from "react-icons/md";
import CartList from "./CartList";

const mainMenuData = [
    {
        _id: 1,
        name: "home",
        href: "/",
    },
    {
        _id: 2,
        name: "foods",
        href: "/food-items",
    },
    {
        _id: 3,
        name: "resturants",
        href: "/all-resturants",
    },
    {
        _id: 4,
        name: "dashboard",
        href: "/resturant/dashboard",
    },
    {
        _id: 5,
        name: "login",
        href: "/auth",
    },
];
const Navbar = () => {
    const pathName = usePathname();
    const [showCart, setShowCart] = useState(false);
    const cartRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setShowCart(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cartRef]);
    return (
        <nav id="main-navbar">
            <div className="navbar-wrapper">
                <div className="navbar-container">
                    <div className="nav-left">
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>
                    <div className="nav-right">
                        <ul className="main-menu">
                            {mainMenuData?.map((item) => {
                                const isActive = pathName === item.href;
                                return (
                                    <Link
                                        key={item._id}
                                        href={item.href}
                                        className={`main-menu-link ${
                                            isActive && "active"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                            <li className="cart-item">
                                <MdOutlineShoppingCart
                                    className="icon"
                                    onClick={() => setShowCart(true)}
                                />
                                <span
                                    className="value"
                                    onClick={() => setShowCart(true)}
                                >
                                    0
                                </span>

                                {/* cart list */}
                                <CartList
                                    showCart={showCart}
                                    cartRef={cartRef}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
