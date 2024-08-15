"use client";
import Navbar from "@/components/CommonNavbar/Navbar";
import Loading from "@/components/Shared/Loading/Loading";
import { useSession } from "next-auth/react";

export default function Home() {
    const { status, data } = useSession();

    if (status === "loading") {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main>
                <h1 className="text-center text-2xl mt-4">
                    Welcome to{" "}
                    <span className="font-bold text-purple-700">"Zesty"</span>{" "}
                    food ordering application
                </h1>
            </main>
        </>
    );
}
