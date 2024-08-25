import React from "react";
import { SlActionRedo } from "react-icons/sl";
import dayjs from "dayjs";

const Table = ({ setIsShowModal, setOrderId, orders }) => {
    const handleActionBtn = (id) => {
        setOrderId(id);
        setIsShowModal(true);
    };
    // empty order list ui
    if (!orders) {
        return (
            <div className="table-container-row all-order-table-row">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>customer</th>
                            <th>address</th>
                            <th>date</th>
                            <th>quantity</th>
                            <th>price</th>
                            <th>status</th>
                            <th>action</th>
                        </tr>
                    </thead>
                </table>
                <p className="text-center capitalize text-xl text-red-600 py-4 w-full">
                    Opps!!! no order found
                </p>
            </div>
        );
    }
    return (
        <div className="table-container-row all-order-table-row">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>customer</th>
                        <th>address</th>
                        <th>date</th>
                        <th>quantity</th>
                        <th>price</th>
                        <th>status</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order) => (
                        <tr key={order?._id}>
                            <td className="center">{`#${order?._id.slice(
                                -6
                            )}`}</td>

                            <td>
                                <div className="customer">
                                    <h3 className="name">
                                        {order?.parentOrder?.customerName}
                                    </h3>
                                    <p className="contact">
                                        phone:
                                        <span className="value">
                                            {order?.parentOrder?.contactNumber}
                                        </span>
                                    </p>
                                </div>
                            </td>

                            <td className="center">
                                {order?.parentOrder?.delivaryAddress}
                            </td>
                            <td className="center">
                                {dayjs(order?.createdAt).format(
                                    "DD-MMM-YYYY, hh:mm a"
                                )}
                            </td>
                            <td className="center medium">
                                {order?.orderQuantity}
                            </td>
                            <td className="center medium">
                                {order?.totalPrice} TK
                            </td>
                            <td>
                                <div className="action-row">
                                    <span className={`badge ${order?.status}`}>
                                        {order?.status}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className="action-row">
                                    <button
                                        className="action-btn"
                                        onClick={() =>
                                            handleActionBtn(order?._id)
                                        }
                                    >
                                        <SlActionRedo className="icon" />
                                        action
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
