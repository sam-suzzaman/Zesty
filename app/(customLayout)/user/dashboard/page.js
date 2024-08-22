"use client";

import DashboardServiceCard from "@/components/Shared/DashboardServiceCard/DashboardServiceCard";
import DashboardWelcome from "@/components/Shared/DashboardWelcome/DashboardWelcome";
import Loading from "@/components/Shared/Loading/Loading";
import { useSession } from "next-auth/react";
import React from "react";

import { BsCurrencyDollar } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";

import "./section.style.css";

const page = () => {
    const { status, data: User } = useSession();

    if (status === "loading") {
        return (
            <div className="h-full flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <DashboardWelcome
                title={User?.user?.username}
                subtitle="Welcome,"
            />

            {/* account summery */}
            <div className="dashboard-summery-row">
                <DashboardServiceCard title="total orders" value="100">
                    <FaCartArrowDown className="icon" />
                </DashboardServiceCard>
                <DashboardServiceCard title="total costs" value="2500.900">
                    <BsCurrencyDollar className="icon" />
                </DashboardServiceCard>
            </div>

            {/* Latest orders */}
            <div className="dashboard-latest-orders">
                <h4 className="table-title">latest orders</h4>
                <table className="latest-order-table">
                    <thead>
                        <td>#id</td>
                        <td>date</td>
                        <td>total cost</td>
                        <td>status</td>
                    </thead>
                    <tbody>
                        <tr>
                            <td>03u329392303u2</td>
                            <td>20July,2024, 9:00pm</td>
                            <td>
                                <span className="tk">3500.50 </span>tk
                            </td>
                            <td>
                                <span className="status">pending</span>
                            </td>
                        </tr>
                        <tr>
                            <td>03u329392303u2</td>
                            <td>20July,2024, 9:00pm</td>
                            <td>
                                <span className="tk">3500.50 </span>tk
                            </td>
                            <td>
                                <span className="status">pending</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default page;
