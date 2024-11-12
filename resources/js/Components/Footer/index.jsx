import { LogoWhite, Sabah, Obilet, Spotify, appStore } from "@/images";
import { useApiQuery } from "@/hooks/useApi";
import Image from "../UI/Image";
import "./Footer.scss";
import Skeleton from "react-loading-skeleton";
import { formatUrl, getFullUrl } from "@/utils/formatUrl";

function Footer() {
    const { data: images } = useApiQuery("images", "/get-images");
    const { data: footer, isLoading: footerLoader } = useApiQuery(
        "get-footer",
        "/get-footer"
    );

    const { data: social_links, isLoading } = useApiQuery(
        "get-social-link",
        "/get-social-link"
    );

    const { data: footerlinks, isLoading: footerlinksloader } = useApiQuery(
        "get-footer-links",
        "/get-footer-links"
    );

    return (
        <>
            <div className="container-fluid footer-main-wrapper">
                <div className="container">
                    <div className="row ">
                        <div className="col-lg-4 col-md-6 col-12 foot-logo mb-5">
                            <Image
                                value={`../${images?.logo_footer}`}
                                alt="footer-logo"
                                defaultSrc="https://dummyimage.com/192x44/fff/000"
                            />
                            <div className="foot-icons-wrap">
                                {isLoading ? (
                                    <Skeleton
                                        width={500}
                                        height={200}
                                        className="mb-2"
                                    />
                                ) : (
                                    social_links?.map((links) => {
                                        return (
                                            <a
                                                key={links?.id}
                                                href={formatUrl(links?.link)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className={links?.icon}></i>
                                            </a>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6 foot-links-col">
                            <h2 className="foot-head">
                                {footerLoader ? (
                                    <Skeleton width={100} />
                                ) : (
                                    footer?.first_column
                                )}
                            </h2>
                            <ul className="foot-links">
                                {footerlinksloader
                                    ? Array.from({ length: 5 })?.map(
                                          (_, index) => (
                                              <Skeleton
                                                  width={100}
                                                  key={index}
                                              />
                                          )
                                      )
                                    : footerlinks?.column1Links?.map((link) => {
                                          return (
                                              <li key={link?.id}>
                                                  <a
                                                      href={getFullUrl(
                                                          link?.link
                                                      )}
                                                  >
                                                      {link?.title}
                                                  </a>
                                              </li>
                                          );
                                      })}
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6 foot-links-col">
                            <h2 className="foot-head">
                                {footerLoader ? (
                                    <Skeleton width={100} />
                                ) : (
                                    footer?.second_column
                                )}
                            </h2>
                            <ul className="foot-links">
                                {footerlinksloader
                                    ? Array.from({ length: 5 })?.map(
                                          (_, index) => (
                                              <Skeleton
                                                  width={100}
                                                  key={index}
                                              />
                                          )
                                      )
                                    : footerlinks?.column2Links?.map((link) => {
                                          return (
                                              <li key={link?.id}>
                                                  <a
                                                      href={getFullUrl(
                                                          link?.link
                                                      )}
                                                  >
                                                      {link?.title}
                                                  </a>
                                              </li>
                                          );
                                      })}
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6 foot-links-col">
                            <h2 className="foot-head">
                                {footerLoader ? (
                                    <Skeleton width={100} />
                                ) : (
                                    footer?.third_column
                                )}
                            </h2>
                            <ul className="foot-links">
                                {footerlinksloader
                                    ? Array.from({ length: 5 })?.map(
                                          (_, index) => (
                                              <Skeleton
                                                  width={100}
                                                  key={index}
                                              />
                                          )
                                      )
                                    : footerlinks?.column3Links?.map((link) => {
                                          return (
                                              <li key={link?.id}>
                                                  <a
                                                      href={getFullUrl(
                                                          link?.link
                                                      )}
                                                  >
                                                      {link?.title}
                                                  </a>
                                              </li>
                                          );
                                      })}
                            </ul>
                        </div>
                        {/* <div className="col-lg-2 col-md-6 col-6 foot-links-col">
                            <h2 className="foot-head">Bilgi</h2>
                            <ul className="foot-links">
                                <li>
                                    <a href="">Hesaplama</a>
                                </li>
                                <li>
                                    <a href="">Altin tahminleri</a>
                                </li>
                                <li>
                                    <a href="">Çeyrek altin fiyati</a>
                                </li>
                                <li>
                                    <a href="">Gram altin ne kadar?</a>
                                </li>
                                <li>
                                    <a href="">Dolar ne kadar?</a>
                                </li>
                                <li>
                                    <a href="">Mazot, benzin fiyati</a>
                                </li>
                                <li>
                                    <a href="">Euro kaç lira?</a>
                                </li>
                                <li>
                                    <a href="">En çok kazandiran hisseler</a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                    <div className="row footer-form-section">
                        <div className="col-lg-7 col-md-6 col-sm-12 mb-4 mb-md-0 mb-lg-0">
                            <h3 className="footer-app-head">
                                {footer?.image_title}
                            </h3>
                            <div className="footer-apps">
                                <img src={Sabah} alt="" />
                                <img src={Obilet} alt="" />
                                <img src={Spotify} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12 foot-form d-flex justify-content-end ">
                            <form className="d-flex">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Email/Phone number"
                                />
                                <button
                                    className="btn btn-warning bg-warning"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                            </form>
                            <div className="form-footer">
                                <i className="fa-solid fa-gift"></i>
                                <p className="form-footer-para">
                                    Sign up now and get upto 100USDT in rewards.
                                </p>
                            </div>
                        </div>
                        <hr className="footer-hr" />
                    </div>
                    <div className="row footer-apps-wrap d-flex align-items-center">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <img src={appStore} alt="" />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <p className="footer-copyright">
                                {footer?.copyright}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
