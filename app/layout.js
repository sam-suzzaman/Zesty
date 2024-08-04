import CartContextWrapper from "@/context/CartContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {/* make sure to keep toaster above children */}
                <Toaster position="top-center" />
                <CartContextWrapper>{children}</CartContextWrapper>
            </body>
        </html>
    );
}
