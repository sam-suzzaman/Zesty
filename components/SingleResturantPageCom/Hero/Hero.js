import React from "react";
import "./style.css";

const Hero = ({ name, searchText, setSearchText }) => {
    return (
        <>
            <div className="r-detail-hero-container">
                <div className="content">
                    <h3 className="hero-title">{decodeURI(name)}</h3>
                    <div className="search-form">
                        <input
                            type="text"
                            placeholder="Type Food Name"
                            className="food-name-input search-input"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
