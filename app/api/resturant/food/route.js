import connectDB from "@/lib/connectDB";
import FoodModel from "@/model/FoodModel";
import { NextResponse } from "next/server";

export async function POST(res) {
    const payload = await res.json();
    try {
        await connectDB();

        const response = new FoodModel(payload);
        const result = await response.save();

        return NextResponse.json({
            status: true,
            message: "Food addedd successfully",
            result,
        });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            status: false,
            message: "Operation failed",
            result: error?.message,
        });
    }
}
