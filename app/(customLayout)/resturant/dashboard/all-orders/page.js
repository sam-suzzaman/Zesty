"use client";
import React, { useState } from "react";
import "./style.css";

import DashboardPageTitle from "@/components/Shared/DashboardPageTitle/DashboardPageTitle";

import Table from "./Table";
import Query from "./Query";
import Modal from "./Modal";

const ManageOrdersPage = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    return (
        <div className="res-order-page-warpper">
            <DashboardPageTitle
                title="manage orders"
                subtitle="Manage all of your resturant orders from here"
            />

            <Query />
            <Table setIsShowModal={setIsShowModal} />
            {isShowModal && <Modal setIsShowModal={setIsShowModal} />}
        </div>
    );
};

export default ManageOrdersPage;
