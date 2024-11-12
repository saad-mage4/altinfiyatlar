import React from "react";
import Layout from "@/Layouts/Layout";
import Home from "./Home";
const Welcome = ({ auth }) => {
    return (
        <Layout user={auth.user}>
            <Home/>
        </Layout>
    );
};

export default Welcome;
