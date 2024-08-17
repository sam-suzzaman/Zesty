import React from "react";
import "./style.css";

const LandingPageTitle = ({ title, fancyTitle, result }) => {
    return (
        <div className="landing-page-title">
            <div className="title-row">
                <h4 className="title">
                    {title}
                    <span className="fancy">{fancyTitle}</span>
                </h4>
                <h6 className="result">
                    Total
                    <span className="fancy">
                        {result < 10 ? `0${result}` : result}
                    </span>
                    results are found
                </h6>
            </div>
        </div>
    );
};

export default LandingPageTitle;
