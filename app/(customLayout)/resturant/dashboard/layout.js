"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import "./style.css";
import "./sidebar.style.css";
import "./content.style.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { IoIosArrowBack, IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { SiReaddotcv } from "react-icons/si";

import Logo from "@/components/Shared/Logo/Logo";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const navData = [
    {
        _id: 1,
        name: "home",
        href: "/resturant/dashboard",
        icon: <MdDashboardCustomize className="icon" />,
    },
    {
        _id: 2,
        name: "profile",
        href: "/resturant/dashboard/profile",
        icon: <FaUserLarge className="icon" />,
    },
    {
        _id: 3,
        name: "add food",
        href: "/resturant/dashboard/add-food",
        icon: <MdOutlineAddPhotoAlternate className="icon" />,
    },
    {
        _id: 4,
        name: "manage foods",
        href: "/resturant/dashboard/all-food",
        icon: <SiReaddotcv className="icon" />,
    },
];

export default function DashboardLayout({ children }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const { status, data } = useSession();
    console.log(data);
    const pathName = usePathname();

    return (
        <section className="resturent-d-wrapper">
            <aside
                className={`resturent-d-left-sidebar ${
                    showSidebar && "show-sidebar"
                }`}
            >
                <div className="sidebar-container">
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="resturent-sidebar-close-btn"
                    >
                        <IoIosArrowBack />
                    </button>
                    <div className="top-row">
                        <div className="avatar-row">
                            <CgProfile className="avatar" />
                            <h3 className="username">{data?.user?.name}</h3>
                            <h6 className="role">{data?.user?.role}</h6>
                        </div>

                        <ul className="sidebar-menu">
                            {navData?.map((item) => {
                                const isActive = pathName === item.href;
                                return (
                                    <li key={item._id}>
                                        <Link
                                            href={item.href}
                                            className={`menu-link ${
                                                isActive && "active"
                                            }`}
                                        >
                                            {item.icon}
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="logout-row">
                        <button
                            className="resturent-d-logout-btn"
                            onClick={() => signOut()}
                        >
                            <IoIosLogOut className="icon" /> logout
                        </button>
                    </div>
                </div>
            </aside>
            <main
                className={`resturent-d-right-main ${
                    showSidebar && "rmv-left"
                }`}
            >
                <div className="resturent-d-right-container">
                    <nav className="resturent-d-navbar">
                        <div className="left">
                            <button
                                className="sidebar-toggler"
                                onClick={() => setShowSidebar(!showSidebar)}
                            >
                                <GiHamburgerMenu />
                            </button>
                        </div>
                        <div className="center">
                            <Logo />
                        </div>
                        <div className="right">
                            <Link href="/" className="home-btn">
                                <IoHome className="icon" /> home
                            </Link>
                        </div>
                    </nav>

                    <div className="resturent-d-content-row">{children}</div>
                </div>
            </main>
        </section>
    );
}

// const temp = (
//     <section className="resturent-d-wrapper">
//         <aside
//             className={`resturent-d-left-sidebar ${
//                 showSidebar && "show-sidebar"
//             }`}
//         >
//             <div className="sidebar-container">
//                 <button
//                     onClick={() => setShowSidebar(!showSidebar)}
//                     className="resturent-sidebar-close-btn"
//                 >
//                     <IoIosArrowBack />
//                 </button>
//                 <div className="top-row">
//                     <div className="avatar-row">
//                         <CgProfile className="avatar" />
//                         <h3 className="username">samsuzzaman sajib</h3>
//                         <h6 className="role">resturant owner</h6>
//                     </div>

//                     <ul className="sidebar-menu">
//                         {navData?.map((item) => {
//                             const isActive = pathName === item.href;
//                             return (
//                                 <li key={item._id}>
//                                     <Link
//                                         href={item.href}
//                                         className={`menu-link ${
//                                             isActive && "active"
//                                         }`}
//                                     >
//                                         {item.icon}
//                                         {item.name}
//                                     </Link>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 </div>

//                 <div className="logout-row">
//                     <button
//                         className="resturent-d-logout-btn"
//                         onClick={handleLogout}
//                     >
//                         <IoIosLogOut className="icon" /> logout
//                     </button>
//                 </div>
//             </div>
//         </aside>
//         <main className="resturent-d-right-main">
//             <div className="resturent-d-right-container">
//                 <nav className="resturent-d-navbar">
//                     <div className="left">
//                         <button
//                             className="sidebar-toggler"
//                             onClick={() => setShowSidebar(!showSidebar)}
//                         >
//                             <GiHamburgerMenu />
//                         </button>
//                     </div>
//                     <div className="center">
//                         <Logo />
//                     </div>
//                     <div className="right">
//                         <Link href="/" className="home-btn">
//                             <IoHome className="icon" /> home
//                         </Link>
//                     </div>
//                 </nav>

//                 <div className="resturent-d-content-row">{children}</div>
//             </div>
//         </main>
//     </section>
// );
