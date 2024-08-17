import React from "react";
import "./style.css";

import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import Loading from "@/components/Shared/Loading/Loading";
import LandingPageTitle from "@/components/Shared/LandingPageTitle/LandingPageTitle";

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
                <LandingPageTitle
                    title="Explore"
                    fancyTitle="Resturants"
                    result={resturants?.data?.length}
                />

                <div className="card-row">
                    {resturants?.data?.map((item) => (
                        <div className="resturant-card" key={item._id}>
                            <div className="card-body">
                                <div className="brand">
                                    <img src={item?.avatar} alt="brand" />
                                </div>
                                <h3 className="resturant-title">
                                    {item?.name}
                                </h3>
                                <p className="resturant-location">
                                    <IoLocationOutline className="icon" />
                                    {item?.cityName}
                                </p>
                                <p className="resturant-des">
                                    {item?.description?.slice(0, 80)}
                                    {" ..."}
                                </p>
                                <div className="info-list">
                                    <p className="item">
                                        <span className="fancy">Address:</span>
                                        {item?.address}
                                    </p>
                                    <p className="item">
                                        <span className="fancy">Contact:</span>
                                        {item?.contactNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link
                                    href={`/all-resturants/${item.name}?id=${item._id}`}
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
