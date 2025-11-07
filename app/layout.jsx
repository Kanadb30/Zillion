import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "Zillion - Shop smarter",
    description: "Zillion - Shop smarter",
};

// Hint: browsers request /favicon.ico by default. We'll point metadata icons
// to the files in the public folder. Please place your generated
// favicon.ico and/or favicon.png in the project's `public/` directory.
export const icons = {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.png'
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
        <html lang="en" className="dark">
            <body className={`${outfit.className} antialiased bg-gray-900 text-white`}>
                <StoreProvider>
                    <Toaster />
                    {children}
                </StoreProvider>
            </body>
        </html>
        </ClerkProvider>
    );
}
