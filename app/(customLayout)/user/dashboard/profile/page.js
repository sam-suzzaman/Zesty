"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import { useSession } from "next-auth/react";
import Loading from "@/components/Shared/Loading/Loading";
import { MdOutlineModeEditOutline } from "react-icons/md";

import dayjs from "dayjs";
import { MdOutlineTaskAlt } from "react-icons/md";

import AvatarForm from "./AvatarForm";
import PersonalInfoForm from "./PersonalInfoForm";
import AddressForm from "./AddressForm";
import ChangePasswordForm from "./ChangePasswordForm";

const UserProfilePage = () => {
    const { data: User, status } = useSession();

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editState, setEditState] = useState({
        avatar: false,
        personal: false,
        address: false,
    });

    const userFetchHandler = async () => {
        setLoading(true);
        const url = `http://localhost:3000/api/user/${User.user._id}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);

        if (result.status) {
            setUserInfo(result.result);
        } else {
            setUserInfo(null);
        }
        setLoading(false);
    };

    // first user data fetch handler
    useEffect(() => {
        User?.user?._id && userFetchHandler();
        setLoading(false);
    }, [User?.user?._id]);

    // UI
    if (status === "loading" || loading) {
        return (
            <div className="h-full flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <div className="user-profile-page-container">
                <div className="page-title">
                    <h3 className="title">my profile</h3>
                </div>

                {/* Profile card row */}
                <div className="profile-card single-card">
                    <div className="display-row">
                        <div className="left-col">
                            <div className="avatar">
                                <img src={userInfo?.avatar} alt="avatar" />
                            </div>
                            <div className="content">
                                <h3 className="username">
                                    {userInfo?.username}
                                </h3>
                                <h6 className="bio">Role: {userInfo?.role}</h6>
                                <p className="email">
                                    Email: {userInfo?.email}
                                </p>
                            </div>
                        </div>
                        <div className="edit-btn-container">
                            <button
                                className="common-edit-btn"
                                onClick={() =>
                                    setEditState({
                                        avatar: !editState.avatar,
                                        personal: false,
                                        address: false,
                                    })
                                }
                            >
                                <MdOutlineModeEditOutline className="icon" />
                                edit
                            </button>
                        </div>
                    </div>

                    {editState?.avatar && (
                        <AvatarForm
                            userInfo={userInfo}
                            userFetchHandler={userFetchHandler}
                            User={User}
                        />
                    )}
                </div>

                {/* Account activity card row */}
                <div className="activity-card single-card">
                    <div className="top-row">
                        <h5 className="card-title">account activities</h5>
                    </div>

                    <div className="activities">
                        <li className="item">
                            <MdOutlineTaskAlt className="icon" />
                            joining data:
                            <span className="date-value">
                                {dayjs(userInfo?.createdAt).format(
                                    "DD MMMM, YYYY, hh:mm A"
                                )}
                            </span>
                        </li>
                        <li className="item">
                            <MdOutlineTaskAlt className="icon" />
                            last update:
                            <span className="date-value">
                                {dayjs(userInfo?.updatedAt).format(
                                    "DD MMMM, YYYY, hh:mm A"
                                )}
                            </span>
                        </li>
                    </div>
                </div>

                {/* Personal Info card row */}
                <div className="personal-info-card single-card">
                    <div className="top-row">
                        <h5 className="card-title">personal information</h5>
                        <div className="edit-btn-container">
                            <button
                                className="common-edit-btn"
                                onClick={() =>
                                    setEditState({
                                        personal: !editState.personal,
                                        address: false,
                                        avatar: false,
                                    })
                                }
                            >
                                <MdOutlineModeEditOutline className="icon" />
                                edit
                            </button>
                        </div>
                    </div>

                    {/* form row */}
                    <PersonalInfoForm
                        editState={editState}
                        userInfo={userInfo}
                        User={User}
                        userFetchHandler={userFetchHandler}
                    />
                </div>

                {/* User Address card row */}
                <div className="address-card single-card">
                    <div className="top-row">
                        <h5 className="card-title">address</h5>
                        <div className="edit-btn-container">
                            <button
                                className="common-edit-btn"
                                onClick={() =>
                                    setEditState({
                                        address: !editState.address,
                                        personal: false,
                                        avatar: false,
                                    })
                                }
                            >
                                <MdOutlineModeEditOutline className="icon" />
                                edit
                            </button>
                        </div>
                    </div>

                    {/* form */}
                    <AddressForm
                        editState={editState}
                        userInfo={userInfo}
                        User={User}
                        userFetchHandler={userFetchHandler}
                    />
                </div>

                {/* change password form */}
                <div className="change-password-card single-card">
                    <div className="top-row">
                        <h5 className="card-title">change password</h5>
                    </div>

                    <ChangePasswordForm userInfo={userInfo} />
                </div>
            </div>
        </>
    );
};

export default UserProfilePage;
