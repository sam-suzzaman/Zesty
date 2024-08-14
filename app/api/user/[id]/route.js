import connectDB from "@/lib/connectDB";
import UserModel from "@/model/UserModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req, content) {
    const _id = content.params.id;
    try {
        connectDB();
        if (!_id) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: "Invalid user ID",
            });
        } else {
            const isUserExists = await UserModel.findById(_id).select(
                "-password"
            );

            if (!isUserExists) {
                return NextResponse.json({
                    status: false,
                    message: "Operation failed",
                    result: "User not found",
                });
            } else {
                return NextResponse.json({
                    status: true,
                    message: "User get successfully",
                    result: isUserExists,
                });
            }
        }
    } catch (error) {
        return NextResponse.json({
            status: false,
            message: "Operation failed",
            result: error?.message,
        });
    }
}

export async function PATCH(req, content) {
    const _id = content.params.id;
    const { user } = await getServerSession(authOptions);
    const data = await req.json();

    try {
        connectDB();
        if (!_id) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: "Invalid user ID",
            });
        } else {
            if (_id !== user?._id) {
                return NextResponse.json({
                    status: false,
                    message: "Operation failed",
                    result: "Your don't have premission to update profile",
                });
            } else {
                await UserModel.findByIdAndUpdate(
                    _id,
                    data,
                    { new: true, runValidators: true } // only status result
                );
                return NextResponse.json({
                    status: true,
                    message: "Profile Updated",
                });
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: false,
            message: "Profile update failed",
            result: error?.message,
        });
    }
}
