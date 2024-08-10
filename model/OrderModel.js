const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "customer ID is required"],
    },
    delivaryAddress: {
        type: String,
        required: [true, "Delivary required"],
    },
    customerName: {
        type: String,
        required: [true, "Customer name required"],
    },
    customerEmail: {
        type: String,
        required: [true, "Customer email required"],
    },
    contactNumber: {
        type: String,
        required: [true, "Contact number required"],
    },
    shippingMethod: {
        type: String,
        required: [true, "Shipping method required"],
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method required"],
    },
    items: [
        {
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                required: [true, "selected food id is required"],
            },
            quantity: {
                type: Number,
                required: [true, "Ordered food quantity id is required"],
            },
            price: {
                type: Number,
                required: [true, "Ordered food price id is required"],
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: [true, "Order's total price required"],
    },
    status: {
        type: String,
        enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "PENDING",
    },
});

const OrderModel =
    mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default OrderModel;
