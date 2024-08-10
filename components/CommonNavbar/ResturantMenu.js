import React from "react";

import { resturantMenuOptions } from "@/lib/mainNavbarData";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const ResturantMenu = () => {
    const pathName = usePathname();

    // loggedin user data
    const { status, data } = useSession();

    return (
        <ul className="main-menu">
            {resturantMenuOptions?.map((item) => {
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

export default ResturantMenu;
