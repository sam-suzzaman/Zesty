"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import Hero from "@/components/AllResturantsPageCom/Hero/Hero";
import ResturentList from "@/components/AllResturantsPageCom/ResturentList/ResturentList";

const initialResturants = {
    data: null,
    isLoading: true,
    isError: false,
    error: "",
};
const AllResturantsPage = () => {
    const [resturants, setResturants] = useState(initialResturants);
    const [searchInput, setSearchInput] = useState({
        selectedLocation: "",
        searchText: "",
    });
    const [searchString, setSearchString] = useState("");

    // update search string
    useEffect(() => {
        let search = "http://localhost:3000/api/resturant";
        if (searchInput.searchText && searchInput.selectedLocation) {
            search = `${search}?location=${searchInput.selectedLocation}&resturantOrFood=${searchInput.searchText}`;
        } else if (searchInput.selectedLocation) {
            search = `${search}?location=${searchInput.selectedLocation}`;
        } else if (searchInput.searchText) {
            search = `${search}?resturantOrFood=${searchInput.searchText}`;
        }
        setSearchString(search);
    }, [searchInput]);

    // fetching resturants list
    useEffect(() => {
        const handleFetchResturants = async (url) => {
            setResturants({
                ...resturants,
                isError: false,
                error: "",
                isLoading: true,
            });
            // const url = `http://localhost:3000/api/resturant`;
            const response = await fetch(url);
            const result = await response.json();

            if (result.status) {
                setResturants({
                    ...resturants,
                    data: result.result,
                    isError: false,
                    error: "",
                    isLoading: false,
                });
            } else {
                setResturants({
                    ...resturants,
                    data: null,
                    isLoading: false,
                    isError: true,
                    error: result.message,
                });
            }
        };

        handleFetchResturants(searchString);
    }, [searchString]);

    return (
        <>
            <section className="resturants-page-container">
                <div className="resturants-container">
                    {/* hero */}
                    <Hero
                        setSearchInput={setSearchInput}
                        searchInput={searchInput}
                    />

                    {/* resturant's cards row */}
                    <ResturentList resturants={resturants} />
                </div>
            </section>
        </>
    );
};

export default AllResturantsPage;
