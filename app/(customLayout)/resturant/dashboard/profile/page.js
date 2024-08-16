"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useSession } from "next-auth/react";
import { MdOutlineModeEditOutline, MdOutlineTaskAlt } from "react-icons/md";
import AvatarForm from "./AvatarForm";
import dayjs from "dayjs";
import PersonalInfoForm from "./PersonalInfoForm";
import AddressForm from "./AddressForm";
import ChangePasswordForm from "./ChangePasswordForm";

const ResturantProfilePage = () => {
    const { data: Resturant, status } = useSession();
    const [resturantData, setResturantData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editState, setEditState] = useState({
        avatar: false,
        personal: false,
        address: false,
    });

    const resturantFetchHandler = async () => {
        setLoading(true);
        const url = `http://localhost:3000/api/Resturant/${Resturant.user._id}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);

        if (result.status) {
            setResturantData(result.result);
        } else {
            setResturantData(null);
        }
        setLoading(false);
    };

    // first Resturant data fetch handler
    useEffect(() => {
        Resturant?.user?._id && resturantFetchHandler();
        setLoading(false);
    }, [Resturant?.user?._id]);

    return (
        <div className="resturant-profile-page-container">
            <div className="page-title">
                <h3 className="title">my profile</h3>
            </div>

            {/* Profile card row */}
            <div className="profile-card single-card">
                <div className="display-row">
                    <div className="left-col">
                        <div className="avatar">
                            <img src={resturantData?.avatar} alt="avatar" />
                        </div>
                        <div className="content">
                            <h3 className="Resturantname">
                                {resturantData?.name}
                            </h3>
                            <h6 className="bio">Role: {resturantData?.role}</h6>
                            <p className="email">
                                Email: {resturantData?.email}
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
                        resturantData={resturantData}
                        resturantFetchHandler={resturantFetchHandler}
                        Resturant={Resturant}
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
                            {dayjs(resturantData?.createdAt).format(
                                "DD MMMM, YYYY, hh:mm A"
                            )}
                        </span>
                    </li>
                    <li className="item">
                        <MdOutlineTaskAlt className="icon" />
                        last update:
                        <span className="date-value">
                            {dayjs(resturantData?.updatedAt).format(
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
                    resturantData={resturantData}
                    Resturant={Resturant}
                    resturantFetchHandler={resturantFetchHandler}
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
                    resturantData={resturantData}
                    Resturant={Resturant}
                    resturantFetchHandler={resturantFetchHandler}
                />
            </div>

            {/* change password form */}
            <div className="change-password-card single-card">
                <div className="top-row">
                    <h5 className="card-title">change password</h5>
                </div>

                <ChangePasswordForm resturantData={resturantData} />
            </div>
        </div>
    );
};

export default ResturantProfilePage;
