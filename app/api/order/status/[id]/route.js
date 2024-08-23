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
    const { status } = await req.json();

    try {
        connectDB();

        if (!orderId) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: "Order id not found. Provide a valid order ID",
            });
        } else {
            const targetOrder = await ParentOrderModel.findById(orderId).select(
                "customer"
            );

            if (!targetOrder) {
                return NextResponse.json({
                    status: false,
                    message: "Order not found",
                    result: "Your provided order id is invalid. so no order is found",
                });
            }

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

                case USER_ROLES.USER:
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
