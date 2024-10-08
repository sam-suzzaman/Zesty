"use client";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import React, { useState } from "react";

import "./style.css";

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
