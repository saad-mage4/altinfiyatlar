import { useApiQuery } from '@/hooks/useApi';
import React from 'react'
import { Loader } from '../UI';
import { default_list } from '../UI/comman/default_list';

const CurrencyList = () => {
    const { data: Currency, isLoading } = useApiQuery(
        'liveExchangeRates',
        'https://www.nosyapi.com/apiv2/service/economy/live-exchange-rates',
        { apiKey: import.meta.env.VITE_NOSY_TOKEN }
    );

    const showCurrency = Currency?.data?.slice(0, 6)?.map((item, index) => {
        let random = Math.floor(Math.random() * 10);
        return (
            <>
                <li key={index}>
                    <div className="est-left">
                        <span className="country">{item?.currencyCode}</span>
                        <span className="currency">
                            {item?.targetCurrencyCode}
                        </span>
                    </div>
                    <div className="est-right">
                        <span className="rate-disabled">{item?.dayHigh}</span>
                        <span className="rate-current">{item?.dayLow}</span>
                        <span
                            className={`rate-percentage ${random <= 5 ? "rate-green" : "rate-red"
                                }`}
                        >
                            %{item?.changeRate}
                        </span>
                    </div>
                </li>
            </>
        );
    });

    return (
        <>
            {isLoading ? <Loader /> :
                Currency?.data?.length > 0
                    ? showCurrency
                    : default_list}
        </>
    )
}

export default CurrencyList
