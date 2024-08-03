"use client";

import React, { useState } from "react";
import "./style.css";
import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";

const FoodCard = ({ food }) => {
    const [isFavourite, setIsFavoutire] = useState(false);

    return (
        <div className="food-card" key={food._id}>
            <div className="card-body">
                <div className="food-thumb">
                    <img src={food?.foodThumbnail} alt={food?.foodTitle} />
                    <div className="overlay">
                        {isFavourite ? (
                            <IoIosHeart
                                className="icon active"
                                onClick={() => setIsFavoutire(!isFavourite)}
                            />
                        ) : (
                            <CiHeart
                                className="icon "
                                onClick={() => setIsFavoutire(!isFavourite)}
                            />
                        )}
                    </div>
                </div>
                <h3 className="card-title">{food?.foodTitle}</h3>
                <div className="resturant-profile">
                    <img
                        src="https://images.pexels.com/photos/1964471/pexels-photo-1964471.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                        alt="brand"
                        className="logo"
                    />
                    <h3 className="name">amar resturant</h3>
                </div>
                <p className="food-des">
                    {food?.foodDescription}
                    <Link href="/" className="food-detail-link">
                        See more...
                    </Link>
                </p>
            </div>
            <div className="card-footer">
                <div className="price">
                    <span className="value">{food?.foodPrice}</span> taka
                </div>
                <Link href="" className="show-more-btn">
                    add to cart <IoIosArrowForward className="icon" />
                </Link>
                {/* <Link
                    href={`/all-resturants/${item.resturantName}?id=${item._id}`}
                    className="show-more-btn"
                >
                    explore foods
                </Link> */}
            </div>
        </div>
    );
};

export default FoodCard;
