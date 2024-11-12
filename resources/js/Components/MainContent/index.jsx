import "./MainContent.scss";
import { useApiQuery } from "@/hooks/useApi";
import Image from "../UI/Image";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
// import ManualAd from "../ManualAd";
import { useState } from "react";
import { client, slot } from "@/utils/googleAds";

const MainContent = ({ children }) => {
    const { data: images, isLoading: imagesLoader } = useApiQuery(
        "images",
        "/get-images"
    );

    //! State to track if Google Ads are available
    // const [isAdBlocked, setIsAdBlocked] = useState(false);
    // const [isAdConfigValid, setIsAdConfigValid] = useState(true);

    // const checkAdsBlock = () => {
    //     try {
    //         const testAd = document.createElement("div");
    //         testAd.className = "adsbygoogle";
    //         testAd.style = "display:inline-block;width:200px;height:200px;";
    //         document.body.appendChild(testAd);
    //         if (testAd.offsetHeight === 0) {
    //             setIsAdBlocked(true);
    //         }
    //         document.body.removeChild(testAd);
    //     } catch (error) {
    //         console.log("goole adses error", error);
    //     }
    // };

    // //! Function to validate if the Ad configuration is present
    // const validateAdConfig = () => {
    //     if (!client || client === undefined || !slot || slot === undefined) {
    //         console.log("Google Ads configuration is missing!");
    //         setIsAdConfigValid(false);
    //     }
    // };

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (imagesLoader) {
    //             console.log("Loading images...");
    //         }
    //     }, 2000);

    //     //! Check if Google Ads are blocked
    //     checkAdsBlock();

    //     //! Validate Google Ads configuration
    //     validateAdConfig();

    //     return () => clearTimeout(timer);
    // }, [imagesLoader]);
    return (
        <>
            <div className="container addsTable-main-wrapper">
                <div className="row">
                    <div className="col-lg-2 col-md-4">
                        {imagesLoader ? (
                            <Skeleton
                                width={216}
                                height={500}
                                className="mb-2"
                            />
                        ) : (
                            <Image
                                value={images?.home_left}
                                className="ad-side"
                            />
                        )}
                        {/* {!isAdBlocked && isAdConfigValid ? (
                            <ManualAd
                                isAdBlocked={isAdBlocked}
                                isAdConfigValid={isAdConfigValid}
                            />
                        ) : imagesLoader ? (
                            <Skeleton
                                width={216}
                                height={500}
                                className="mb-2"
                            />
                        ) : (
                            <Image
                                value={images?.home_left}
                                className="ad-side"
                            /> // Fallback to default banner
                        )} */}
                    </div>
                    <div className="col-lg-8 col-md-8 middle-col">
                        {imagesLoader ? (
                            <Skeleton height={240} className="mb-2" />
                        ) : (
                            <Image value={images?.home_center} />
                        )}

                        {/* {!isAdBlocked && isAdConfigValid ? (
                            <ManualAd
                                isAdBlocked={isAdBlocked}
                                isAdConfigValid={isAdConfigValid}
                            />
                        ) : imagesLoader ? (
                            <Skeleton height={240} className="mb-2" />
                        ) : (
                            <Image value={images?.home_center} />
                        )} */}
                        {children}
                    </div>
                    <div className="col-lg-2 col-md-4">
                        {imagesLoader ? (
                            <Skeleton
                                width={216}
                                height={500}
                                className="mb-2"
                            />
                        ) : (
                            <Image value={images?.home_right} />
                        )}
                        {/* {!isAdBlocked && isAdConfigValid ? (
                            <ManualAd
                                isAdBlocked={isAdBlocked}
                                isAdConfigValid={isAdConfigValid}
                            />
                        ) : imagesLoader ? (
                            <Skeleton
                                width={216}
                                height={500}
                                className="mb-2"
                            />
                        ) : (
                            <Image value={images?.home_right} /> // Fallback to default banner
                        )} */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainContent;
