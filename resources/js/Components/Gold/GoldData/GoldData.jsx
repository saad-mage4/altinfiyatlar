import { tabs_data } from '@/utils/TabSection.config';
import { useApiQuery } from '@/hooks/useApi';
import { arrow_green, arrow_red } from '@/images';
import React, { useEffect, useState } from 'react'
import { GoldSkelenton } from '@/Components/UI/SkelentonEffects';
import { useThemeTab } from '@/context/ThemeTabContext';

const GoldData = () => {

    // const { data: Gold, isLoading } = useApiQuery(
    //     'exchange-rate',
    //     "https://www.nosyapi.com/apiv2/service/economy/currency/exchange-rate",
    //     {
    //         type: "gold",
    //         apiKey: import.meta.env.VITE_NOSY_TOKEN,
    //     }
    // );
    const { data: Gold, isLoading } = useApiQuery(
        'coin-exacahnge-rate',
        "https://www.nosyapi.com/apiv2/service/economy/live-exchange-rates",
        {
            apiKey: import.meta.env.VITE_NOSY_TOKEN,
        }
    );

    const { showLoader } = useThemeTab();

    // const GoldData = Gold?.data?.slice(0, 7)?.map((item, index) => {
    //     let random = Math.floor(Math.random() * 5);
    //     const formattedNumber = new Intl.NumberFormat("tr-TR", {
    //         style: "decimal",
    //         minimumFractionDigits: 2,
    //         maximumFractionDigits: 2,
    //     }).format(item?.buying);
    //     return (
    //         <>
    //             <div
    //                 key={index}
    //                 className="item d-flex align-items-center justify-content-center"
    //             >
    //                 <div className="gap-2 content d-flex flex-column">
    //                     <span className="title">{item?.FullName}</span>
    //                     <span className="value">{formattedNumber}</span>
    //                     <div
    //                         className={`ratio__ ${random > 3 ? "green" : "red"
    //                             } d-flex align-items-center gap-2`}
    //                     >
    //                         <img
    //                             src={random > 3 ? arrow_green : arrow_red}
    //                             alt={"arrow-" + index}
    //                         />
    //                         <span className="percent__">
    //                             %{item?.changeRate?.toFixed(2)}
    //                         </span>
    //                         <span className="number__">
    //                             {(item?.selling / 100)?.toFixed(2)}
    //                         </span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // });
    const GoldData = Gold?.data?.slice(0, 7)?.map((item, index) => {
        let random = Math.floor(Math.random() * 5);
        return (
            <>
                <div
                    key={index}
                    className="item d-flex align-items-center justify-content-center"
                >
                    <div className="gap-2 content d-flex flex-column">
                        <span className="title">{item?.currencyCode.toUpperCase()}</span>
                        <span className="value">{item?.buy}</span>
                        <div
                            className={`ratio__ ${random > 3 ? "green" : "red"
                                } d-flex align-items-center gap-2`}
                        >
                            <img
                                src={random > 3 ? arrow_green : arrow_red}
                                alt={"arrow-" + index}
                            />
                            <span className="percent__">
                                %{item?.changeRate?.toFixed(2)}
                            </span>
                            <span className="number__">
                                {(item?.sell / 100)?.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        );
    });


    //! For If the Api has no data
    const show_items = tabs_data?.map((value, index) => {
        return (
            <div
                key={index}
                className="item d-flex align-items-center justify-content-center"
            >
                <div className="gap-2 content d-flex flex-column">
                    <span className="title">{value.title}</span>
                    <span className="value">{value.rates}</span>
                    <div
                        className={`ratio__ ${value.status == "up" ? "green" : "red"
                            } d-flex align-items-center gap-2`}
                    >
                        <img
                            src={value.status == "up" ? arrow_green : arrow_red}
                            alt={"arrow-" + value.status}
                        />
                        <span className="percent__">{value.percent}</span>
                        <span className="number__">{value.number}</span>
                    </div>
                </div>
            </div>
        );
    });

    if (showLoader || isLoading) {
        return (
            <div className="col-12">
                <div className="gap-5 tabs-content first-tab d-grid">
                    {Array.from({ length: 7 })?.map((_, index) => (
                        <GoldSkelenton key={index} />
                    ))}
                </div>
            </div>
        );
    }


    return (
        <div className="col-12">
            <div className="gap-5 tabs-content first-tab d-grid">
                {Gold?.data?.length > 0 ? GoldData : show_items}
            </div>
        </div>
    )
}

export default GoldData
