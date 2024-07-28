"use client";
import LoginForm from "@/components/LoginForm/LoginForm";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import React, { useState } from "react";

import "./style.css";

// form toggle text
const formToggleText = {
    loginCase: { text: "Don't have an account?", btnText: "Register now" },
    registerCase: { text: "Already have an account?", btnText: "Login now" },
};
const UserAuthenticationPage = () => {
    const [showLoginForm, setIsShowLoginForm] = useState(true);

    return (
        <div className="form_main_wrapper">
            <div className="form-row">
                {showLoginForm ? (
                    <LoginForm setIsShowLoginForm={setIsShowLoginForm} />
                ) : (
                    <RegisterForm setIsShowLoginForm={setIsShowLoginForm} />
                )}
            </div>
        </div>
    );
};

export default UserAuthenticationPage;
