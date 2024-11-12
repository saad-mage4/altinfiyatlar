import "./goldPricesNews.scss";
import LiveClockUpdate from "../Clock";
import { useApiQuery } from "@/hooks/useApi";
import { Loader } from "../UI";
import Image from "../UI/Image";
import { useState } from "react";
import CalendarTable from "./CalendarTable";
import { OldCalendar } from "@/utils/calendar_old_data";
const GoldPricesNews = () => {
    const { data: images } = useApiQuery("images", "/get-images");

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab = (tabName) => (e) => {
        e.preventDefault();
        setActiveTab(tabName);
    };

    const getClassNames = (tabName) =>
        `tab ${activeTab === tabName ? "active" : ""}`;

    const tabs = [
        { name: "Ekonomik", id: "tab1" },
        { name: "Kazançlar", id: "tab2" },
    ];

    const tabComponents = {
        tab1: <CalendarTable />,
        tab2: <OldCalendar />,
    };

    return (
        <>
            <div className="container mt-5 goldPricesNews">
                <div className="row">
                    <div className="mb-3 col-12">
                        <h4>ALTIN FIYATLARI HABERLERI</h4>
                    </div>
                    <div className="col-12 col-lg-8">
                        <div className="calendar-wrapper">
                            <div className="mb-4 row">
                                <div className="col-6">
                                    <h3 className="title">Takvimler</h3>
                                </div>
                                <div className="col-6">
                                    <div className="date-time">
                                        <span>Saat:</span>
                                        <div className="time">
                                            <LiveClockUpdate
                                                showSeconds={false}
                                            />
                                        </div>
                                        <span className="gmt">(GMT +3:00)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="cursor-pointer tabs">
                                        {tabs?.map((tab) => (
                                            <a
                                                key={tab?.id}
                                                onClick={handleTab(tab?.id)}
                                                className={getClassNames(
                                                    tab?.id
                                                )}
                                            >
                                                {tab?.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-3 col-12 table-container">
                                    <div className="content">
                                        <h5>
                                            Beklenen Önemli Ekonomik Olaylar
                                        </h5>
                                        <div className="table-responsive">
                                            <table className="table table-borderless table-responsive">
                                                <thead>
                                                    <tr>
                                                        <th>Zaman</th>
                                                        <th>Döviz</th>
                                                        <th>Olay</th>
                                                        {/* <th>Önem</th> */}
                                                        <th>Açiklanan</th>
                                                        <th className="tar">
                                                            Beklenti
                                                        </th>
                                                        <th className="tar">
                                                            Önceki
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tabComponents[activeTab]}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 bottom-sec">
                                    <a className="cursor-pointer">
                                        Tüm Olaylari Göster
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <Image
                            value={images?.bottom_img}
                            alt="right-img"
                            defaultSrc="https://dummyimage.com/411x523/000/f0b90b"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GoldPricesNews;
