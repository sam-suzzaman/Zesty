"use client";
import Loading from "@/components/Shared/Loading/Loading";
import FoodList from "@/components/SingleResturantPageCom/FoodList/FoodList";
import Hero from "@/components/SingleResturantPageCom/Hero/Hero";
import React, { useEffect, useState } from "react";

const initial = {
    isLoading: true,
    isError: false,
    error: "",
    data: null,
};
const ResturantDetailPage = (params) => {
    const resturantName = params.params.resturant;
    const resturantID = params.searchParams.id;

    const [foods, setFoods] = useState(initial);
    const [searchText, setSearchText] = useState("");

    // fetching resturant data
    useEffect(() => {
        let url;
        // generate fetch url
        if (searchText) {
            url = `http://localhost:3000/api/resturant/food/${resturantID}?foodName=${searchText}`;
        } else {
            url = `http://localhost:3000/api/resturant/food/${resturantID}`;
        }
        const handleFetchResturant = async (url) => {
            setFoods({
                ...foods,
                isLoading: true,
                isError: false,
                error: "",
            });
            const response = await fetch(url);
            const result = await response.json();

            if (result.status) {
                setFoods({
                    ...foods,
                    isLoading: false,
                    data: result.result,
                });
            } else {
                setFoods({
                    ...foods,
                    isLoading: false,
                    data: null,
                    isError: true,
                    error: result.message,
                });
            }
        };

        handleFetchResturant(url);
    }, [resturantID, searchText]);

    if (foods.isLoading) {
        return (
            <>
                <Hero
                    name={resturantName}
                    searchText={searchText}
                    setSearchText={setSearchText}
                />
                <div className="mt-12">
                    <Loading />
                </div>
            </>
        );
    }

    if (foods.isError) {
        return (
            <>
                <Hero
                    name={resturantName}
                    searchText={searchText}
                    setSearchText={setSearchText}
                />
                <div className="mt-6">
                    <h4 className="text-lg font-bold text-center">
                        {foods?.error}
                    </h4>
                </div>
            </>
        );
    }
    return (
        <>
            <Hero
                name={resturantName}
                searchText={searchText}
                setSearchText={setSearchText}
            />
            <FoodList foods={foods?.data} />
        </>
    );
};

export default ResturantDetailPage;
