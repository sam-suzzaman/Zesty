"use client";

import React from "react";
import { FaEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const MyOrderTable = () => {
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
                    <tr>
                        <td>#000s0e0r0sere</td>
                        <td className="">10-08-2024</td>
                        <td>
                            <span className="value">2000.03</span>
                            <span className="currency">Tk</span>
                        </td>
                        <td>
                            <span className="badge pending">pending</span>
                        </td>
                        <td>
                            <div className="action-row">
                                <button className="view action-btn">
                                    <FaEye className="mr-1" /> view
                                </button>
                                <button
                                    className="delete action-btn"
                                    onClick={() => handleDeleteFood(food._id)}
                                >
                                    <MdDelete className="mr-1" /> cancel order
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MyOrderTable;
