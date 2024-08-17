import connectDB from "@/lib/connectDB";
import UserModel from "@/model/UserModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    try {
        connectDB();

        const isUserExists = await UserModel.findOne({
            email: data.email,
        });

        if (isUserExists) {
            return NextResponse.json({
                status: false,
                message: "User already exists",
                result: null,
            });
        } else {
            const newUser = new UserModel(data);
            await newUser.save();

            // Fetch the user data excluding the password field
            const result = await UserModel.findById(newUser._id).select(
                "-password"
            );

            return NextResponse.json({
                status: true,
                message: "Registration Successfull",
                result,
            });
        }
    } catch (error) {
        return NextResponse.json({
            status: false,
            message: "Operation failed",
            result: error?.message,
        });
    }
}
