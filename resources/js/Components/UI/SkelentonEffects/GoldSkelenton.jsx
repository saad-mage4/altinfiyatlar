import React from 'react'
import Skeleton from 'react-loading-skeleton'

const GoldSkelenton = () => {
    return (
        <div className="item d-flex align-items-center justify-content-center">
            <div className="gap-2 content d-flex flex-column">
                <Skeleton width={100} height={20} className="mb-2" />
                <Skeleton height={20} className="justify-end mb-2" />
                <div className="gap-2 ratio__ d-flex align-items-center">
                    <Skeleton width={20} height={20} className="mr-2" />
                    <Skeleton width={50} height={20} className="mr-2" />
                    <Skeleton width={50} height={20} />
                </div>
            </div>
        </div>
    )
}

export default GoldSkelenton
