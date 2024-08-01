import Navbar from "@/components/CommonNavbar/Navbar";

export default function Home() {
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
