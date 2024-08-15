import { USER_ROLES } from "@/lib/Constants";
import mongoose from "mongoose";
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            trim: true,
        },
        role: {
            role: {
                type: String,
                enum: Object.values(USER_ROLES),
                default: USER_ROLES.USER,
            },
        },
        avatar: {
            type: String,
            trim: true,
            default: "",
        },
        gender: {
            type: String,
            trim: true,
            default: "",
        },
        phoneNumber: {
            type: String,
            trim: true,
            default: "",
        },
        address: {
            type: String,
            trim: true,
            default: "",
        },
        delivaryAddress: {
            type: String,
            trim: true,
            default: "",
        },
        cityName: {
            type: String,
            trim: true,
            default: "",
        },
        cityCode: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(16);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
