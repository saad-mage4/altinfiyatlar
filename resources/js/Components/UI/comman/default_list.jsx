import { useMemo } from "react";

export const default_list = () => {

    const default_list_data = useMemo(() => (
        <>
            {[...Array(6)]?.map((_, index) => (
                <li key={index}>
                    <div className="est-left">
                        <span className="country">USDTRY</span>
                        <span className="currency">TRY</span>
                    </div>
                    <div className="est-right">
                        <span className="rate-disabled">00.00</span>
                        <span className="rate-current">00.00</span>
                        <span className="rate-percentage rate-green">%-0.00</span>
                    </div>
                </li>
            ))}
        </>
    ), []);

    return (
        { default_list_data }
    )
}

