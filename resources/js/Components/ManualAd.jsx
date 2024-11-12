// import { client, slot } from "@/utils/googleAds";
// import React, { useEffect } from "react";

// const ManualAd = ({ isAdBlocked, isAdConfigValid }) => {
//     // const loadAdsScript = () => {
//     //     if (
//     //         typeof window !== "undefined" &&
//     //         !document.getElementById("adsbygoogle-script")
//     //     ) {
//     //         const script = document.createElement("script");
//     //         script.id = "adsbygoogle-script";
//     //         script.src =
//     //             "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
//     //         script.async = true;
//     //         document.body.appendChild(script);
//     //     }
//     // };

//     // useEffect(() => {
//     //     loadAdsScript();

//     //     if (!isAdBlocked && isAdConfigValid) {
//     //         const interval = setInterval(() => {
//     //             if (window.adsbygoogle && window.adsbygoogle.push) {
//     //                 window.adsbygoogle.push({});
//     //                 clearInterval(interval); // Ensure the interval stops after the ad is loaded
//     //             }
//     //         }, 100);
//     //     }
//     // }, [isAdBlocked, isAdConfigValid]);

//     useEffect(() => {
//         try {
//             if (!isAdBlocked && isAdConfigValid) {
//                 (window.adsbygoogle = window.adsbygoogle || []).push({});
//             }
//         } catch (error) {
//             console.log("AdSense error:", error);
//         }
//     }, []);

//     return (
//         <ins
//             className="adsbygoogle"
//             style={{ display: "block" }}
//             data-ad-client={client}
//             data-ad-slot={slot}
//             data-ad-format="auto"
//             data-full-width-responsive="true"
//         ></ins>
//     );
// };

// export default ManualAd;
