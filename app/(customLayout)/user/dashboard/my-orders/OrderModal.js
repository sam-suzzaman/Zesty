import React from "react";
import { MdClose } from "react-icons/md";

const OrderModal = ({ setIsShowModal, selectedOrder }) => {
    return (
        <div className="order-modal-container">
            <div className="modal-card">
                <button
                    className="close-btn"
                    onClick={() => setIsShowModal(false)}
                >
                    <MdClose className="icon" />
                </button>

                <h3 className="order-modal-title">
                    Order Number: #{selectedOrder?._id}
                </h3>
                {/* body */}
                <div className="card-body">
                    <table className="card-order-table">
                        <thead>
                            <td>product details</td>
                            <td>quantity</td>
                            <td>price</td>
                            <td>total</td>
                        </thead>
                        <tbody>
                            {selectedOrder?.items?.map((item, i) => (
                                <tr key={item?.price * item?.quantity * i}>
                                    <td>
                                        <div className="food-info">
                                            <img
                                                src={item?.food?.foodThumbnail}
                                                alt=""
                                                className="thumb"
                                            />
                                            <h3 className="title">
                                                {item?.food?.foodTitle}
                                            </h3>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="display">
                                            {item?.quantity}
                                        </span>
                                    </td>
                                    <td>
                                        {/* {food?.foodPrice} */}
                                        {item?.price}
                                        <span className="taka">Tk</span>
                                    </td>
                                    <td>
                                        {/* {food?.quantity * food?.foodPrice} */}
                                        {item?.quantity * item?.price}
                                        <span className="taka">Tk</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3">
                                    total price
                                    <span className="taka">
                                        (include vat and shipping cost)
                                    </span>
                                </td>
                                <td className="value">
                                    {selectedOrder?.totalPrice}
                                    <span className="taka">Tk</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
