import OrderModel from "@/model/OrderModel";
import FoodModel from "@/model/FoodModel";
import UserModel from "@/model/UserModel";
import { NextResponse } from "next/server";

// get user's all orders
export async function GET(req, content) {
    const ID = content.params.userOrder;
    try {
        if (!ID) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: "user not found",
            });
        } else {
            const orders = await OrderModel.find({ customer: ID })
                .populate({
                    path: "customer",
                    select: "username email avatar",
                })
                .populate({
                    path: "items.food",
                    select: "-_id -foodDescription -price -foodOfResturant -__v",
                });

            if (!orders || orders.length === 0) {
                return NextResponse.json({
                    status: false,
                    message: "Operation failed",
                    result: "Order list empty",
                });
            } else {
                return NextResponse.json({
                    status: true,
                    message: "Orders found",
                    result: orders,
                });
            }
        }
    } catch (error) {
        console.log("error", error.message);
        return NextResponse.json({
            status: false,
            message: "Operation failed",
            result: error?.message,
        });
    }
}
