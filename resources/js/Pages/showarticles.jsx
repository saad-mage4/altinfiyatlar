import { useApiQuery } from "@/hooks/useApi";
import Layout from "@/Layouts/Layout";
import { Link } from '@inertiajs/react';
import { useTheme } from "@/context/ThemeContext";

const showArticles = ({ auth }) => {
    const { data: articles } = useApiQuery('get-articles', "/get-articles");
    const { theme } = useTheme();

    const show = articles?.map((item) => {
        return (
            <div key={item?.id} className="mb-3 col-12 col-md-4 col-lg-3">
                <div className="gap-3 p-2 content d-flex flex-column">
                    <div className="img">
                        <img src={item?.banner} alt={`img-${item?.id}`} />
                    </div>
                    <div className="px-2 text">
                        <Link
                            className={`${theme === "dark" ? 'black-bg-head ' : 'text-black'} article-link text-decoration-none`}
                            // data-id={item.id}
                            href={`/articledetails/${item.id}`}
                        >
                            <h3 className="fs-4">{item.title}</h3>
                        </Link>
                        <p className="fs-5 black-bg-head">{item.description}</p>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <Layout user={auth.user}>
            <div className="container show_articles">
                <div className="row">
                    <div className="my-3 col-12">
                        <h1 className="text-center black-bg-head">Articles List</h1>
                    </div>
                    {show?.length > 0 ? show : <h3 className="text-center black-bg-head">No Record Found!</h3>}
                </div>
            </div>
        </Layout>
    );
};

export default showArticles;
