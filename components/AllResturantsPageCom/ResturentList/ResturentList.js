import React from "react";
import "./style.css";

import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import Loading from "@/components/Shared/Loading/Loading";

// const data = [
//     {
//         _id: 1,
//         resturantName: "amar resturant",
//         resturantFoodItems: 5,
//         resturantDescription:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic possimus cumque aut libero vel amet consectetur sequi perferendis earum distinctio.",
//         resturantLogo:
//             "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=600",
//         resturantContactNumber: "01700000000",
//         resturantCityName: "kushtia",
//         resturantAddress: "N S road, kushtia",
//     },
//     {
//         _id: 2,
//         resturantName: "amar resturant",
//         resturantFoodItems: 5,
//         resturantDescription:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic possimus cumque aut libero vel amet consectetur sequi perferendis earum distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic possimus cumque aut libero vel amet consectetur sequi perferendis earum distinctio.",
//         resturantLogo:
//             "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=600",
//         resturantContactNumber: "01700000000",
//         resturantCityName: "kushtia",
//         resturantAddress: "N S road, kushtia",
//     },
//     {
//         _id: 3,
//         resturantName: "amar resturant",
//         resturantFoodItems: 5,
//         resturantDescription:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic possimus cumque aut libero vel amet consectetur sequi perferendis earum distinctio.",
//         resturantLogo:
//             "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=600",
//         resturantContactNumber: "01700000000",
//         resturantCityName: "kushtia",
//         resturantAddress: "N S road, kushtia",
//     },
//     {
//         _id: 3,
//         resturantName: "amar resturant",
//         resturantFoodItems: 5,
//         resturantDescription:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic possimus cumque aut libero vel amet consectetur sequi perferendis earum distinctio.",
//         resturantLogo:
//             "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=600",
//         resturantContactNumber: "01700000000",
//         resturantCityName: "kushtia",
//         resturantAddress: "N S road, kushtia",
//     },
// ];

const ResturentList = ({ resturants }) => {
    if (resturants.isLoading) {
        return (
            <div className="mt-8">
                <Loading />
            </div>
        );
    } else if (resturants.isError) {
        return <h3 className="">{resturants.error}</h3>;
    }

    return (
        <>
            <div className="resturants-row">
                <div className="title-row">
                    <h4 className="title">
                        Explore
                        <span className="fancy">Resturants</span>
                    </h4>
                    <h6 className="result">
                        Total
                        <span className="fancy">
                            {resturants?.data?.length < 10
                                ? `0${resturants?.data?.length}`
                                : resturants?.data?.length}
                        </span>
                        results are found
                    </h6>
                </div>
                <div className="card-row">
                    {resturants?.data?.map((item) => (
                        <div className="resturant-card" key={item._id}>
                            <div className="card-body">
                                <div className="brand">
                                    <img
                                        src={item?.resturantLogo}
                                        alt="brand"
                                    />
                                </div>
                                <h3 className="resturant-title">
                                    {item?.resturantName}
                                </h3>
                                <p className="resturant-location">
                                    <IoLocationOutline className="icon" />
                                    {item?.resturantCityName}
                                </p>
                                <p className="resturant-des">
                                    {item?.resturantDescription?.slice(0, 80)}
                                    {" ..."}
                                </p>
                                <div className="info-list">
                                    <p className="item">
                                        <span className="fancy">Address:</span>
                                        {item?.resturantAddress}
                                    </p>
                                    <p className="item">
                                        <span className="fancy">Contact:</span>
                                        {item?.resturantContactNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link
                                    href={`/all-resturants/${item.resturantName}?id=${item._id}`}
                                    className="show-more-btn"
                                >
                                    explore foods
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ResturentList;
