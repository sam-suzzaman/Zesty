import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

import UserModel from "@/model/UserModel";
import ParentOrderModel from "@/model/ParentOrderModel";
import { ORDER_STATUS, USER_ROLES } from "@/lib/Constants";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SubOrderModel from "@/model/SubOrderModel";

// update order status
export async function PATCH(req, context) {
    const { user } = await getServerSession(authOptions);
    const orderId = context.params.id;
    const payload = await req.json();

    try {
        connectDB();

        if (!orderId) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: "Order id not found. Provide a valid order ID",
            });
        } else {
            switch (user.role) {
                // case USER_ROLES.ADMIN:
                //     const newOrder = await ParentOrderModel.findByIdAndUpdate(
                //         orderId,
                //         { status: status }, // Only update the status field
                //         { new: true, runValidators: true, select: "status" } // only status result
                //     );

                //     return NextResponse.json({
                //         status: true,
                //         message: "Operation done",
                //         result: "Status updated successfully",
                //     });

                case USER_ROLES.RESTURANT:
                    const { resturantID, status: orderStatus } = payload;

                    const targetedSubOrder = await SubOrderModel.findOne({
                        resturant: resturantID,
                        _id: orderId,
                    }).select("status parentOrder");

                    if (!targetedSubOrder) {
                        return NextResponse.json({
                            status: false,
                            message: "Failed",
                            result: "Order not found",
                        });
                    } else if (
                        targetedSubOrder.status === ORDER_STATUS.CANCELED
                    ) {
                        return NextResponse.json({
                            status: false,
                            message: "Failed",
                            result: "Order already cancelled",
                        });
                    }

                    // finally updating sub order status
                    await SubOrderModel.findByIdAndUpdate(
                        targetedSubOrder?._id,
                        {
                            status: orderStatus,
                        }
                    );

                    await ParentOrderStatusUpdateHandler(
                        targetedSubOrder?.parentOrder
                    );

                    return NextResponse.json({
                        status: true,
                        message: "Done",
                        result: "Order status updated",
                    });

                case USER_ROLES.USER:
                    const status = payload?.status; //status value sent from frontend

                    // finding particular order
                    const targetOrder = await ParentOrderModel.findById(
                        orderId
                    ).select("customer");

                    if (!targetOrder) {
                        return NextResponse.json({
                            status: false,
                            message: "Order not found",
                            result: "Your provided order id is invalid. so no order is found",
                        });
                    }

                    if (targetOrder.customer.toString() !== user._id) {
                        return NextResponse.json({
                            status: false,
                            message: "Unauthorized",
                            result: "You are not authorized to update this order",
                        });
                    }

                    // Fetch all sub-orders related to the parent order
                    const subOrders = await SubOrderModel.find({
                        parentOrder: orderId,
                    });

                    // Check if any sub-order has a status of "PREPARING"
                    const isPreparing = subOrders.some(
                        (subOrder) => subOrder.status === ORDER_STATUS.PREPARING
                    );

                    // Check if any sub-order has a status of "cancelled"
                    // const isCancelled = subOrders.some(
                    //     (subOrder) => subOrder.status === ORDER_STATUS.CANCELED
                    // );

                    if (isPreparing && status === ORDER_STATUS.CANCELED) {
                        return NextResponse.json({
                            status: false,
                            message: "Operation failed",
                            result: "Order cannot be cancelled because one or more sub-orders are still preparing.",
                        });
                    }

                    const updatedOrder =
                        await ParentOrderModel.findByIdAndUpdate(
                            orderId,
                            { status: status }, // Only update the status field
                            { new: true, runValidators: true, select: "status" } // only status result
                        );

                    if (updatedOrder) {
                        return NextResponse.json({
                            status: true,
                            message: "Operation done",
                            result: "Order cancelled successfully",
                        });
                    }

                    return NextResponse.json({
                        status: false,
                        message: "Operation done",
                        result: "Order not cancelled",
                    });

                default:
                    return NextResponse.json({
                        status: false,
                        message: "Unauthorized user",
                        result: "You don't have the premission to do it.",
                    });
            }
        }
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            status: false,
            message: "Operation failed",
            result: error?.message,
        });
    }
}

const ParentOrderStatusUpdateHandler = async (parentOrderID) => {
    try {
        // Fetch all sub-orders of the parent order
        const subOrders = await SubOrderModel.find({
            parentOrder: parentOrderID,
        });

        // Check if all sub-orders are completed
        const allCompleted = subOrders.every(
            (subOrder) => subOrder.status === ORDER_STATUS.COMPLETED
        );

        // Check if all sub-orders are either completed or canceled
        const allCompletedOrCanceled = subOrders.every(
            (subOrder) =>
                subOrder.status === ORDER_STATUS.COMPLETED ||
                subOrder.status === ORDER_STATUS.CANCELED
        );

        // Check if any sub-order is still pending
        const allPending = subOrders.some(
            (subOrder) => subOrder.status === ORDER_STATUS.PENDING
        );
        // Check if any sub-order is still pending or being prepared
        const anyPendingOrPreparing = subOrders.some(
            (subOrder) =>
                subOrder.status === ORDER_STATUS.PENDING ||
                subOrder.status === ORDER_STATUS.PREPARING
        );

        // Update the parent order status based on the conditions
        let newStatus;
        if (allCompleted) {
            newStatus = ORDER_STATUS.COMPLETED;
        } else if (allCompletedOrCanceled) {
            newStatus = ORDER_STATUS.PARTIALLY_DELIIVARED;
        } else if (allPending) {
            newStatus = ORDER_STATUS.PENDING;
        } else if (anyPendingOrPreparing) {
            newStatus = ORDER_STATUS.PREPARING;
        } else {
            newStatus = ORDER_STATUS.ACCEPTED;
        }

        console.log(newStatus);
        // Update the parent order status in the database
        await ParentOrderModel.findByIdAndUpdate(parentOrderID, {
            status: newStatus,
        });
    } catch (error) {
        console.error("Error updating parent order status:", error);
    }
};
