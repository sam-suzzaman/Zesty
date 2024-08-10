import React from "react";
import "./style.css";

const DashboardPageTitle = ({ title, subtitle }) => {
    return (
        <div className="dashboard-page-title-row">
            <h3 className="dashboard-page-title">{title}</h3>
            <p className="dashboard-page-subtitle">{subtitle}</p>
        </div>
    );
};

export default DashboardPageTitle;
