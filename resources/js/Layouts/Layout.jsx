import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import TabsSection from "@/Components/TabSection";
// import ThemeLoader from "@/Components/UI/Loaders/ThemeLoader/ThemeLoader";
// import { ThemeProvider } from "@/context/ThemeContext";
// import { ThemeTabProvider } from "@/context/ThemeTabContext";
// import { useEffect, useState } from "react";

const Layout = ({ children, user }) => {
    // const [loader, setLoader] = useState(true)
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setLoader(false);
    //     }, 2000);
    //     return () => clearTimeout(timer);
    // }, []);

    // if (loader) return <ThemeLoader />
    return (
        <>
            {/* <ThemeProvider>
                <ThemeTabProvider> */}
            <Navbar userID={user?.id} userName={user?.name} />
            <TabsSection/>
            {children}
            <Footer/>
            {/* </ThemeTabProvider>
            </ThemeProvider> */}

        </>
    );
};
export default Layout;
