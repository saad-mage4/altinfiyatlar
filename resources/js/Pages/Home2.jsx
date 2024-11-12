import GoldGuide from "@/Components/GoldGuide";
import GoldPricesNews from "@/Components/GoldPricesNews";
import HomeContent from "@/Components/HomeContent";
import MainContent from "@/Components/MainContent";
import NewsSection from "@/Components/NewsSection";
import Layout from "@/Layouts/Layout";
import React from "react";

export default function Home2({ auth }) {
    return (
        <>
            <Layout user={auth.user}>
                <MainContent>
                    <HomeContent />
                </MainContent>
            </Layout>
        </>
    );
}
