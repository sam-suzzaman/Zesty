"use client";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import React, { useState } from "react";

import "./style.css";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const UserAuthenticationPage = () => {
    const [showLoginForm, setIsShowLoginForm] = useState(true);
    const searchParams = useSearchParams();
    const pathHistory = searchParams.get("redirect");

    return (
        <div className="form_main_wrapper">
            <div className="form-row">
                {showLoginForm ? (
                    <LoginForm
                        setIsShowLoginForm={setIsShowLoginForm}
                        pathHistory={pathHistory}
                    />
                ) : (
                    <RegisterForm setIsShowLoginForm={setIsShowLoginForm} />
                )}
            </div>
        </div>
    );
};

export default UserAuthenticationPage;
