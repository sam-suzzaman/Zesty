import mongoose from "mongoose";

const ResturantSchema = new mongoose.Schema({
    resturantEmail: {
        type: String,
        required: [true, "resturant email is required"],
        trim: true,
    },
    resturantName: {
        type: String,
        required: [true, "resturant name is required"],
        trim: true,
    },
    resturantAddress: {
        type: String,
        required: [true, "resturant address is required"],
        trim: true,
    },
    resturantCityName: {
        type: String,
        required: [true, "resturant city name is required"],
        trim: true,
    },
    resturantContactNumber: {
        type: String,
        required: [true, "resturant contact number is required"],
        trim: true,
    },
    resturantPassword: {
        type: String,
        required: [true, "resturant password is required"],
        trim: true,
    },
});

const ResturantModel =
    mongoose.models.Resturant || mongoose.model("Resturant", ResturantSchema);
export default ResturantModel;
