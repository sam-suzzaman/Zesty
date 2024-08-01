"use client";

import React from "react";
import "./style.css";
import Hero from "@/components/AllResturantsPageCom/Hero/Hero";
import ResturentList from "@/components/AllResturantsPageCom/ResturentList/ResturentList";

const AllResturantsPage = () => {
    return (
        <>
            <section className="resturants-page-container">
                <div className="resturants-container">
                    {/* hero */}
                    <Hero />

                    {/* resturant's cards row */}
                    <ResturentList />
                </div>
            </section>
        </>
    );
};

export default AllResturantsPage;
