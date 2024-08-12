import mongoose from "mongoose";
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
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
        type: String,
        enum: ["admin", "user"],
        default: "user",
        trim: true,
    },
    avatar: {
        type: String,
        trim: true,
        default: "",
    },
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(16);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
