"use client";
import { USER_ROLES } from "@/lib/Constants";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

const LoginForm = ({ setIsShowLoginForm }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const route = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                type: USER_ROLES.RESTURANT,
                redirect: false,
            });
            console.log(response);

            if (response.ok) {
                toast.success("Successfully Login!");
            } else {
                toast.error(`Login failed (${response?.error})`);
            }
        } catch (error) {
            toast.error(`Login failed (${error?.message || error})`);
            console.log(error);
        }

        setIsLoading(false);
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
                    <label htmlFor="">resturant's email:</label>
                    <input
                        type="email"
                        placeholder="Enter email address"
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

                {/* input-2:resturant password */}
                <div className="input-row">
                    <label htmlFor="">resturant's password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter resturant password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is requird",
                            },
                        })}
                    />
                    {errors?.password && (
                        <span className="input-error">
                            {errors?.password?.message}
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
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "loading..." : "login"}
                    </button>
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
