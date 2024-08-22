import { ORDER_STATUS } from "@/lib/Constants";
import mongoose from "mongoose";

const ParentOrderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        delivaryAddress: {
            type: String,
            required: true,
        },
        customerName: {
            type: String,
            required: true,
        },
        customerEmail: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(ORDER_STATUS),
            default: ORDER_STATUS.PENDING,
        },
        subOrders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubOrder",
            },
        ],
    },
    { timestamps: true }
);

const ParentOrderModel =
    mongoose.models.ParentOrder ||
    mongoose.model("ParentOrder", ParentOrderSchema);

export default ParentOrderModel;
