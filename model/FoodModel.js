import mongoose, { mongo } from "mongoose";

const FoodSchema = new mongoose.Schema({
    foodTitle: {
        type: String,
        required: [true, "Food title is required"],
        trim: true,
    },
    foodPrice: {
        type: Number,
        required: [true, "food price is required"],
        trim: true,
    },
    foodThumbnail: {
        type: String,
        required: [true, "Food thumbnail is required"],
        trim: true,
    },
    foodDescription: {
        type: String,
        required: [true, "Food description is required"],
        trim: true,
    },
    foodOfResturant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resturant",
        required: [true, "Resturant ID is required"],
    },
});

const FoodModel = mongoose.models.Food || mongoose.model("Food", FoodSchema);
export default FoodModel;
