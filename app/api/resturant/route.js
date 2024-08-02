import connectDB from "@/lib/connectDB";
import FoodModel from "@/model/FoodModel";
import ResturantModel from "@/model/ResturantModel";
import { NextResponse } from "next/server";

// Get Full resturants list
export async function GET(req) {
    connectDB();
    const queryParams = req.nextUrl.searchParams;
    const location = queryParams.get("location");
    const resturantOrFood = queryParams.get("resturantOrFood");
    console.log(queryParams);
    console.log();
    let query = {};
    let resturants;

    // Generating filters
    if (!location && !resturantOrFood) {
        // case-1: no params present
        resturants = await ResturantModel.find().sort({ _id: -1 }).limit(10);
    } else if (location && resturantOrFood) {
        console.log("called");
        // case-2: both params present
        const food = await FoodModel.findOne({
            foodTitle: { $regex: new RegExp(resturantOrFood, "i") },
        }).populate("foodOfResturant");

        query = {
            resturantCityName: { $regex: new RegExp(location, "i") },
            ...(food
                ? { _id: food.foodOfResturant._id }
                : {
                      resturantName: {
                          $regex: new RegExp(resturantOrFood, "i"),
                      },
                  }),
        };
        console.log(query);
        resturants = await ResturantModel.find(query);
    } else if (location) {
        console.log("call location");
        // Case-3: Only location param present
        query = { resturantCityName: { $regex: new RegExp(location, "i") } };
        resturants = await ResturantModel.find(query);
    } else if (resturantOrFood) {
        console.log("call res");
        // Case-4: Only restaurantOrFood param present
        const food = await FoodModel.findOne({
            foodTitle: { $regex: new RegExp(resturantOrFood, "i") },
        }).populate("foodOfResturant");

        query = food
            ? { _id: food.foodOfResturant._id }
            : { resturantName: { $regex: new RegExp(resturantOrFood, "i") } };

        resturants = await ResturantModel.find(query);
    }

    return NextResponse.json({
        status: true,
        message: "Resturant data found",
        result: resturants,
    });
    // try {
    //     await connectDB();

    //     const response = await ResturantModel.find().select(
    //         "-resturantPassword -resturantEmail"
    //     );

    //     if (!response.length) {
    //         return NextResponse.json({
    //             status: false,
    //             message: "Resturant data not found",
    //             result: null,
    //         });
    //     } else {
    //         return NextResponse.json({
    //             status: true,
    //             message: "Resturant data fetched",
    //             result: response,
    //         });
    //     }
    // } catch (error) {
    //     console.log(error.message);
    //     return NextResponse.json({
    //         status: false,
    //         message: "Operation failed",
    //         result: error?.message,
    //     });
    // }
}
