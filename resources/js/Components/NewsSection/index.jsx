import { Link } from '@inertiajs/react'
import { ForeksNews } from './News.config'
import './NewsSection.scss'
import { useApiQuery } from '@/hooks/useApi';
import { Ellipse } from '@/images';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from 'react';

function NewsSection() {

    const { data: articles, isLoading } = useApiQuery('get-articles', "/get-articles");

    if (isLoading) {
        return (
            <div className="container new-container-main">
                <div className="row">
                    <div className="mb-4 col-12">
                        <Skeleton width={150} />
                    </div>
                    {Array.from({ length: 12 })?.map((_, index) => {
                        return (
                            <div key={index} className="mb-5 col-md-6 col-lg-3 col-sm-12" >
                                <div className="news-inner-wrap">
                                    <Skeleton circle={true} height={40} width={40} />
                                    <div>
                                        <Skeleton width={80} />
                                        <Skeleton width={120} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="mt-4 col-lg-12 col-sm-12 col-md-12 d-flex justify-content-center">
                        <Skeleton width={120} />
                    </div>
                </div>
            </div>

        )
    }

    if (articles?.length == 0) return <h1 className="my-6 text-center black-bg-head">No Record Found!</h1>
    return (
        <>
            <div className="container new-container-main">
                <div className="row">
                    <div className="mb-4 col-12">
                        <h2 className="news-head">ALTIN FIYATLARI HABERLERI</h2>
                    </div>
                    {articles?.slice(0, 11)?.map((item) => {
                        if (item?.status === "active") {
                            return (
                                <div className="mb-5 col-md-6 col-lg-3 col-sm-12" key={item?.id}>
                                    <div className="news-inner-wrap">
                                        <img src={Ellipse} alt={item?.title} />
                                        <div>
                                            <h2 className="news-title">{item?.title}</h2>
                                            <Link href={`articledetails/${item?.id}`} target='_blank' className='post-link'>Gundem</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }


                    )}
                    <div className="mt-4 col-lg-12 col-sm-12 col-md-12 d-flex justify-content-center">
                        <Link href="/showarticles" className="more-news">TUM HABERLER</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsSection
