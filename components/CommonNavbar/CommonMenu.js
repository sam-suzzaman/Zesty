import React, { useEffect, useRef, useState } from "react";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { useCartContext } from "@/context/CartContext";
import { commonMenuOption, userMenuOption } from "@/lib/mainNavbarData";
import Link from "next/link";

import { MdOutlineShoppingCart } from "react-icons/md";
import CartList from "./CartList";

const CommonMenu = () => {
    const { state } = useCartContext();
    // loggedin user data
    const { status, data } = useSession();

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
        <ul className="main-menu">
            {commonMenuOption?.map((item) => {
                const isActive = pathName === item.href;
                return (
                    <Link
                        key={item._id}
                        href={item.href}
                        className={`main-menu-link ${isActive && "active"}`}
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
                <span className="value" onClick={() => setShowCart(true)}>
                    {state?.cart?.length || 0}
                </span>

                {/* cart list */}
                <CartList showCart={showCart} cartRef={cartRef} />
            </li>
            <li className="auth-btn-item">
                {data?.user ? (
                    <button
                        className="logout-btn auth-btn"
                        onClick={() => signOut()}
                    >
                        logout
                    </button>
                ) : (
                    <Link href="/auth" className="login-btn auth-btn">
                        login
                    </Link>
                )}
            </li>
        </ul>
    );
};

export default CommonMenu;
