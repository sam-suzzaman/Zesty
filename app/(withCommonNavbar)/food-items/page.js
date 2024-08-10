"use client";
import FoodCard from "@/components/Shared/FoodCard/FoodCard";
import Loading from "@/components/Shared/Loading/Loading";
import React, { useEffect, useState } from "react";

const FoodItemsPage = () => {
    const [loading, setLoading] = useState(true);
    const [foods, setFoods] = useState(null);

    useEffect(() => {
        const fetchHandler = async () => {
            setLoading(true);
            const response = await fetch(
                "http://localhost:3000/api/common/food"
            );
            const result = await response.json();
            if (result.status) {
                setFoods(result.result);
            }
            setLoading(false);
        };
        fetchHandler();
    }, []);

    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <div className="grid grid-cols-3 gap-5 mx-auto my-12 max-w-[1200px]">
                {foods?.map((food) => (
                    <FoodCard food={food} />
                ))}
            </div>
        </>
    );
};

export default FoodItemsPage;
