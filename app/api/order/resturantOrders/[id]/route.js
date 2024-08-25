import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

import ParentOrderModel from "@/model/ParentOrderModel";
import SubOrderModel from "@/model/SubOrderModel";
import FoodModel from "@/model/FoodModel";

// get resturant's all orders
export async function GET(req, content) {
    const ID = content.params.id;
    const queryParams = req.nextUrl.searchParams;
    // const search = queryParams.get("search");
    const filter = queryParams.get("filter");
    let query = { resturant: ID };

    try {
        connectDB();

        if (!ID) {
            return NextResponse.json({
                status: false,
                message: "Operation failed",
                result: "Invalid resturant ID",
            });
        } else {
            if (filter) {
                query = {
                    ...query,
                    status: { $regex: new RegExp(filter, "i") },
                };
            }

            const orders = await SubOrderModel.find(query)
                .populate({
                    path: "parentOrder",
                    select: "delivaryAddress customerName contactNumber	totalPrice",
                })
                .populate({
                    path: "items.food",
                    select: "foodTitle quantity foodThumbnail",
                });

            if (orders?.length == 0) {
                return NextResponse.json({
                    status: false,
                    message: "Operation failed",
                    result: "Oder list is empty. No order found",
                });
            }

            //calculating items total quantity per order
            const modifiedOrder = orders?.map((order) => {
                const subOfOrderItemsQuantity = order?.items?.reduce(
                    (acc, item) => {
                        acc = acc + item.quantity;
                        return acc;
                    },
                    0
                );

                return {
                    ...order._doc, // _doc to get the raw document data
                    orderQuantity: subOfOrderItemsQuantity,
                };
            });

            return NextResponse.json({
                status: true,
                message: "Order fetched",
                length: modifiedOrder?.length,
                result: modifiedOrder,
            });
        }
    } catch (error) {
        console.log("error", error.message);
        return NextResponse.json({
            status: false,
            message: "Operation failed",
            result: error?.message,
        });
    }
}
