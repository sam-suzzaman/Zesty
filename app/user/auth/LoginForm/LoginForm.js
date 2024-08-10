"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

const LoginForm = ({ setIsShowLoginForm, pathHistory }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            let url = pathHistory ? pathHistory : "/";
            console.log(url);
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: true,
                callbackUrl: url,
            });
            // console.log(response);

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
        // const options = {
        //     method: "POST",
        //     body: JSON.stringify({
        //         ...data,
        //         login: true,
        //     }),
        // };
        // let response = await fetch(
        //     "http://localhost:3000/api/resturant/auth",
        //     options
        // );
        // const result = await response.json();
        // if (result.status) {
        //     console.log(result);
        //     delete result.result.password;
        //     localStorage.setItem("user", JSON.stringify(result.result));
        //     toast.success("Successfully Login!");
        //     route.push("/resturant/dashboard");
        // } else {
        //     console.log(result);
        //     toast.error(`Login failed (${result?.message})`);
        // }
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
                    <h3 className="title">Back to Login</h3>
                </div>
                {/* input-1:resturant email */}
                <div className="input-row">
                    <label htmlFor="">customer email address:</label>
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

                {/* input-2:resturant password */}
                <div className="input-row">
                    <label htmlFor="">customer password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter resturant password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Customer password is requird",
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
