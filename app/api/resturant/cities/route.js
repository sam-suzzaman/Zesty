import connectDB from "@/lib/connectDB";
import FoodModel from "@/model/FoodModel";
import ResturantModel from "@/model/ResturantModel";
import { NextResponse } from "next/server";

export async function GET(res) {
    try {
        await connectDB();

        const response = await ResturantModel.find();

        if (!response.length) {
            return NextResponse.json({
                status: false,
                message: "City data not found",
                result: null,
            });
        } else {
            // Step 1: Extract the resturantCityName property from each object
            const cityNames = response.map((item) => item.resturantCityName);

            // Step 2: Convert all city names to lowercase to ensure case insensitivity
            const lowercasedCityNames = cityNames.map((city) =>
                city.toLowerCase()
            );

            // Step 3: Use a Set to remove duplicates
            const uniqueCitySet = new Set(lowercasedCityNames);

            // Step 4: Convert the Set back to an array
            const uniqueCityNames = Array.from(uniqueCitySet);

            return NextResponse.json({
                status: true,
                message: "City data fetched",
                result: uniqueCityNames,
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
