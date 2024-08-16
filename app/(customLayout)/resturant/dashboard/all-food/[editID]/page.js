"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/components/Shared/Loading/Loading";
import DashboardPageTitle from "@/components/Shared/DashboardPageTitle/DashboardPageTitle";
import { useSession } from "next-auth/react";

const EditFoodPage = (props) => {
    const router = useRouter();
    const foodID = props.params.editID;

    const [food, setFood] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const { status, data: User } = useSession();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        fetchFoodHandler();
    }, [foodID]);

    const fetchFoodHandler = async () => {
        setIsLoading(true);
        setIsError(false);

        let url = `http://localhost:3000/api/resturant/food/edit/${foodID}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        if (!result.status) {
            console.log(result);
            setIsError(`${result.message} (${result.result})`);
            setFood(null);
        } else {
            setIsError(false);
            setFood(result.result);
        }

        setIsLoading(false);
    };

    const onSubmit = async (data) => {
        const getResturant = localStorage.getItem("user");
        const resturantData = JSON.parse(getResturant);

        if (food.foodOfResturant !== User?.user?._id) {
            toast.error(`Unauthorized (You don't have permission to update)`);
        } else {
            const mergedFood = {
                foodTitle: data.foodTitle,
                foodPrice: data.foodPrice * 1,
                foodDescription: data.foodDescription,
                foodThumbnail: data.foodThumbnail,
                foodOfResturant: resturantData?._id,
            };
            const options = {
                method: "PUT",
                body: JSON.stringify(mergedFood),
            };
            let response = await fetch(
                `http://localhost:3000/api/resturant/food/edit/${foodID}`,
                options
            );

            const result = await response.json();
            if (result.status) {
                toast.success(`Done, ${result.message}`);
                reset();
                router.push(`../all-food`);
            } else {
                console.log(result);
                toast.error(`Operation failed (${result?.message})`);
            }
        }
    };

    if (isLoading || status === "loading") {
        return <Loading />;
    }
    if (isError) {
        return <h3 className="">{isError}</h3>;
    }

    return (
        <div className="edit-food-page-wrapper">
            <DashboardPageTitle
                title="Update/Edit food"
                subtitle="Update your food items to fullfill customers demand"
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
                                defaultValue={food?.foodTitle}
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
                                defaultValue={food?.foodPrice}
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
                                defaultValue={food?.foodThumbnail}
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
                                defaultValue={food?.foodDescription}
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
                        <button type="submit">update now</button>
                        <button
                            type="button"
                            className="cancel-update-btn"
                            onClick={() => router.push(`../all-food`)}
                        >
                            cancel update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditFoodPage;
