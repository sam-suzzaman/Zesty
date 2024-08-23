"use client";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";

const Query = () => {
    const [isOptionShow, setIsOptionShow] = useState(false);
    const optionsRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                optionsRef.current &&
                !optionsRef.current.contains(event.target)
            ) {
                setIsOptionShow(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [optionsRef]);

    return (
        <div className="query-row">
            <div className="left">
                <span className="icon">
                    <CiSearch />
                </span>
                <input
                    type="text"
                    placeholder="type here"
                    className="search-box"
                />
            </div>
            <div className="right">
                <div
                    className="row"
                    onClick={() => setIsOptionShow(!isOptionShow)}
                >
                    filter by status:
                    <span className="icon">
                        <IoFilter />
                    </span>
                </div>
                <div
                    className={`options ${isOptionShow && "show"}`}
                    ref={optionsRef}
                    onClick={() => setIsOptionShow(false)}
                >
                    <button className="option">pending</button>
                    <button className="option">complete</button>
                </div>
            </div>
        </div>
    );
};

export default Query;
