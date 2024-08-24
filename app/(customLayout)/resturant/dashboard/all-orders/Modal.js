import React from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ setIsShowModal }) => {
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
                                <span className="value">#09758432</span>
                            </h6>
                            <h6 className="name">
                                Customar Name:
                                <span className="value capitalize">
                                    md samsuzzaman
                                </span>
                            </h6>
                            <h6 className="contact">
                                Contact Number:
                                <span className="value">md samsuzzaman</span>
                            </h6>
                            <h6 className="name">
                                delivary address:
                                <span className="value">md samsuzzaman</span>
                            </h6>
                            <h6 className="name">
                                order status:
                                <span className="ml-2 badge pending">
                                    pending
                                </span>
                            </h6>
                        </div>
                        <div className="right">
                            <label htmlFor="">change order status:</label>
                            <select
                                name=""
                                id=""
                                className="status-options"
                                value="a"
                            >
                                <option value="a">pending</option>
                                <option value="b">success</option>
                                <option value="c">pending</option>
                                <option value="d">success</option>
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
                                <tr>
                                    <td>
                                        <div className="thumb-container">
                                            <img
                                                src="https://images.pexels.com/photos/26599586/pexels-photo-26599586/free-photo-of-vultures-perching-on-eroded-tree.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                                alt=""
                                                className="thumb"
                                            />
                                        </div>
                                    </td>
                                    <td className="medium Capitalize">
                                        chicken burger food
                                    </td>
                                    <td className="center medium">03</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="thumb-container">
                                            <img
                                                src="https://images.pexels.com/photos/26599586/pexels-photo-26599586/free-photo-of-vultures-perching-on-eroded-tree.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                                alt=""
                                                className="thumb"
                                            />
                                        </div>
                                    </td>
                                    <td className="medium Capitalize">
                                        chicken burger food
                                    </td>
                                    <td className="center medium">03</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
