"use client";

import Link from "next/link";
import React from "react";
import Logo from "../Shared/Logo/Logo";
import "./style.css";
import { usePathname } from "next/navigation";

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
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
