import React, { useEffect, useState } from "react";
import {
    euro_flag,
    gold_coin_2,
    usd_dollar,
    gold_coin,
    arrow_3,
} from "@/images";
import SkelentonEffect from "./SkelentonEffect";
import { useThemeTab } from "@/context/ThemeTabContext";

const RealTimePrice = () => {
    const { ExchangeRates, isLoading } = useThemeTab();
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        if (ExchangeRates?.data?.length > 0) {
            setSelectedItem(ExchangeRates.data[0]);
        }
    }, [ExchangeRates]);

    const handleClick = (e, item) => {
        e.preventDefault();
        setSelectedItem(item);
    };

    return (
        <div className="col-12">
            <div className="gap-5 tabs-content second-tab d-grid">
                {/* items start */}
                {/* {show_itmes_2} */}
                {/* items end */}
                <div className="item">
                    <div className="text">
                        <h3>Find the real time prices of gold anytime .</h3>
                        <p>
                            Monitor capitalization, price, daily volume, and
                            price changes of any gold in real time!
                        </p>
                    </div>
                </div>
                <div className="item">
                    {!ExchangeRates?.data && <h1>No data found</h1>}
                    <div className="grid-three d-grid">
                        {isLoading || ExchangeRates?.data?.length === 0 ? (
                            <SkelentonEffect length={11} width={120} />
                        ) : (
                            ExchangeRates?.data?.slice(0, 11)?.map((item) => (
                                <div
                                    key={item?.code}
                                    className="flex items-center gap-2 cursor-pointer list"
                                >
                                    <div className="coin-img">
                                        <img src={gold_coin} alt="gold-coin" />
                                    </div>
                                    <a
                                        className="gold-link"
                                        onClick={(e) => handleClick(e, item)}
                                    >
                                        <span>{item?.FullName}</span>
                                    </a>
                                </div>
                            ))
                        )}
                        <div className="flex items-center gap-2 list">
                            <a href="#!">
                                Tum altinlar
                                <img src={arrow_3} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="item prices">
                    {isLoading || ExchangeRates?.data.length == 0 ? (
                        <SkelentonEffect length={3} width={220} />
                    ) : (
                        <>
                            <div className="price gold">
                                <div className="icon-text">
                                    <div className="coin-img">
                                        <img
                                            src={gold_coin_2}
                                            alt="gold-coin"
                                        />
                                    </div>
                                    <span>
                                        {!selectedItem
                                            ? "No record found"
                                            : selectedItem?.FullName}
                                    </span>
                                </div>
                                <div className="price_value">
                                    <h5 className="mb-0">
                                        {selectedItem?.buying?.toFixed(2)}
                                    </h5>
                                </div>
                                <div
                                    className={`change-ratio ${
                                        selectedItem?.changeRate >= 0
                                            ? "green"
                                            : "red"
                                    }`}
                                >
                                    <span>
                                        {(
                                            selectedItem?.changeRate * 100
                                        )?.toFixed(2)}
                                        %
                                    </span>
                                </div>
                            </div>
                            <div className="price euro">
                                <div className="icon-text">
                                    <div className="coin-img">
                                        <img src={euro_flag} alt="euro-flag" />
                                    </div>
                                    <span>Euro</span>
                                </div>
                                <div className="price_value">
                                    <h5 className="mb-0">2,492.87</h5>
                                </div>
                                <div className="change-ratio green">
                                    <span>11.27</span>
                                </div>
                            </div>
                            <div className="price dollar">
                                <div className="icon-text">
                                    <div className="coin-img">
                                        <img src={usd_dollar} alt="" />
                                    </div>
                                    <span>Dollar</span>
                                </div>
                                <div className="price_value">
                                    <h5 className="mb-0">2.492,87</h5>
                                </div>
                                <div className="change-ratio red">
                                    <span>11,27</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RealTimePrice;
