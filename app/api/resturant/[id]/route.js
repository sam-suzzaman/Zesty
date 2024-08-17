import connectDB from "@/lib/connectDB";
import ResturantModel from "@/model/ResturantModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

// fetch single resturant data
export async function GET(req, context) {
    const _id = context.params.id;
    try {
        connectDB();
        if (!_id) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: "Invalid user ID",
            });
        } else {
            const isResturantExist = await ResturantModel.findById(_id).select(
                "-password"
            );

            if (!isResturantExist) {
                return NextResponse.json({
                    status: false,
                    message: "Operation failed",
                    result: "Resturant not found",
                });
            } else {
                return NextResponse.json({
                    status: true,
                    message: "Resturant get successfully",
                    result: isResturantExist,
                });
            }
        }
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            status: false,
            message: "Operation failed",
            result: error.message,
        });
    }
}

export async function PATCH(req, context) {
    const _id = context.params.id;
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
                const res = await ResturantModel.findByIdAndUpdate(_id, data, {
                    new: true,
                    runValidators: true,
                });
                if (res) {
                    return NextResponse.json({
                        status: true,
                        message: "Profile Updated",
                        result: "Your profile updated successfully",
                    });
                } else {
                    return NextResponse.json({
                        status: false,
                        message: "Updated failed",
                        result: "Your profile not updated",
                    });
                }
            }
        }
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            status: false,
            message: "Operation failed",
            result: error.message,
        });
    }
}
