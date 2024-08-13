"use client";

import React, { useState } from "react";
import "./style.css";
import { useSession } from "next-auth/react";
import Loading from "@/components/Shared/Loading/Loading";
import { MdOutlineModeEditOutline } from "react-icons/md";

const ulr =
    "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600";

const UserProfilePage = () => {
    const { data: User, status } = useSession();
    const [editState, setEditState] = useState({
        avatar: false,
        personal: false,
        address: false,
    });

    // UI
    if (status === "loading") {
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

                <div className="profile-card single-card">
                    <div className="display-row">
                        <div className="left-col">
                            <div className="avatar">
                                <img src={ulr} alt="avatar" />
                            </div>
                            <div className="content">
                                <h3 className="username">{User?.user?.name}</h3>
                                <h6 className="bio">
                                    Role: {User?.user?.role}
                                </h6>
                                <p className="email">
                                    Email: {User?.user?.email}
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
                        <div className="update-row">
                            <form>
                                <div className="input-row">
                                    <label htmlFor="">avatar url:</label>
                                    <input type="text" className="input" />
                                </div>
                                <button type="submit">update</button>
                            </form>
                        </div>
                    )}
                </div>

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

                    <div className="row">
                        <form className="user-form">
                            <div
                                className={`input-row ${
                                    editState.personal && "edit"
                                }`}
                            >
                                <label htmlFor="">first name:</label>
                                <input
                                    type="text"
                                    className="input"
                                    readOnly={!editState?.personal}
                                    defaultValue="samsuzzaman sajib"
                                />
                            </div>
                            <div
                                className={`input-row ${
                                    editState.personal && "edit"
                                }`}
                            >
                                <label htmlFor="">last name:</label>
                                <input
                                    type="text"
                                    className="input"
                                    readOnly={!editState?.personal}
                                    defaultValue="samsuzzaman sajib"
                                />
                            </div>
                            <div
                                className={`input-row ${
                                    editState.personal && "edit"
                                }`}
                            >
                                <label htmlFor="">phone number:</label>
                                <input
                                    type="text"
                                    className="input"
                                    readOnly={!editState?.personal}
                                    defaultValue="samsuzzaman sajib"
                                />
                            </div>
                            <div
                                className={`input-row ${
                                    editState.personal && "edit"
                                }`}
                            >
                                <label htmlFor="">gender:</label>
                                <select
                                    className="input"
                                    readOnly={!editState?.personal}
                                >
                                    <option value="male">Male</option>
                                    <option value="male">Female</option>
                                    <option value="male">Others</option>
                                </select>
                            </div>
                            <div
                                className={`input-row extend ${
                                    editState.personal && "edit"
                                }`}
                            >
                                <label htmlFor="">email address:</label>
                                <input
                                    type="text"
                                    className="input"
                                    readOnly={!editState?.personal}
                                    defaultValue="samsuzzaman sajib"
                                />
                            </div>
                            <div
                                className={`submit-row extend ${
                                    editState?.personal && "show"
                                }`}
                            >
                                <button type="submit">update now</button>
                            </div>
                        </form>
                    </div>
                </div>

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

                    <div className="row">
                        <form className="user-form">
                            <div
                                className={`input-row ${
                                    editState.address && "edit"
                                }`}
                            >
                                <label htmlFor="">Address:</label>
                                <input
                                    type="text"
                                    className="input"
                                    readOnly={!editState?.address}
                                    defaultValue="samsuzzaman sajib"
                                />
                            </div>

                            <div
                                className={`input-row ${
                                    editState.address && "edit"
                                }`}
                            >
                                <label htmlFor="">delivary Address:</label>
                                <input
                                    type="text"
                                    className="input"
                                    readOnly={!editState?.address}
                                    defaultValue="samsuzzaman sajib"
                                />
                            </div>

                            <div
                                className={`input-row ${
                                    editState.address && "edit"
                                }`}
                            >
                                <label htmlFor="">city name:</label>
                                <input
                                    type="text"
                                    className="input"
                                    readOnly={!editState?.address}
                                    defaultValue="samsuzzaman sajib"
                                />
                            </div>

                            <div
                                className={`input-row ${
                                    editState.address && "edit"
                                }`}
                            >
                                <label htmlFor="">post code:</label>
                                <input
                                    type="text"
                                    className="input"
                                    readOnly={!editState?.address}
                                    defaultValue="samsuzzaman sajib"
                                />
                            </div>

                            <div
                                className={`submit-row extend ${
                                    editState?.address && "show"
                                }`}
                            >
                                <button type="submit">update now</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="change-password-card single-card">
                    <div className="top-row">
                        <h5 className="card-title">change password</h5>
                    </div>

                    <div className="row">
                        <form className="user-form">
                            <div className="input-row extend edit">
                                <label htmlFor="">old password:</label>
                                <input
                                    type="text"
                                    className="input"
                                    readOnly={true}
                                    defaultValue="samsuzzaman sajib"
                                />
                            </div>
                            <div className="input-row extend edit">
                                <label htmlFor="">new password:</label>
                                <input
                                    type="text"
                                    className="input"
                                    defaultValue="samsuzzaman sajib"
                                />
                            </div>
                            <div className="input-row extend edit">
                                <label htmlFor="">confirm password:</label>
                                <input
                                    type="text"
                                    className="input"
                                    defaultValue="samsuzzaman sajib"
                                />
                            </div>
                            <div className="submit-row extend show">
                                <button type="submit">change password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfilePage;
