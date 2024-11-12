import GoldGuide from "@/Components/GoldGuide";
import GoldPricesNews from "@/Components/GoldPricesNews";
import HomeContent from "@/Components/HomeContent";
import MainContent from "@/Components/MainContent";
import NewsSection from "@/Components/NewsSection";
import HomeLoader from "@/Components/UI/HomeLoader";
import React, { useEffect, useState } from "react";

export default function Home() {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoader(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loader) return <HomeLoader />;
    return (
        <>
            <MainContent>
                <HomeContent />
            </MainContent>
            <GoldGuide />
            <GoldPricesNews />
            <NewsSection />
        </>
    );
}
