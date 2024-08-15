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

// export async function POST(req) {
//     const payload = await req.json();
//     let result = false;

//     try {
//         await connectDB();
//         if (payload.login) {
//             if (payload.resturantEmail && payload.resturantPassword) {
//                 result = await ResturantModel.findOne({
//                     resturantEmail: payload.resturantEmail,
//                     resturantPassword: payload.resturantPassword,
//                 });
//             } else {
//                 return NextResponse.json({
//                     status: false,
//                     message: "Valid email and password required",
//                     result: null,
//                 });
//             }
//         } else {
//             const response = new ResturantModel(payload);
//             result = await response.save();
//         }
//         return NextResponse.json({
//             status: result ? true : false,
//             message: result
//                 ? "Login Successfull"
//                 : "email or password not matched",
//             result,
//         });
//     } catch (error) {
//         console.log(error.message);
//         return NextResponse.json({
//             status: false,
//             message: "Operation failed",
//             result: error?.message,
//         });
//     }
// }

export async function POST(req) {
    const resturant = await req.json();

    try {
        await connectDB();

        const isEmailExists = await ResturantModel.findOne({
            email: resturant.email,
        });

        if (isEmailExists) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: "Email already exists.Try with another.",
            });
        } else {
            const response = new ResturantModel(resturant);
            await response.save();

            return NextResponse.json({
                status: true,
                message: "Done! ",
                result: "You have successfully registered",
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
