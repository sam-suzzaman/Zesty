import connectDB from "@/lib/connectDB";
import OrderModel from "@/model/OrderModel";
import ParentOrderModel from "@/model/ParentOrderModel";
import SubOrderModel from "@/model/SubOrderModel";
import FoodModel from "@/model/FoodModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    const payload = await req.json();

    try {
        await connectDB();

        // Create the Parent Order
        const parentOrder = new ParentOrderModel({
            customer: payload.customer,
            delivaryAddress: payload.delivaryAddress,
            customerName: payload.customerName,
            customerEmail: payload.customerEmail,
            contactNumber: payload.contactNumber,
            paymentMethod: payload.paymentMethod,
            totalPrice: payload.totalPrice,
        });

        // Validate the Parent Order without saving it
        const validationError = parentOrder.validateSync();
        if (validationError) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: validationError.message,
            });
        }

        // Group items by restaurant
        const itemsByRestaurant = payload.items.reduce((acc, item) => {
            acc[item.foodOfResturant] = acc[item.foodOfResturant] || [];
            acc[item.foodOfResturant].push(item);
            return acc;
        }, {});

        const subOrders = [];

        for (const restaurantId in itemsByRestaurant) {
            const items = itemsByRestaurant[restaurantId];
            const subOrderTotalPrice = items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            const subOrder = new SubOrderModel({
                parentOrder: parentOrder._id,
                restaurant: restaurantId,
                items: items.map((item) => ({
                    food: item.food,
                    quantity: item.quantity,
                    price: item.price,
                })),
                totalPrice: subOrderTotalPrice,
            });

            await subOrder.save();
            subOrders.push(subOrder._id);
        }

        parentOrder.subOrders = subOrders;
        await parentOrder.save();

        return NextResponse.json({
            status: true,
            message: "Order placed successfully",
        });
    } catch (error) {
        console.log("error", error.message);

        return NextResponse.json({
            status: false,
            message: "Operation failed",
            result: error?.message,
        });
    }
}

// add a new order
// export async function POST(req) {
//     const payload = await req.json();
//     try {
//         await connectDB();

//         const order = new OrderModel(payload);
//         await order.save();
//         return NextResponse.json({
//             status: true,
//             message: "Order placed successfully",
//             //   result,
//         });
//     } catch (error) {
//         console.log("error", error.message);
//         return NextResponse.json({
//             status: false,
//             message: "Operation failed",
//             result: error?.message,
//         });
//     }
// }
