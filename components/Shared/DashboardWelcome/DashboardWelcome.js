import React from "react";
import "./style.css";

const DashboardWelcome = ({ subtitle, title }) => {
    return (
        <div className="welcome-container">
            <div className="hero-row">
                <p className="title">
                    {subtitle} <span className="fancy-name">{title}</span>
                </p>
                <p className="info">Manage your dashboard and profile</p>
            </div>
        </div>
    );
};

export default DashboardWelcome;
