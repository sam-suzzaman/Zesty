"use client";

import React from "react";
import "./style.css";

import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import DashboardPageTitle from "@/components/Shared/DashboardPageTitle/DashboardPageTitle";
import { useSession } from "next-auth/react";

const page = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const { status, data: User } = useSession();

    const onSubmit = async (data) => {
        const mergedFood = {
            ...data,
            foodPrice: data.foodPrice * 1,
            foodOfResturant: User?.user?._id,
        };

        const options = {
            method: "POST",
            body: JSON.stringify(mergedFood),
        };
        let response = await fetch(
            "http://localhost:3000/api/resturant/food",
            options
        );
        const result = await response.json();

        if (result.status) {
            toast.success(`Done, ${result.message}`);
            reset();
        } else {
            console.log(result);
            toast.error(`Operation failed (${result?.message})`);
        }
    };
    return (
        <div className="add-food-page-wrapper">
            <DashboardPageTitle
                title="add food"
                subtitle="Add a new food item for your customers"
            />
            <div className="food-form-row">
                <form
                    className="food-form"
                    onSubmit={handleSubmit(onSubmit)}
                    autoComplete="off"
                >
                    {/* 1. input fields */}
                    <div className="input-fields-container">
                        {/* input-1:food title */}
                        <div className="input-row input-1">
                            <label htmlFor="">food item name:</label>
                            <input
                                type="text"
                                placeholder="Enter food name"
                                {...register("foodTitle", {
                                    required: {
                                        value: true,
                                        message: "A valid food name is requird",
                                    },
                                })}
                            />
                            {errors?.foodTitle && (
                                <span className="input-error">
                                    {errors?.foodTitle?.message}
                                </span>
                            )}
                        </div>

                        {/* input-2:food name */}
                        <div className="input-row input-2">
                            <label htmlFor="">food price:</label>
                            <input
                                type="text"
                                placeholder="Enter food price"
                                {...register("foodPrice", {
                                    required: {
                                        value: true,
                                        message:
                                            "A valid food price is requird",
                                    },
                                })}
                            />
                            {errors?.foodPrice && (
                                <span className="input-error">
                                    {errors?.foodPrice?.message}
                                </span>
                            )}
                        </div>

                        {/* input-3:food thumbnail */}
                        <div className="input-row input-3">
                            <label htmlFor="">food item photo:</label>
                            <input
                                type="text"
                                placeholder="Enter food thumbnail"
                                {...register("foodThumbnail", {
                                    required: {
                                        value: true,
                                        message:
                                            "A valid food thumbnail is requird",
                                    },
                                })}
                            />
                            {errors?.foodThumbnail && (
                                <span className="input-error">
                                    {errors?.foodThumbnail?.message}
                                </span>
                            )}
                        </div>

                        {/* input-4:food description */}
                        <div className="input-row input-4">
                            <label htmlFor="">food item description:</label>
                            <textarea
                                type="text"
                                placeholder="Enter food description"
                                {...register("foodDescription", {
                                    required: {
                                        value: true,
                                        message:
                                            "A valid food description is requird",
                                    },
                                })}
                            />
                            {errors?.foodDescription && (
                                <span className="input-error">
                                    {errors?.foodDescription?.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* 2. Submit button row */}
                    <div className="input-row auth-btn-row">
                        <button type="submit">add food</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;
