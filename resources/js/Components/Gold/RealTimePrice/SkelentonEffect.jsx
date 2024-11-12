import React from 'react'
import Skeleton from 'react-loading-skeleton';

const SkelentonEffect = ({ width, length = 1 }) => {
    return (
        Array.from({ length: length })?.map((_, index) => (
            <div key={index} className="flex items-center gap-2 cursor-pointer list">
                {/* <div className="coin-img"> */}
                <Skeleton circle={true} height={30} width={30} enableAnimation={true} />
                {/* </div> */}
                <div className="gold-link">
                    <Skeleton width={width} enableAnimation={true} />
                </div>
            </div>
        ))
    )
}

export default SkelentonEffect
