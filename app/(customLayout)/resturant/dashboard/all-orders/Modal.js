import { ARRAY_OF_ORDER_STATUS, ORDER_STATUS } from "@/lib/Constants";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

const Modal = ({ setIsShowModal, modalOrder, refetchAllOrders }) => {
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        setSelectedStatus(modalOrder?.status);
    }, [modalOrder]);

    const orderStatusHandler = async (value) => {
        setSelectedStatus(value);
        const options = {
            method: "PATCH",
            body: JSON.stringify({
                status: value,
                resturantID: modalOrder?.resturant,
            }),
        };
        try {
            const response = await fetch(
                `http://localhost:3000/api/order/status/${modalOrder?._id}`,
                options
            );
            const result = await response.json();
            if (result.status) {
                toast.success(`${result.result}`);
                refetchAllOrders();
            } else {
                setSelectedStatus(modalOrder?.status);
                toast.error(`${result.result}`);
            }
        } catch (error) {
            setSelectedStatus(modalOrder?.status);
            toast.error(`Failed(${error.message})`);
        }
    };

    return (
        <div className="manage-order-modal">
            <div className="modal-card">
                <button
                    className="close-btn"
                    onClick={() => setIsShowModal(false)}
                >
                    <MdClose className="icon" />
                </button>
                <div className="modal-content">
                    <div className="info-row">
                        <div className="left">
                            <h4 className="title">basic info</h4>
                            <h6 className="id">
                                Order ID:
                                <span className="value">{`#${modalOrder?._id.slice(
                                    -6
                                )}`}</span>
                            </h6>
                            <h6 className="name">
                                Customar Name:
                                <span className="value capitalize">
                                    {modalOrder?.parentOrder?.customerName}
                                </span>
                            </h6>
                            <h6 className="contact">
                                Contact Number:
                                <span className="value">
                                    {modalOrder?.parentOrder?.contactNumber}
                                </span>
                            </h6>
                            <h6 className="name">
                                delivary address:
                                <span className="value">
                                    {modalOrder?.parentOrder?.delivaryAddress}
                                </span>
                            </h6>
                            <h6 className="name">
                                order status:
                                <span
                                    className={`ml-2 badge ${modalOrder?.status}`}
                                >
                                    {modalOrder?.status}
                                </span>
                            </h6>
                        </div>
                        <div className="right">
                            <label htmlFor="">change order status:</label>
                            <select
                                name=""
                                id=""
                                className="status-options"
                                onChange={(e) =>
                                    orderStatusHandler(e.target.value)
                                }
                                value={selectedStatus}
                            >
                                {ARRAY_OF_ORDER_STATUS.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* table */}
                    <div className="table-container-row all-order-table-row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>thumb</th>
                                    <th>food name</th>
                                    <th>quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modalOrder?.items?.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <div className="thumb-container">
                                                <img
                                                    src={
                                                        item?.food
                                                            ?.foodThumbnail
                                                    }
                                                    alt="food"
                                                    className="thumb"
                                                />
                                            </div>
                                        </td>
                                        <td className="medium Capitalize">
                                            {item?.food?.foodTitle}
                                        </td>
                                        <td className="center medium">
                                            {item?.quantity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
