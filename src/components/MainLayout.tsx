import Navbar from "./NavBar";

import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <Navbar />

            <main className="max-w-6xl mx-auto py-8">
                hey this is main page
                <Outlet />

            </main>
        </>
    );
}