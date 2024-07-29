import connectDB from "@/lib/connectDB";
import ResturantModel from "@/model/ResturantModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();

        const result = await ResturantModel.find({});
        return NextResponse.json({
            message: "operation done",
            result,
        });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "failed operation",
        });
    }
}
export async function POST(req) {
    const payload = await req.json();
    try {
        await connectDB();
        const response = new ResturantModel(payload);
        const result = await response.save();
        return NextResponse.json({
            status: true,
            message: "User regestered",
            result,
        });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            status: false,
            message: "regestration failed",
            result: error?.message,
        });
    }
}
