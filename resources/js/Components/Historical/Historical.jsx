import { useApiQuery } from '@/hooks/useApi';
import React from 'react'

const Historical = () => {
    const { data: historical } = useApiQuery(
        'historical-data',
        'https://www.nosyapi.com/apiv2/service/economy/historical-data/exchange-rates',
        {
            target: "USD",
            source: "TRY",
            startDate: "2024-01-19",
            endDate: "2024-07-01",
            apiKey: import.meta.env.VITE_NOSY_TOKEN,
        }
    );

    return (
        <div>{JSON.stringify(historical?.data)}</div>
    )
}

export default Historical
