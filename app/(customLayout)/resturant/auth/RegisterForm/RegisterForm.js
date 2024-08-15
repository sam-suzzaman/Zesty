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
        if (data.password !== data.confirmPassword) {
            toast.error("Confirm password not matched!");
        } else {
            delete data.confirmPassword;
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
                toast.success(`${result.message}${result.result}`);
                setIsShowLoginForm(true);
            } else {
                console.log(result);
                toast.error(`${result?.message}(${result.result})`);
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
                    <h6 className="form-name">resturant</h6>
                    <h3 className="title">Welcome to Register</h3>
                </div>
                {/* input-1:resturant email */}
                <div className="input-row">
                    <label htmlFor="">resturant email:</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Resturant email address is requird",
                            },
                        })}
                    />
                    {errors?.email && (
                        <span className="input-error">
                            {errors?.email?.message}
                        </span>
                    )}
                </div>

                {/* input-2:resturant name */}
                <div className="input-row">
                    <label htmlFor="">resturant name:</label>
                    <input
                        type="text"
                        placeholder="Enter resturant name"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "A valid Resturant name is requird",
                            },
                        })}
                    />
                    {errors?.name && (
                        <span className="input-error">
                            {errors?.name?.message}
                        </span>
                    )}
                </div>

                {/* input-3:resturant contact number */}
                <div className="input-row">
                    <label htmlFor="">resturant contact number:</label>
                    <input
                        type="text"
                        placeholder="Enter resturant name"
                        {...register("contactNumber", {
                            required: {
                                value: true,
                                message:
                                    "A valid Resturant contact number is requird",
                            },
                        })}
                    />
                    {errors?.contactNumber && (
                        <span className="input-error">
                            {errors?.contactNumber?.message}
                        </span>
                    )}
                </div>

                {/* input-4:resturant password */}
                <div className="input-row">
                    <label htmlFor="">resturant password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter resturant password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Restuant password is requird",
                            },
                        })}
                    />
                    {errors?.password && (
                        <span className="input-error">
                            {errors?.password?.message}
                        </span>
                    )}
                </div>

                {/* input-5:resturant confirm password */}
                <div className="input-row">
                    <label htmlFor="">resturant confirm password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter resturant confirm password"
                        {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: "Restuant confirm password is requird",
                            },
                        })}
                    />
                    {errors?.confirmPassword && (
                        <span className="input-error">
                            {errors?.confirmPassword?.message}
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
