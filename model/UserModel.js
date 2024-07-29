import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
    },
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
