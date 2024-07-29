"use client";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

const LoginForm = ({ setIsShowLoginForm }) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const temp = {
            resturantName: "testing resturant name",
            resturantOwner: "testing owner",
        };
        const options = {
            method: "POST",
            body: JSON.stringify(temp),
        };
        let response = await fetch(
            "http://localhost:3000/api/resturant/auth",
            options
        );
        const result = await response.json();
        console.log(result);
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
                    <h3 className="title">Back to Login</h3>
                </div>
                {/* input-1:resturant email */}
                <div className="input-row">
                    <label htmlFor="">resturant email address:</label>
                    <input
                        type="email"
                        placeholder="Enter email address"
                        {...register("resturantEmail", {
                            required: {
                                value: true,
                                message: "Resturant email address is requird",
                            },
                        })}
                    />
                    {errors?.resturantEmail && (
                        <span className="input-error">
                            {errors?.resturantEmail?.message}
                        </span>
                    )}
                </div>

                {/* input-2:resturant password */}
                <div className="input-row">
                    <label htmlFor="">resturant password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter resturant password"
                        {...register("resturantPassword", {
                            required: {
                                value: true,
                                message: "Restuant password is requird",
                            },
                        })}
                    />
                    {errors?.resturantPassword && (
                        <span className="input-error">
                            {errors?.resturantPassword?.message}
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
                    <button type="submit">login</button>
                </div>

                <p className="form-toggler-text">
                    Don't have an account?
                    <span
                        onClick={() => {
                            setIsShowLoginForm(false);
                        }}
                        className=""
                    >
                        Register now
                    </span>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
