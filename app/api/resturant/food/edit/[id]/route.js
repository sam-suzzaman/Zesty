import connectDB from "@/lib/connectDB";
import FoodModel from "@/model/FoodModel";
import { NextResponse } from "next/server";

// to get single food
export async function GET(req, content) {
    const id = content.params.id;
    try {
        await connectDB();
        const result = await FoodModel.findOne({ _id: id });
        if (!result) {
            return NextResponse.json({
                status: false,
                message: "Food not",
                result,
            });
        } else {
            return NextResponse.json({
                status: true,
                message: "Food item found",
                result,
            });
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

// to update food
export async function PUT(req, content) {
    const id = content.params.id;
    const payload = await req.json();
    try {
        await connectDB();
        const result = await FoodModel.findOneAndUpdate({ _id: id }, payload);

        if (!result) {
            return NextResponse.json({
                status: false,
                message: "Food update failed",
                result: null,
            });
        } else {
            const updatedFood = await FoodModel.findOne({ _id: id });
            return NextResponse.json({
                status: true,
                message: "Food updated succssfully",
                result: updatedFood,
            });
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
