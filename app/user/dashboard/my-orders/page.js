import DashboardPageTitle from "@/components/Shared/DashboardPageTitle/DashboardPageTitle";
import React from "react";
import MyOrderTable from "./Table";
import "./style.css";

const MyOrdersPage = () => {
    return (
        <div className="user-order-page-wrapper">
            <DashboardPageTitle
                title="order history"
                subtitle="Manage your previous orders as you need"
            />
            <MyOrderTable />
        </div>
    );
};

export default MyOrdersPage;
