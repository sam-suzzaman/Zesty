"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useCartContext } from "@/context/CartContext";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Loading from "@/components/Shared/Loading/Loading";
import { useRouter } from "next/navigation";

const OrderPage = () => {
    const { state, handleClearCart } = useCartContext();
    const { status, data: User } = useSession();
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const navbar = document.getElementById("main-navbar");
        if (navbar) {
            setNavbarHeight(navbar.offsetHeight);
        }
    }, []);

    const onSubmit = async (data) => {
        const {
            customerName,
            customerEmail,
            customerContactNumber,
            delivaryAddress,
        } = data;
        if (data) {
            if (!paymentMethod) {
                toast.error("Please select a Payment Method");
            } else {
                const items = state?.cart?.map((food) => ({
                    food: food._id,
                    quantity: food.quantity,
                    price: food.foodPrice,
                    foodOfResturant: food.foodOfResturant._id,
                }));

                const order = {
                    customer: User?.user?._id,
                    items,
                    totalPrice: state?.finalPrice,
                    delivaryAddress,
                    customerName,
                    customerEmail,
                    contactNumber: customerContactNumber,
                    paymentMethod,
                };

                const options = {
                    method: "POST",
                    body: JSON.stringify(order),
                };
                const response = await fetch(
                    "http://localhost:3000/api/order",
                    options
                );
                const result = await response.json();

                if (result?.status) {
                    handleClearCart();
                    toast.success(result?.message);
                    router.push("/user/dashboard/my-orders");
                } else {
                    toast.error(result?.message);
                }
            }
        } else {
            return;
        }
    };

    if (status == "loading") {
        return (
            <section
                className="order-page-wrapper"
                style={{ minHeight: `calc(100vh - ${navbarHeight}px)` }}
            >
                <Loading />
            </section>
        );
    }
    return (
        <>
            <section
                className="order-page-wrapper"
                style={{ minHeight: `calc(100vh - ${navbarHeight}px)` }}
            >
                <div className="order-page-container">
                    <h4 className="page-title">checkout</h4>

                    <div className="main-row">
                        {/* Left Col */}
                        <form
                            className="left-col shipping-form"
                            onSubmit={handleSubmit(onSubmit)}
                            autoComplete="off"
                        >
                            {/* SubRow-1: Shipping Info form */}
                            <div className="sub-row shipping-add-row">
                                <h5 className="title">shipping address</h5>
                                <div className="input-container">
                                    {/* Input-1:username  */}
                                    <div className="input-row">
                                        <label
                                            className="input-label"
                                            for="username"
                                        >
                                            Customer Name
                                        </label>
                                        <input
                                            className="input-field"
                                            type="text"
                                            id="username"
                                            placeholder="Type here"
                                            {...register("customerName", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Customer name is requird",
                                                },
                                            })}
                                            defaultValue={User?.user.username}
                                        />
                                        {errors?.customerName && (
                                            <span className="input-error">
                                                {errors?.customerName?.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Input-2:email  */}
                                    <div className="input-row">
                                        <label
                                            className="input-label"
                                            for="customerEmail"
                                        >
                                            Customer email address
                                        </label>
                                        <input
                                            className="input-field"
                                            type="email"
                                            id="customerEmail"
                                            placeholder="Type here"
                                            {...register("customerEmail", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Customer Email address is requird",
                                                },
                                            })}
                                            defaultValue={User?.user?.email}
                                        />
                                        {errors?.customerEmail && (
                                            <span className="input-error">
                                                {errors?.customerEmail?.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Input-3:address  */}
                                    <div className="input-row">
                                        <label
                                            className="input-label"
                                            for="customerAddress"
                                        >
                                            Delivary Address:
                                        </label>
                                        <input
                                            className="input-field"
                                            type="text"
                                            id="customerAddress"
                                            placeholder="Type here"
                                            {...register("delivaryAddress", {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Delivary address is requird",
                                                },
                                            })}
                                            defaultValue={
                                                User?.user?.delivaryAddress
                                            }
                                        />
                                        {errors?.delivaryAddress && (
                                            <span className="input-error">
                                                {
                                                    errors?.delivaryAddress
                                                        ?.message
                                                }
                                            </span>
                                        )}
                                    </div>

                                    {/* Input-4:contact number */}
                                    <div className="input-row">
                                        <label
                                            className="input-label"
                                            for="customerContact"
                                        >
                                            Customer Contact Number
                                        </label>
                                        <input
                                            className="input-field"
                                            type="text"
                                            id="customerContact"
                                            placeholder="Type here"
                                            {...register(
                                                "customerContactNumber",
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Customer constact number is requird",
                                                    },
                                                }
                                            )}
                                            defaultValue={
                                                User?.user?.phoneNumber
                                            }
                                        />
                                        {errors?.customerContactNumber && (
                                            <span className="input-error">
                                                {
                                                    errors
                                                        ?.customerContactNumber
                                                        ?.message
                                                }
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* SubRow-3: Payment method */}
                            <div className="sub-row payment-row">
                                <h5 className="title">payment method</h5>
                                <div className="method-container">
                                    {/* Method-1:COD */}
                                    <div
                                        className="method-card"
                                        onClick={() => setPaymentMethod("COD")}
                                    >
                                        <div className="left">
                                            <h6 className="title">
                                                cash on delivery
                                            </h6>
                                            <p className="info">
                                                Cash on Delivery available for
                                                this porduct. So you can pay
                                                when you receive your product.
                                            </p>
                                        </div>
                                        <div className="right">
                                            <span
                                                className={`icon ${
                                                    paymentMethod == "COD" &&
                                                    "select"
                                                }`}
                                            ></span>
                                        </div>
                                    </div>

                                    {/* Method-2:Mobile Banking */}
                                    <div
                                        className="method-card"
                                        onClick={() =>
                                            setPaymentMethod("MBanking")
                                        }
                                    >
                                        <div className="left">
                                            <h6 className="title">
                                                mobile banking
                                            </h6>
                                            <p className="info">
                                                Currently not available.You can
                                                pay through mobile banking using
                                                (Rocket, Bkash).
                                            </p>
                                        </div>
                                        <div className="right">
                                            <span
                                                className={`icon ${
                                                    paymentMethod ==
                                                        "MBanking" && "select"
                                                }`}
                                            ></span>
                                        </div>
                                    </div>

                                    {/* Method-3:Bank Card */}
                                    <div
                                        className="method-card"
                                        onClick={() =>
                                            setPaymentMethod("BCard")
                                        }
                                    >
                                        <div className="left">
                                            <h6 className="title">
                                                Pay through Card
                                            </h6>
                                            <p className="info">
                                                Currently not available.You can
                                                pay through banking card, using
                                                (Visa, Mastercard).
                                            </p>
                                        </div>
                                        <div className="right">
                                            <span
                                                className={`icon ${
                                                    paymentMethod == "BCard" &&
                                                    "select"
                                                }`}
                                            ></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* submit */}
                            <button
                                className="place-order-btn"
                                type="submit"
                                disabled={!state?.cart?.length}
                            >
                                place order
                            </button>
                        </form>

                        {/* Right Col */}
                        <div className="right-col">
                            <h4 className="title">total summery</h4>
                            <div className="cost-row">
                                <div className="sub-total">
                                    <p className="left">sub total</p>

                                    <p className="value">
                                        {state?.subTotalPrice}
                                        <span className="tk">tk</span>
                                    </p>
                                </div>
                                <div className="sub-total">
                                    <p className="left">delivery Charge</p>
                                    <p className="value">
                                        {state?.subTotalPrice ? 50 : 0}
                                        <span className="tk">tk</span>
                                    </p>
                                </div>
                                <div className="sub-total">
                                    <p className="left">tax(10%)</p>
                                    <p className="value">
                                        {parseFloat(
                                            (
                                                state?.subTotalPrice * 0.1
                                            ).toFixed(2)
                                        )}
                                        <span className="tk">tk</span>
                                    </p>
                                </div>
                                <div className="sub-total total">
                                    <p className="left">total</p>
                                    <p className="value">
                                        {state?.finalPrice}
                                        <span className="tk">tk</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OrderPage;
