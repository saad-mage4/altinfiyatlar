import React from 'react'
import Skeleton from 'react-loading-skeleton'

const HomeLoader = () => {
    return (
        <div className="container addsTable-main-wrapper" >
            <div className="row">
                <div className="col-lg-2 col-md-4">
                    <Skeleton width={216} height={500} className="mb-2" />
                </div>
                <div className='col-lg-8 col-md-8 middle-col'>
                    <Skeleton height={240} className="mb-2" />
                    <Skeleton height={300} />
                </div>
                <div className="col-lg-2 col-md-4">
                    <Skeleton width={216} height={500} className="mb-2" />
                </div>
                <div className='mt-4 row'>
                    <div className='col-lg-7 col-sm-12 '>
                        <Skeleton height={300} width={800} />
                    </div>
                    <div className='col-lg-5 col-sm-12 col-md-6 '>
                        <Skeleton height={300} width={600} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeLoader
