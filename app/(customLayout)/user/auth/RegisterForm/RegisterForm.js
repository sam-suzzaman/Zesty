"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

const RegisterForm = ({ setIsShowLoginForm }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        if (data.password !== data.confirmPassword) {
            toast.error("Confirm password not matched!");
        } else {
            delete data.comfirmPassword;
            const options = {
                method: "POST",
                body: JSON.stringify(data),
            };
            let response = await fetch(
                "http://localhost:3000/api/user/signup",
                options
            );
            const result = await response.json();

            if (result.status) {
                setIsShowLoginForm(true);
                toast.success("Successfully registerd!");
            } else {
                console.log(result);
                toast.error(`Registration failed (${result?.message})`);
            }
        }
        setLoading(false);
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
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Customer email address is requird",
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
                    <label htmlFor="">customer's name:</label>
                    <input
                        type="text"
                        placeholder="Enter resturant name"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "A valid customer name is requird",
                            },
                        })}
                    />
                    {errors?.username && (
                        <span className="input-error">
                            {errors?.username?.message}
                        </span>
                    )}
                </div>

                {/* input-3:resturant password */}
                <div className="input-row">
                    <label htmlFor="">password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter a password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "A password is requird",
                            },
                        })}
                    />
                    {errors?.password && (
                        <span className="input-error">
                            {errors?.password?.message}
                        </span>
                    )}
                </div>

                {/* input-4:resturant confirm password */}
                <div className="input-row">
                    <label htmlFor="">confirm password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter resturant confirm password"
                        {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: "A confirm password is requird",
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
                    <button type="submit" disabled={loading}>
                        {loading ? "loading..." : "register"}
                    </button>
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
