import { useThemeTab } from "@/context/ThemeTabContext";
import { Chart } from ".";
import { GoldPriceCalculation, Table } from "./Gold";

const HomeContent = () => {
    const { activeTab } = useThemeTab();
    return (
        <>
            <div className="my-3">
                {/* {activeTab == "tab2" ?
                    <Table />
                    :
                    <>
                        <Chart />
                        <Table />
                        <GoldPriceCalculation />
                    </>
                } */}
                <Chart />
                <Table />
                <GoldPriceCalculation />
            </div>
        </>
    );
};

export default HomeContent;
