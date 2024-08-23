"use client";

import Loading from "@/components/Shared/Loading/Loading";
import { ORDER_STATUS } from "@/lib/Constants";
import dayjs from "dayjs";
import React from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MyOrderTable = ({ setIsShowModal, setDetailFoodId, orders }) => {
    // console.log(orders);
    const detailsBtnHandler = (id) => {
        setDetailFoodId(id);
        setIsShowModal(true);
    };

    const handleCancelOrder = async (id) => {
        console.log(id);
        const options = {
            method: "PATCH",
            body: JSON.stringify({ status: ORDER_STATUS.CANCELED }),
        };
        const response = await fetch(
            `http://localhost:3000/api/order/status/${id}`,
            options
        );
        const result = await response.json();
        if (result.status) {
            toast.success(`${result.result}`);
        } else {
            toast.error(`${result.result}`);
        }
    };

    // Conditional UI starts
    if (orders?.isLoading) {
        return (
            <div className="mt-6">
                <Loading />
            </div>
        );
    }

    if (orders.isError) {
        return (
            <h3 className="text-center font-medium text-red-700 text-2xl mt-6">
                {orders.error}
            </h3>
        );
    }

    return (
        <div className="user-order-table-container">
            <table className="user-order-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>date</th>
                        <th>total amount</th>
                        <th>status</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.data?.map((order) => (
                        <tr key={order._id}>
                            <td>{`#${order?._id}`}</td>
                            <td className="">
                                {dayjs(order?.createdAt).format(
                                    "DD-MM-YYYY, hh:mm a"
                                )}
                            </td>
                            <td>
                                <span className="value">
                                    {order?.totalPrice}
                                </span>
                                <span className="currency">Tk</span>
                            </td>
                            <td>
                                {order?.status == ORDER_STATUS.PENDING && (
                                    <span className="badge pending">
                                        {order?.status}
                                    </span>
                                )}
                                {/* {order?.status == ORDER_STATUS.CANCELED && (
                                    <span className="badge delivered">
                                        {order?.status}
                                    </span>
                                )} */}
                                {order?.status == ORDER_STATUS.CANCELED && (
                                    <span className="badge canceled">
                                        {order?.status}
                                    </span>
                                )}
                            </td>
                            <td>
                                <div className="action-row">
                                    <button
                                        className="view action-btn"
                                        onClick={() =>
                                            detailsBtnHandler(order?._id)
                                        }
                                    >
                                        <FaEye className="mr-1" /> details
                                    </button>
                                    {order?.status !==
                                        ORDER_STATUS.CANCELED && (
                                        <button
                                            className="delete action-btn"
                                            onClick={() =>
                                                handleCancelOrder(order._id)
                                            }
                                        >
                                            <MdDelete className="mr-1" /> cancel
                                            order
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOrderTable;
