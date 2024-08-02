"use client";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const Hero = ({ setSearchInput, searchInput }) => {
    const [showLocation, setShowLocation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [searchText, setSearchText] = useState("");
    const [locations, setLocaltions] = useState(null);
    const formRef = useRef(null);

    const handleSelectCity = (city) => {
        setSelectedLocation(city);
        setShowLocation(false);
    };

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setShowLocation(false);
        }
    };

    // fetching all resturant's location
    const locationFetchHandler = async () => {
        const response = await fetch(
            "http://localhost:3000/api/resturant/cities"
        );

        const result = await response.json();

        if (result.status) {
            setLocaltions(result.result);
        } else {
            setLocaltions(null);
        }
    };
    useEffect(() => {
        locationFetchHandler();
    }, []);

    // closing location dropdown menu
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // setting searchInputs
    useEffect(() => {
        setSearchInput({ ...searchInput, selectedLocation, searchText });
    }, [selectedLocation, searchText]);

    return (
        <>
            <div className="hero-container">
                <div className="content">
                    <h3 className="hero-title">our resturents</h3>
                    <div className="search-form" ref={formRef}>
                        <input
                            type="text"
                            placeholder="Select City"
                            className="city-input search-input"
                            onClick={() => setShowLocation(true)}
                            value={selectedLocation}
                            onChange={(e) =>
                                setSelectedLocation(e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Type Food/Resturant name"
                            className="food-name-input search-input"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <div
                            className={`city-lists ${showLocation && "active"}`}
                        >
                            {locations?.map((item, i) => (
                                <li
                                    key={item + i}
                                    className="city"
                                    onClick={() => handleSelectCity(item)}
                                >
                                    {item}
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
