"use client";

import Link from "next/link";
import React from "react";
import Logo from "../Shared/Logo/Logo";
import "./style.css";

import UserMenu from "./UserMenu";
import ResturantMenu from "./ResturantMenu";
import { useSession } from "next-auth/react";
import CommonMenu from "./CommonMenu";

// const mainMenuData = [
//     {
//         _id: 1,
//         name: "home",
//         href: "/",
//     },
//     {
//         _id: 2,
//         name: "foods",
//         href: "/food-items",
//     },
//     {
//         _id: 3,
//         name: "resturants",
//         href: "/all-resturants",
//     },
//     {
//         _id: 4,
//         name: "dashboard",
//         href: "/resturant/dashboard",
//     },
// ];
const Navbar = () => {
    // loggedin user data
    const { status, data } = useSession();

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
                        {!data?.user?.role && <CommonMenu />}
                        {data?.user?.role == "user" && <UserMenu />}
                        {data?.user?.role == "resturant" && <ResturantMenu />}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
