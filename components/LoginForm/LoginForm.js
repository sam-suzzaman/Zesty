"use client";
import React, { useState } from "react";

const LoginForm = ({ setIsShowLoginForm }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="auth-form-container">
            <form className="auth-form">
                {/* form title row */}
                <div className="auth-title-row">
                    <h3 className="title">
                        Back to <span className="fancy">Login</span>
                    </h3>
                </div>
                {/* input-1 */}
                <div className="input-row">
                    <label htmlFor="">email</label>
                    <input type="email" placeholder="Enter Email" />
                    <span className="input-error">something wrong</span>
                </div>
                {/* input-2 */}
                <div className="input-row">
                    <label htmlFor="">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                    />
                    <span className="input-error">something wrong</span>
                </div>
                {/* input-3:Show password */}
                <div
                    className="show-pass-toggler"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <input type="checkbox" id="togglePassword" />
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
