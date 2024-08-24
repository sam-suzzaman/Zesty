import React from "react";
import { SlActionRedo } from "react-icons/sl";
import { HiDotsVertical } from "react-icons/hi";

const Table = ({ setIsShowModal }) => {
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
                    <tr>
                        <td className="center">#66c7257b1bb</td>

                        <td>
                            <div className="customer">
                                <h3 className="name">samsuzzaman</h3>
                                <p className="contact">
                                    phone:
                                    <span className="value">01709765432</span>
                                </p>
                            </div>
                        </td>

                        <td className="center">
                            20/1 kalishangkarpur, kushtia
                        </td>
                        <td className="center">20-08-2024, 8:09 AM</td>
                        <td className="center medium">10</td>
                        <td className="center medium">500 TK</td>
                        <td>
                            <div className="action-row">
                                <span className="badge pending">pending</span>
                            </div>
                        </td>
                        <td>
                            <div className="action-row">
                                <button
                                    className="action-btn"
                                    onClick={() => setIsShowModal(true)}
                                >
                                    <SlActionRedo className="icon" />
                                    action
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
