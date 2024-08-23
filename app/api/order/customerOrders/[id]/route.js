import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

import ParentOrderModel from "@/model/ParentOrderModel";
import SubOrderModel from "@/model/SubOrderModel";
import FoodModel from "@/model/FoodModel";
import UserModel from "@/model/UserModel";

// get user's all orders
export async function GET(req, content) {
    const ID = content.params.id;
    try {
        connectDB();
        if (!ID) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: "Invalid user ID",
            });
        } else {
            // Find all parent orders for the given customer
            const parentOrders = await ParentOrderModel.find({
                customer: ID,
            });

            const allOrders = await Promise.all(
                parentOrders.map(async (parentOrder) => {
                    // Find all sub-orders associated with the parent order
                    const subOrders = await SubOrderModel.find({
                        parentOrder: parentOrder._id,
                    }).populate("items.food");

                    // Combine all sub-orders into a single order format
                    const items = subOrders.flatMap((subOrder) =>
                        subOrder.items.map((item) => ({
                            food: item.food,
                            quantity: item.quantity,
                            price: item.price,
                        }))
                    );

                    return {
                        _id: parentOrder._id,
                        customer: parentOrder.customer,
                        delivaryAddress: parentOrder.delivaryAddress,
                        customerName: parentOrder.customerName,
                        customerEmail: parentOrder.customerEmail,
                        contactNumber: parentOrder.contactNumber,
                        paymentMethod: parentOrder.paymentMethod,
                        items: items,
                        totalPrice: parentOrder.totalPrice,
                        status: parentOrder.status,
                        createdAt: parentOrder.createdAt,
                    };
                })
            );

            return NextResponse.json({
                status: true,
                message: "Orders found",
                result: allOrders,
            });
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
