import Navbar from "@/components/CommonNavbar/Navbar";
import { useSession } from "next-auth/react";
import React from "react";

const layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default layout;
