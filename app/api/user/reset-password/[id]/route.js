import connectDB from "@/lib/connectDB";
import UserModel from "@/model/UserModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
const bcrypt = require("bcrypt");

export async function PATCH(req, context) {
    const _id = context.params.id;
    const { email, oldPassword, newPassword } = await req.json();
    const { user } = await getServerSession(authOptions);

    try {
        connectDB();
        if (!_id) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: "Invalid User ID",
            });
        } else {
            if (user._id !== _id) {
                return NextResponse.json({
                    status: false,
                    message: "Operation failed",
                    result: "You don't have permission to it.",
                });
            } else {
                const isUserExists = await UserModel.findById(_id);

                if (!isUserExists) {
                    return NextResponse.json({
                        status: false,
                        message: "Operation failed",
                        result: "User not exists",
                    });
                } else {
                    const isPasswordMatched = await bcrypt.compare(
                        oldPassword,
                        isUserExists.password
                    );

                    if (!isPasswordMatched) {
                        return NextResponse.json({
                            status: false,
                            message: "Operation failed",
                            result: "Old password not matched",
                        });
                    } else {
                        const salt = await bcrypt.genSalt(16);
                        const newHashedPassword = await bcrypt.hash(
                            newPassword,
                            salt
                        );

                        await UserModel.findOneAndUpdate(
                            { _id, email },
                            { password: newHashedPassword },
                            { new: true }
                        );

                        return NextResponse.json({
                            status: true,
                            message: "Successfully Changed",
                            result: "Password has successfully changed",
                        });
                    }
                }
            }
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
