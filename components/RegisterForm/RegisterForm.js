"use client";
import React, { useState } from "react";

const RegisterForm = ({ setIsShowLoginForm }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="auth-form-container">
            <form className="auth-form">
                {/* form title row */}
                <div className="auth-title-row">
                    <h3 className="title">
                        Welcome to, <span className="fancy">Register</span>
                    </h3>
                </div>
                {/* input-1 */}
                <div className="input-row">
                    <label htmlFor="">username</label>
                    <input type="text" placeholder="Enter Username" />
                    <span className="input-error">something wrong</span>
                </div>
                {/* input-2 */}
                <div className="input-row">
                    <label htmlFor="">email</label>
                    <input type="email" placeholder="Enter email" />
                    <span className="input-error">something wrong</span>
                </div>
                {/* input-3 */}
                <div className="input-row">
                    <label htmlFor="">password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                    />
                    <span className="input-error">something wrong</span>
                </div>
                {/* input-4 */}
                <div className="input-row">
                    <label htmlFor="">confirm password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Confirm Password"
                    />
                    <span className="input-error">something wrong</span>
                </div>

                {/* input-5:Show password */}
                <div
                    className="show-pass-toggler"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <input type="checkbox" id="togglePassword" />
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
