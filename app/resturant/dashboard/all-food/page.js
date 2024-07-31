"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import Loading from "@/components/Shared/Loading/Loading";

import { FiEdit } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { toast } from "react-hot-toast";

import swal from "sweetalert";
import { useRouter } from "next/navigation";

const page = () => {
    const [foods, setFoods] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const router = useRouter();

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

            if (!result.status) {
                setIsError(`${result.message} (${result.result})`);
                setFoods(null);
            } else {
                setIsError(false);
                setFoods(result.result);
            }
        }
        setIsLoading(false);
    };

    const handleDeleteFood = async (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteFoodHandler(id);
            } else {
                toast.success(`Cancel! Your food is safe`);
            }
        });
    };

    const deleteFoodHandler = async (id) => {
        let response = await fetch(
            `http://localhost:3000/api/resturant/food/${id}`,
            { method: "DELETE" }
        );
        const result = await response.json();
        if (result.status) {
            toast.success(`Done! ${result.message}`);
            foodListFetchHandler();
        } else {
            console.log(result);
            toast.error(`Operation failed (${result?.message})`);
        }
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
                            <tr key={food._id}>
                                <td>{index + 1}</td>
                                <td className="txt-left capitalize font-semibold">
                                    {food.foodTitle}
                                </td>
                                <td>{food.foodPrice} TK</td>
                                <td>
                                    <div className="flex  items-center justify-center">
                                        <img
                                            src={food.foodThumbnail}
                                            alt=""
                                            className="w-[50px] h-[35px] rounded-md object-cover"
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="action-row">
                                        <button className="view action-btn">
                                            <FaEye className="mr-1" /> view
                                        </button>
                                        <button
                                            className="edit action-btn"
                                            onClick={() =>
                                                router.push(
                                                    `/resturant/dashboard/all-food/${food._id}`
                                                )
                                            }
                                        >
                                            <FiEdit className="mr-1" /> edit
                                        </button>
                                        <button
                                            className="delete action-btn"
                                            onClick={() =>
                                                handleDeleteFood(food._id)
                                            }
                                        >
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
