"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import Loading from "@/components/Shared/Loading/Loading";

import { FiEdit } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const page = () => {
    const [foods, setFoods] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        foodListFetchHandler();
    }, []);

    const foodListFetchHandler = async () => {
        setIsLoading(true);
        setIsError(false);
        const resturantData = localStorage.getItem("user");
        const resturant = JSON.parse(resturantData);

        if (!resturant._id) {
            setIsError("no resturant found,login first");
            setFoods(null);
        } else {
            let url = `http://localhost:3000/api/resturant/food/${resturant._id}`;
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);

            if (!result.status) {
                setIsError(`${result.message} (${result.result})`);
                setFoods(null);
            } else {
                setIsError(false);
                console.log(result.result);
                setFoods(result.result);
            }
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <h3 className="">{isError}</h3>;
    }
    return (
        <div className="manage-food-page-wrapper">
            <div className="page-title-row">
                <h3 className="title">manage food</h3>
                <p className="subtitle">
                    Manage your food items of your resturant
                </p>
            </div>

            {/* food table */}
            <div className="food-list-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>price</th>
                            <th>image</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods?.map((food, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td className="txt-left capitalize">
                                    {food.foodTitle}
                                </td>
                                <td>{food.foodPrice} TK</td>
                                <td>
                                    <div className="flex  items-center justify-center">
                                        <img
                                            src={food.foodThumbnail}
                                            alt=""
                                            className="w-[50px] rounded-md"
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="action-row">
                                        <button className="view action-btn">
                                            <FaEye className="mr-1" /> view
                                        </button>
                                        <button className="edit action-btn">
                                            <FiEdit className="mr-1" /> edit
                                        </button>
                                        <button className="delete action-btn">
                                            <MdDelete className="mr-1" /> delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;
