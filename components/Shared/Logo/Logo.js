import Link from "next/link";
import React from "react";

import "./style.css";

const Logo = () => {
    return (
        <Link href="/" className="brand">
            <span className="fancy">z</span>esty
        </Link>
    );
};

export default Logo;
