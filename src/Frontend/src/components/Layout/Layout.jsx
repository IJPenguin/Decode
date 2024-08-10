import { lazy } from "react";
let Footer = lazy(() => import("../Footer/Footer"));
let Navbar = lazy(() => import("../Navbar/Navbar"));

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
