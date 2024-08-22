import { ORDER_STATUS } from "@/lib/Constants";
import mongoose from "mongoose";

const SubOrderSchema = new mongoose.Schema(
    {
        parentOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ParentOrder",
            required: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        },
        items: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(ORDER_STATUS),
            default: ORDER_STATUS.PENDING,
        },
    },
    { timestamps: true }
);

const SubOrderModel =
    mongoose.models.SubOrder || mongoose.model("SubOrder", SubOrderSchema);

export default SubOrderModel;
