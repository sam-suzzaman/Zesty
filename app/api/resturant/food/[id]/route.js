import connectDB from "@/lib/connectDB";
import FoodModel from "@/model/FoodModel";
import { NextResponse } from "next/server";

// to fetch all foods of each resturents
export async function GET(req, content) {
    const id = content.params.id;
    try {
        await connectDB();
        const result = await FoodModel.find({ foodOfResturant: id });

        if (!result.length) {
            return NextResponse.json({
                status: false,
                message: "Food list emtpy",
                result,
            });
        } else {
            return NextResponse.json({
                status: true,
                message: "Food list fetched",
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

export async function DELETE(req, content) {
    const id = content.params.id;
    try {
        await connectDB();
        const result = await FoodModel.deleteOne({ _id: id });

        if (result.deletedCount == 0) {
            return NextResponse.json({
                status: false,
                message: "Delete failed",
                result,
            });
        } else {
            return NextResponse.json({
                status: true,
                message: "Food item deleted",
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