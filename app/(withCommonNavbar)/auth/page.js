"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./style.css";

import { RiAdminLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";

const page = () => {
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const navbar = document.getElementById("main-navbar");
        if (navbar) {
            setNavbarHeight(navbar.offsetHeight);
        }
    }, []);
    return (
        <section
            className="auth-page"
            style={{ minHeight: `calc(100vh - ${navbarHeight}px)` }}
        >
            <h3 className="page-title">Login as</h3>
            <div className="auth-type-row">
                <Link href="/" className="auth-type">
                    <FaUserShield className="icon" />
                    <h5 className="name"> admin</h5>
                </Link>
                <Link href="/resturant/auth" className="auth-type">
                    <RiAdminLine className="icon" />
                    <h5 className="name"> resturant</h5>
                </Link>
                <Link href="/user/auth" className="auth-type">
                    <FaRegUser className="icon" />
                    <h5 className="name"> user</h5>
                </Link>
            </div>
        </section>
    );
};

export default page;
