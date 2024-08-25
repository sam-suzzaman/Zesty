"use client";
import { ARRAY_OF_ORDER_STATUS } from "@/lib/Constants";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";

const Query = ({ query, setQuery }) => {
    const [isOptionShow, setIsOptionShow] = useState(false); // filter options show/hide state
    const optionsRef = useRef(null); // filter options ref value

    // filter menu show/hide controller
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
                    <button
                        className="option"
                        onClick={() => setQuery({ ...query, filter: "all" })}
                    >
                        DEFAULT
                    </button>
                    {ARRAY_OF_ORDER_STATUS.map((value) => (
                        <button
                            className="option"
                            key={value}
                            onClick={() =>
                                setQuery({ ...query, filter: value })
                            }
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Query;
