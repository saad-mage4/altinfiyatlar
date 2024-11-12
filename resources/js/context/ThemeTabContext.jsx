import { useApiQuery } from "@/hooks/useApi";
import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeTabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState("tab1");

    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setShowLoader(true);
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [activeTab]);

    const { data: ExchangeRates, isLoading } = useApiQuery(
        'currency-exchange-rate',
        "https://www.nosyapi.com/apiv2/service/economy/currency/exchange-rate",
        {
            type: "gold",
            apiKey: import.meta.env.VITE_NOSY_TOKEN,
        }
    );

    const handleTab = (tabName) => (e) => {
        e.preventDefault();
        setActiveTab(tabName);
    };
    return (
        <ThemeContext.Provider value={{ activeTab, setActiveTab, handleTab, ExchangeRates, isLoading, showLoader }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeTab = () => useContext(ThemeContext);
