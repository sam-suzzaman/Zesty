import Link from "next/link";
import React from "react";

const EmtpyTableInfo = () => {
    return (
        <div className="empty-table">
            <h3 className="title">Empty cart</h3>
            <p className="info">
                Your cart is empty.Please add food item first.
            </p>
            <Link href="/" className="back-btn">
                back to shop
            </Link>
        </div>
    );
};

export default EmtpyTableInfo;
