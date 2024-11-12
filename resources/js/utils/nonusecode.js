// useEffect(() => {
//     axios
//         .get("/get-images")
//         .then((res) => {
//             setBanners({
//                 CenterAd: res.data.home_center,
//                 LeftAd: res.data.home_left,
//                 RightAd: res.data.home_right,
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });

//     if (images) {
//         setBanners({
//             CenterAd: images?.home_center,
//             LeftAd: images?.home_left,
//             RightAd: images?.home_right,
//         });
//     }

//     const Cur_Response = async () => {
//         try {
//             const response = await axios.get(
//                 "https://www.nosyapi.com/apiv2/service/economy/live-exchange-rates",
//                 {
//                     params: {
//                         apiKey: import.meta.env.VITE_NOSY_TOKEN,
//                     },
//                 }
//             );
//             setCurrency(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const Historical_ = async () => {
//         try {
//             const response = await axios.get(
//                 "https://www.nosyapi.com/apiv2/service/economy/historical-data/exchange-rates",
//                 {
//                     params: {
//                         target: "USD",
//                         source: "TRY",
//                         startDate: "2024-01-19",
//                         endDate: "2024-07-01",
//                         apiKey: import.meta.env.VITE_NOSY_TOKEN,
//                     },
//                 }
//             );
//             // console.log(response.data.data.histories);
//             setHistorical(response.data.data.histories);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     Historical_();
//     // const timerH = setTimeout(() => {
//     // }, 5000);
//     const timer = setTimeout(() => {
//         Cur_Response();
//     }, 15000);
//     return () => clearTimeout(timer);
// }, [Currency]);


// My code



// useEffect(() => {
//     if (images) {
//         setBanners({
//             CenterAd: images?.home_center,
//             LeftAd: images?.home_left,
//             RightAd: images?.home_right,
//         });
//     }
// }, [])



// const show_itmes_2 = tabs_data_2.map((value, index) => {
//     return (
//         <div
//             key={index}
//             className="item d-flex align-items-center justify-content-center"
//         >
//             <div className="gap-2 content d-flex flex-column">
//                 <span className="title">{value.title}</span>
//                 <span className="value">{value.rates}</span>
//                 <div
//                     className={`ratio__ ${value.status == "up" ? "green" : "red"
//                         } d-flex align-items-center gap-2`}
//                 >
//                     <img
//                         src={value.status == "up" ? arrow_green : arrow_red}
//                         alt={"arrow-" + value.status}
//                     />
//                     <span className="percent__">{value.percent}</span>
//                     <span className="number__">{value.number}</span>
//                 </div>
//             </div>
//         </div>
//     );
// });



// Goole tramslate

// const googleTranslateElementInit = () => {
//     new window.google.translate.TranslateElement(
//         {
//             pageLanguage: 'tr',
//             includedLanguages: 'tr,en',
//             autoDisplay: false
//         },
//         "google_translate_element"
//     );
// };
// useEffect(() => {
//     const addScript = document.createElement("script");
//     addScript.setAttribute(
//         "src",
//         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//     );
//     document.body.appendChild(addScript);
//     window.googleTranslateElementInit = googleTranslateElementInit;
//     // Cleanup function
//     return () => {
//         document.body.removeChild(addScript);
//         delete window.googleTranslateElementInit;
//     };
// }, []);

// <div id="google_translate_element"></div>
