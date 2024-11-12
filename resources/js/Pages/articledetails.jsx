import { useApiQuery } from "@/hooks/useApi";
import Layout from "@/Layouts/Layout";
import Skeleton from "react-loading-skeleton";

export default function ArticleDetails({ auth, id }) {
    const { data: articles, isLoading } = useApiQuery('get-articles-details', `/get-articles-details/${id}`);
    return (
        <>
            <Layout user={auth.user}>
                {isLoading ? <div className="container my-3 text-center ">
                    <div className="row">
                        <div className="col-12">
                            <Skeleton width={150} enableAnimation={true} />
                        </div>
                        <div className="col-12">
                            <Skeleton width={500} height={200} enableAnimation={true} />
                            <Skeleton width={150} enableAnimation={true} />
                            <Skeleton count={3} width={300} enableAnimation={true} />
                        </div>
                    </div>
                </div> :
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="my-3 text-center black-bg-head">Article Detail</h1>
                            </div>
                            <div className="text-center col-12">
                                <img
                                    className="mx-auto my-2 d-block"
                                    src={`../${articles?.banner}`}
                                    alt={articles?.title}
                                />
                                <h2 className="mb-3 black-bg-head">{articles?.title}</h2>
                                <p className="black-bg-head">{articles?.description}</p>
                            </div>
                        </div>
                    </div>
                }
            </Layout>
        </>
    );
}
