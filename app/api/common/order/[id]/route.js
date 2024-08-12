import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import connectDB from "@/lib/connectDB";
import OrderModel from "@/model/OrderModel";
import UserModel from "@/model/UserModel";

export async function PATCH(req, context) {
    const { user } = await getServerSession(authOptions);
    const id = context.params.id;
    const { status } = await req.json();

    try {
        connectDB();
        if (!id) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: "Order id not found. Provide a valid order ID",
            });
        } else {
            const targetOrder = await OrderModel.findById(id).select(
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
                case "ADMIN":
                    const newOrder = await OrderModel.findByIdAndUpdate(
                        id,
                        { status: status }, // Only update the status field
                        { new: true, runValidators: true, select: "status" } // only status result
                    );

                    return NextResponse.json({
                        status: true,
                        message: "Operation done",
                        result: "Status updated successfully",
                    });

                case "user":
                    if (targetOrder.customer.toString() !== user._id) {
                        return NextResponse.json({
                            status: false,
                            message: "Unauthorized",
                            result: "You are not authorized to update this order",
                        });
                    }

                    const updatedOrder = await OrderModel.findByIdAndUpdate(
                        id,
                        { status: status }, // Only update the status field
                        { new: true, runValidators: true, select: "status" } // only status result
                    );

                    return NextResponse.json({
                        status: true,
                        message: "Operation done",
                        result: "Status updated successfully",
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
