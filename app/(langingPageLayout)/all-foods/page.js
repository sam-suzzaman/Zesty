"use client";
import FoodCard from "@/components/Shared/FoodCard/FoodCard";
import LandingPageTitle from "@/components/Shared/LandingPageTitle/LandingPageTitle";
import Loading from "@/components/Shared/Loading/Loading";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useSession } from "next-auth/react";

const AllFoodsPage = () => {
    const [loading, setLoading] = useState(true);
    const [foods, setFoods] = useState(null);
    const { status, data: User } = useSession();

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

    if (loading || status === "loading") {
        return (
            <div className="all-food-page-wrapper">
                <div className="page-container">
                    <LandingPageTitle
                        title="our"
                        fancyTitle="foods"
                        result="0"
                    />
                    <div className="mt-12">
                        <Loading />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="all-food-page-wrapper">
                <div className="page-container">
                    <LandingPageTitle
                        title="our"
                        fancyTitle="foods"
                        result={foods?.length}
                    />
                    <div className="foods-container">
                        {foods?.map((food) => (
                            <FoodCard food={food} role={User?.user?.role} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllFoodsPage;
