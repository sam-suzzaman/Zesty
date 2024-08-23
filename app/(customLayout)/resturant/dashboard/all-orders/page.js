import React from "react";
import "./style.css";

import DashboardPageTitle from "@/components/Shared/DashboardPageTitle/DashboardPageTitle";

import Table from "./Table";
import Query from "./Query";

const ManageOrdersPage = () => {
    return (
        <>
            <DashboardPageTitle
                title="manage orders"
                subtitle="Manage all of your resturant orders from here"
            />

            <Query />
            <Table />
        </>
    );
};

export default ManageOrdersPage;
