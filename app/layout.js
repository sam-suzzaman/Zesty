import CartContextWrapper from "@/context/CartContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/services/AuthProvider";

import { Poppins } from "next/font/google";
const poppins = Poppins({
    weight: ["300", "400", "500", "600", "600", "800", "900"],
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                {/* make sure to keep toaster above children */}
                <Toaster position="top-center" />
                <AuthProvider>
                    <CartContextWrapper>{children}</CartContextWrapper>
                </AuthProvider>
            </body>
        </html>
    );
}
