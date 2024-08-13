"use client";

import DashboardPageTitle from "@/components/Shared/DashboardPageTitle/DashboardPageTitle";
import React, { useEffect, useState } from "react";
import MyOrderTable from "./Table";
import "./style.css";
import OrderModal from "./OrderModal";
import { useSession } from "next-auth/react";

const MyOrdersPage = () => {
    const { data: UserData } = useSession();

    const [isShowModal, setIsShowModal] = useState(false);
    const [detailFoodId, setDetailFoodId] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState({
        isLoading: true,
        data: null,
        isError: false,
        error: "",
    });

    // fetch user's full order history list
    useEffect(() => {
        setOrders({ ...orders, isLoading: true, isError: false, error: "" });
        const handler = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/order/${UserData?.user?._id}`
                );
                const result = await response.json();

                if (result.status) {
                    setOrders({
                        ...orders,
                        isLoading: false,
                        data: result.result,
                    });
                } else {
                    setOrders({
                        ...orders,
                        isLoading: false,
                        data: null,
                        isError: true,
                        error: result.result,
                    });
                }
            } catch (error) {
                setOrders({
                    isLoading: false,
                    data: null,
                    isError: true,
                    error: result.message,
                });
            }
        };
        UserData?.user?._id && handler();
    }, [UserData?.user?._id]);

    // find selected order
    useEffect(() => {
        if (detailFoodId) {
            const order = orders?.data?.find(
                (order) => order._id == detailFoodId
            );
            order?._id ? setSelectedOrder(order) : setSelectedOrder(null);
        }
    }, [detailFoodId]);

    return (
        <div className="user-order-page-wrapper">
            <DashboardPageTitle
                title="order history"
                subtitle="Manage your previous orders as you need"
            />

            <MyOrderTable
                setIsShowModal={setIsShowModal}
                setDetailFoodId={setDetailFoodId}
                orders={orders}
            />

            {isShowModal && (
                <OrderModal
                    setIsShowModal={setIsShowModal}
                    selectedOrder={selectedOrder}
                />
            )}
        </div>
    );
};

export default MyOrdersPage;
