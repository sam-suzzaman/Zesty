import connectDB from "@/lib/connectDB";
import OrderModel from "@/model/OrderModel";
import { NextResponse } from "next/server";

// add a new order
export async function POST(req) {
    const payload = await req.json();
    try {
        await connectDB();

        const order = new OrderModel(payload);
        await order.save();
        return NextResponse.json({
            status: true,
            message: "Order placed successfully",
            //   result,
        });
    } catch (error) {
        console.log("error", error.message);
        return NextResponse.json({
            status: false,
            message: "Operation failed",
            result: error?.message,
        });
    }
}
