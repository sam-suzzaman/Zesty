"use client";
import React, { useEffect, useState } from "react";
import "./style.css";

import DashboardPageTitle from "@/components/Shared/DashboardPageTitle/DashboardPageTitle";

import Table from "./Table";
import Query from "./Query";
import Modal from "./Modal";
import Loading from "@/components/Shared/Loading/Loading";
import { useSession } from "next-auth/react";

const initial = {
    loading: true,
    isError: false,
    error: "",
    orders: null,
};

const ManageOrdersPage = () => {
    const { data: User, status } = useSession(); // logged in user info
    const [ordersData, setOrdersData] = useState(initial); // orders data
    const [isShowModal, setIsShowModal] = useState(false); // modal state
    const [query, setQuery] = useState({ search: "", filter: "" }); // search text and filter state
    const [orderId, setOrderId] = useState(""); // modal order ID
    const [modalOrder, setModalOrder] = useState(null);

    // all orders fetch handler
    const handleAllOrders = async (url) => {
        setOrdersData({
            ...ordersData,
            orders: null,
            isError: false,
            error: "",
        });

        const baseUrl = `http://localhost:3000/api/order/resturantOrders/${User?.user?._id}`;

        try {
            let URL = url || baseUrl;
            const response = await fetch(URL);
            const result = await response.json();

            if (result.status) {
                setOrdersData({
                    ...ordersData,
                    orders: result?.result,
                    loading: false,
                    isError: false,
                    error: "",
                });
            } else {
                setOrdersData({
                    ...ordersData,
                    orders: null,
                    loading: false,
                    isError: true,
                    error: result?.result,
                });
            }
        } catch (error) {
            console.log(error);
            setOrdersData({
                ...ordersData,
                loading: false,
                orders: null,
                isError: true,
                error: error?.message,
            });
        }
    };

    // find out order for modal
    useEffect(() => {
        const orderData = ordersData?.orders?.find(
            (order) => order?._id === orderId
        );
        setModalOrder(orderData);
    }, [orderId, ordersData?.orders]);

    // orders fetch
    useEffect(() => {
        let baseUrl = `http://localhost:3000/api/order/resturantOrders/${User?.user?._id}`;
        let url = baseUrl;

        if (query.filter && query.filter !== "all") {
            url = `${baseUrl}?filter=${query.filter}`;
        }

        // if (query.search && query.filter) {
        //     url = `${baseUrl}?search=${query.search}&filter=${query.filter}`;
        // } else if (query.search) {
        //     url = `${baseUrl}?search=${query.search}`;
        // } else if (query.filter) {
        //     url = `${baseUrl}?filter=${query.filter}`;
        // }

        User?.user?._id && handleAllOrders(url);
    }, [User?.user?._id, query]);

    // conditional render
    if (ordersData?.loading || status == "loading") {
        return (
            <div className="">
                <Loading />
            </div>
        );
    }
    return (
        <div className="res-order-page-warpper">
            <DashboardPageTitle
                title="manage orders"
                subtitle="Manage all of your resturant orders from here"
            />

            <Query query={query} setQuery={setQuery} />
            <Table
                setIsShowModal={setIsShowModal}
                setOrderId={setOrderId}
                orders={ordersData?.orders}
            />

            {isShowModal && (
                <Modal
                    setIsShowModal={setIsShowModal}
                    modalOrder={modalOrder}
                    refetchAllOrders={handleAllOrders}
                />
            )}
        </div>
    );
};

export default ManageOrdersPage;
