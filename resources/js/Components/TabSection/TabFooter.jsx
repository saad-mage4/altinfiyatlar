import { useApiQuery } from "@/hooks/useApi";
import { Link } from "@inertiajs/react";
import React from "react";

const TabFooter = () => {
    const { data: articles } = useApiQuery("get-articles", "/get-articles");
    return (
        <div className="mt-4 row">
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="gap-5 left-info d-flex align-items-center">
                    <h5 className="info-title">SON HABERLER</h5>
                    <p>{articles && articles[0]?.title}</p>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 right-info">
                <Link href="/showarticles" className="more-news">
                    TUM HABERLER
                </Link>
            </div>
        </div>
    );
};

export default TabFooter;
