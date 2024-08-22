import connectDB from "@/lib/connectDB";
import FoodModel from "@/model/FoodModel";
import { NextResponse } from "next/server";

// Get all food lists
export async function GET(res) {
    try {
        await connectDB();

        const result = await FoodModel.find({}).populate(
            "foodOfResturant",
            "avatar name"
        );

        return NextResponse.json({
            status: true,
            message: "Food data find",
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
