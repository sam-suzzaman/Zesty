import React from "react";
import "./style.css";

import { BsCurrencyDollar } from "react-icons/bs";

const DashboardServiceCard = ({ title, value, children }) => {
    return (
        <div className="dashboard-service-card">
            <div className="left">
                <p className="name">{title}</p>
                <p className="value">{value}</p>
            </div>
            <div className="right">{children}</div>
        </div>
    );
};

export default DashboardServiceCard;
