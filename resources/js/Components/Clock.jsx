import React, { useState, useEffect } from "react";

const LiveClockUpdate = ({ showSeconds }) => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timerID = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerID);
    }, []);

    const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: showSeconds ? "2-digit" : undefined,
        hour12: false,
    };

    return (
        <>
            <span>{time.toLocaleTimeString([], options)}</span>
        </>
    );
};

export default LiveClockUpdate;
