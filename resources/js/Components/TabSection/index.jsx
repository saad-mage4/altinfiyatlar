import "./TabsSection.scss";
import { Link } from "@inertiajs/react";
import { RealTimePrice, GoldData } from "../Gold";
import TabFooter from "./TabFooter";
import { useThemeTab } from "@/context/ThemeTabContext";
const TabsSection = () => {
    // const { activeTab, handleTab } = useThemeTab();

    // const getClassNames = (tabName) => {
    //     const isShowArticlesPage = window.location.pathname === "/showarticles";
    //     return `tab-link ${
    //         isShowArticlesPage ? "" : activeTab === tabName ? "active" : ""
    //     }`;
    // };
    const getClassNames = (tabHref) => {
        return `tab-link ${
            window?.location?.pathname === tabHref ? "active" : ""
        }`;
    };

    const tabs = [
        { name: "Ana sayfa", id: "tab1", href: "/" },
        { name: "Altin fiyatlari", id: "tab2", href: "/goldprices" },
        { name: "Altin cevirici", id: "tab3", href: "#" },
        { name: "Haberler", id: "tab4", href: "#" },
        { name: "Doviz", id: "tab5", href: "#" },
        { name: "Uzman yorumlari", id: "tab6", href: "#" },
        { name: "Community", id: "tab7", href: "#" },
        { name: "Articles", id: "tab8", href: "/showarticles" },
    ];

    // const tabComponents = {
    //     "/": <GoldData />,
    //     "/goldprices": <RealTimePrice />,
    //     "/altincevirici": <div>Altin Cevirici Component</div>,
    //     "/haberler": <div>Haberler Component</div>,
    //     "/doviz": <div>Doviz Component</div>,
    //     "/uzmanyorumlari": <div>Uzman Yorumlari Component</div>,
    //     "/community": <div>Community Component</div>,
    //     "/showarticles": <div>Articles Component</div>,
    // };

    const componentMapping = {
        tab1: <GoldData />,
        tab2: <RealTimePrice />,
        tab3: "",
        tab4: "",
        tab5: "",
        tab6: "",
        tab7: "",
        tab8: <GoldData />,
    };

    const tabComponents = tabs.reduce((acc, tab) => {
        if (tab.href !== "#") {
            acc[tab.href] = componentMapping[tab.id] || <GoldData />;
        }
        return acc;
    }, {});

    return (
        <>
            <div className="py-5 tabs-wrapper bg-custom-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="gap-5 pb-2 tabs-links d-flex">
                                {/* {tabs?.map((tab) => (
                                    <a
                                        key={tab?.id}
                                        onClick={handleTab(tab?.id)}
                                        className={getClassNames(tab?.id)}
                                    >
                                        {tab?.name}
                                    </a>
                                ))} */}
                                {tabs?.map((tab) => (
                                    <Link
                                        key={tab?.id}
                                        className={getClassNames(tab?.href)}
                                        href={tab?.href}
                                    >
                                        {tab?.name}
                                    </Link>
                                ))}
                                {/* <Link
                                    className={`tab-link ${
                                        window.location.pathname ===
                                        "/showarticles"
                                            ? "active"
                                            : ""
                                    }`}
                                    href="/showarticles"
                                >
                                    Articles
                                </Link> */}
                            </div>
                        </div>
                    </div>

                    {/* show the content  */}
                    <div className="mt-4 row stock-tabs">
                        {/* {tabComponents[activeTab]} */}
                        {tabComponents[window?.location?.pathname] || (
                            <GoldData />
                        )}
                    </div>
                    <TabFooter />
                </div>
            </div>
        </>
    );
};

export default TabsSection;
