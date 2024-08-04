"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

const RegisterForm = ({ setIsShowLoginForm }) => {
    const [showPassword, setShowPassword] = useState(false);
    const route = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        if (data.resturantPassword !== data.resturantConfirmPassword) {
            toast.error("Confirm password not matched!");
        } else {
            delete data.resturantConfirmPassword;
            const options = {
                method: "POST",
                body: JSON.stringify(data),
            };
            let response = await fetch(
                "http://localhost:3000/api/resturant/auth",
                options
            );
            const result = await response.json();

            if (result.status) {
                console.log(result);
                delete result.result.password;
                localStorage.setItem("user", JSON.stringify(result.result));
                toast.success("Successfully registerd!");
                route.push("/resturant/dashboard");
            } else {
                console.log(result);
                toast.error(`Registration failed (${result?.message})`);
            }
        }
    };

    return (
        <div className="auth-form-container">
            <form
                className="auth-form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                {/* form title row */}
                <div className="auth-title-row">
                    <h6 className="form-name">customer</h6>
                    <h3 className="title">Welcome to Register</h3>
                </div>
                {/* input-1:resturant email */}
                <div className="input-row">
                    <label htmlFor="">customer's email address:</label>
                    <input
                        type="email"
                        placeholder="Enter email address"
                        {...register("customerEmail", {
                            required: {
                                value: true,
                                message: "Customer email address is requird",
                            },
                        })}
                    />
                    {errors?.customerEmail && (
                        <span className="input-error">
                            {errors?.customerEmail?.message}
                        </span>
                    )}
                </div>

                {/* input-2:resturant name */}
                <div className="input-row">
                    <label htmlFor="">customer's name:</label>
                    <input
                        type="text"
                        placeholder="Enter resturant name"
                        {...register("customerName", {
                            required: {
                                value: true,
                                message: "A valid customer name is requird",
                            },
                        })}
                    />
                    {errors?.customerName && (
                        <span className="input-error">
                            {errors?.customerName?.message}
                        </span>
                    )}
                </div>

                {/* input-3:resturant  address*/}
                {/* <div className="input-row">
                    <label htmlFor="">resturant address:</label>
                    <input
                        type="text"
                        placeholder="Enter resturant address"
                        {...register("resturantAddress", {
                            required: {
                                value: true,
                                message: "A valid Resturant address is requird",
                            },
                        })}
                    />
                    {errors?.resturantAddress && (
                        <span className="input-error">
                            {errors?.resturantAddress?.message}
                        </span>
                    )}
                </div> */}

                {/* input-4:resturant city name */}
                {/* <div className="input-row">
                    <label htmlFor="">resturant city name:</label>
                    <input
                        type="text"
                        placeholder="Enter resturant city name"
                        {...register("resturantCityName", {
                            required: {
                                value: true,
                                message:
                                    "A valid Resturant City Name is requird",
                            },
                        })}
                    />
                    {errors?.resturantCityName && (
                        <span className="input-error">
                            {errors?.resturantCityName?.message}
                        </span>
                    )}
                </div> */}

                {/* input-5:resturant contact number */}
                {/* <div className="input-row">
                    <label htmlFor="">resturant contact number:</label>
                    <input
                        type="text"
                        placeholder="Enter resturant name"
                        {...register("resturantContactNumber", {
                            required: {
                                value: true,
                                message:
                                    "A valid Resturant contact number is requird",
                            },
                        })}
                    />
                    {errors?.resturantContactNumber && (
                        <span className="input-error">
                            {errors?.resturantContactNumber?.message}
                        </span>
                    )}
                </div> */}

                {/* input-6:resturant password */}
                <div className="input-row">
                    <label htmlFor="">password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter a password"
                        {...register("customerPassword", {
                            required: {
                                value: true,
                                message: "A password is requird",
                            },
                        })}
                    />
                    {errors?.customerPassword && (
                        <span className="input-error">
                            {errors?.customerPassword?.message}
                        </span>
                    )}
                </div>

                {/* input-7:resturant confirm password */}
                <div className="input-row">
                    <label htmlFor="">confirm password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter resturant confirm password"
                        {...register("customerConfirmPassword", {
                            required: {
                                value: true,
                                message: "A confirm password is requird",
                            },
                        })}
                    />
                    {errors?.customerConfirmPassword && (
                        <span className="input-error">
                            {errors?.customerConfirmPassword?.message}
                        </span>
                    )}
                </div>

                {/* Show/hide password */}
                <div className="show-pass-toggler">
                    <input
                        type="checkbox"
                        id="togglePassword"
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="togglePassword">show password</label>
                </div>
                {/* submit btn */}
                <div className="input-row auth-btn-row">
                    <button type="submit">register</button>
                </div>

                <p className="form-toggler-text">
                    Already have an account?
                    <span
                        onClick={() => {
                            setIsShowLoginForm(true);
                        }}
                    >
                        login now
                    </span>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
