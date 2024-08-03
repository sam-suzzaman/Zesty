import connectDB from "@/lib/connectDB";
import FoodModel from "@/model/FoodModel";
import ResturantModel from "@/model/ResturantModel";
import { NextResponse } from "next/server";

// Get Full resturants list with search and filter
export async function GET(req) {
    try {
        await connectDB();

        const queryParams = req.nextUrl.searchParams;
        const location = queryParams.get("location");
        const resturantOrFood = queryParams.get("resturantOrFood");

        let query = {};
        let resturants;

        // Generating filters
        if (!location && !resturantOrFood) {
            // case-1: no params present
            resturants = await ResturantModel.find()
                .sort({ _id: -1 })
                .limit(10);
        } else if (location && resturantOrFood) {
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
            resturants = await ResturantModel.find(query);
        } else if (location) {
            // Case-3: Only location param present
            query = {
                resturantCityName: { $regex: new RegExp(location, "i") },
            };
            resturants = await ResturantModel.find(query);
        } else if (resturantOrFood) {
            // Case-4: Only restaurantOrFood param present
            const food = await FoodModel.findOne({
                foodTitle: { $regex: new RegExp(resturantOrFood, "i") },
            }).populate("foodOfResturant");

            query = food
                ? { _id: food.foodOfResturant._id }
                : {
                      resturantName: {
                          $regex: new RegExp(resturantOrFood, "i"),
                      },
                  };

            resturants = await ResturantModel.find(query);
        }

        return NextResponse.json({
            status: true,
            message:
                resturants.length > 0
                    ? "Resturant data found"
                    : "Resturant data not found.",
            result: resturants,
        });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            status: false,
            message: "Operation failed",
            result: error?.message,
        });
    }
}
