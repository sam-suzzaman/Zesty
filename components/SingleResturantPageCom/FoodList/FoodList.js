import React from "react";
import "./style.css";
import FoodCard from "@/components/Shared/FoodCard/FoodCard";

const FoodList = ({ foods }) => {
    return (
        <>
            <div className="food-list-row">
                <div className="title-row">
                    <h4 className="title">
                        Explore
                        <span className="fancy">Foods</span>
                    </h4>
                    <h6 className="result">
                        Total
                        <span className="fancy">
                            {foods?.length < 10
                                ? `0${foods?.length}`
                                : foods?.length}
                        </span>
                        results are found
                    </h6>
                </div>
                <div className="card-row">
                    {foods?.map((food) => (
                        <FoodCard food={food} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FoodList;
