import Navbar from "@/components/CommonNavbar/Navbar";
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
