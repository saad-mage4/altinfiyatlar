import { useApiQuery } from "@/hooks/useApi";
import { OldCalendar } from "@/utils/calendar_old_data";
import React from "react";
import { Loader } from "../UI";

const CalendarTable = () => {
    const { data, isLoading, isError, error } = useApiQuery(
        "economy-calendar",
        "https://www.nosyapi.com/apiv2/service/economy/calendar",
        {
            apiKey: import.meta.env.VITE_NOSY_TOKEN,
            date: "next-week",
        }
    );
    if (isError) {
        console.log("Calendar table", error);
    }
    const CalendarData = data?.data?.slice(0, 8)?.map((item, index) => {
        let random = Math.floor(Math.random() * 20);
        return (
            <>
                <tr key={index}>
                    <td data-label="Zaman">{random}d</td>
                    <td data-label="Döviz">{item?.paraBirimi}</td>
                    <td data-label="Olay">{item?.olay}</td>
                    <td data-label="Önem" className="d-none">
                        <div className="stars">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star light"></i>
                        </div>
                    </td>
                    <td data-label="Açiklanan">&nbsp;</td>
                    <td data-label="Beklenti" className="tar">
                        {item?.beklenti}
                    </td>
                    <td data-label="Önceki" className="tar">
                        {item?.oncekiDeger}
                    </td>
                </tr>
            </>
        );
    });
    if (isLoading) return <Loader />;
    return <>{data?.data?.length > 0 ? CalendarData : <OldCalendar />}</>;
};

export default CalendarTable;
