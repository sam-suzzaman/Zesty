import { USER_ROLES } from "@/lib/Constants";
import mongoose from "mongoose";
const bcrypt = require("bcrypt");

const ResturantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "resturant name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "resturant email is required"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "resturant password is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        contactNumber: {
            type: String,
            required: [true, "resturant contact number is required"],
            trim: true,
        },
        contactEmail: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        cityName: {
            type: String,
            trim: true,
        },
        cityCode: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.RESTURANT,
        },
    },
    { timestamps: true }
);

ResturantSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(16);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const ResturantModel =
    mongoose.models.Resturant || mongoose.model("Resturant", ResturantSchema);
export default ResturantModel;
