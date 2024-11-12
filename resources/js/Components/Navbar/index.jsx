import { useState, useEffect } from "react";
import "./Navbar.scss";
import { Logo, Person, Mode, LightMode } from "@/images";
import { Link } from "@inertiajs/react";
import Dropdown from "../Dropdown";
import axios from "axios";
import LiveClockUpdate from "../Clock";
import { useApiQuery } from "@/hooks/useApi";
import Image from "../UI/Image";
import { useTheme } from "@/context/ThemeContext";
import GoogleTranslate from "../GoogleTranslate";

function Navbar({ userID, userName }) {
    const { theme, toggleTheme } = useTheme();
    const { data: images, isLoading: imagesLoader } = useApiQuery(
        "images",
        "/get-images"
    );

    useEffect(() => {
        document.body.className = theme === "dark" ? "dark_theme" : "";
    }, [theme]);
    return (
        <>
            <div
                className={`container-fluid main-nav bg-custom-dark ${
                    theme === "dark" ? "dark_theme" : ""
                }`}
                id="navbar"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-4 col-md-3 d-flex align-items-center col-logo">
                            <Link href="/">
                                {/* src={`../${HeaderLogo}`} */}
                                <Image
                                    value={`../${images?.logo_header}`}
                                    defaultSrc="https://dummyimage.com/148x35/000/f0b90b"
                                />
                            </Link>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Aratmak istediğin ogenin adini yaz."
                                    aria-label="Search"
                                />
                                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                            </form>
                        </div>
                        {/* <div className="col-lg-3 col-md-4 col-sm-12">
                            <GoogleTranslate />
                        </div> */}

                        <div className="col-lg-3 col-md-3 col-8 d-flex align-items-center justify-content-center col-right">
                            <div className="nav-right-col">
                                <div className="nav-acc-info">
                                    {/* <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal"> */}
                                    {userID != null ? (
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <a
                                                    href="#!"
                                                    className="text-lg font-bold text-white no-underline"
                                                >
                                                    {userName}
                                                </a>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                {/* <Link
                                                    className="pl-2 m-1 text-black no-underline d-block"
                                                    href={route("dashboard")}
                                                >
                                                    Dashboard
                                                </Link> */}
                                                <a
                                                    href="/dashboard"
                                                    className="pl-2 m-1 text-black no-underline d-block"
                                                >
                                                    Dashboard
                                                </a>
                                                <Link
                                                    className="pl-2 m-1 text-black no-underline d-block"
                                                    method="post"
                                                    href={route("logout")}
                                                >
                                                    Logout
                                                </Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    ) : (
                                        <a href="/login">
                                            <img src={Person} alt="" />
                                        </a>
                                    )}
                                    {/* <!-- Modal --> */}
                                    {/* <Modal /> */}
                                    <button
                                        // onClick={toggleSwitch}
                                        onClick={toggleTheme}
                                        className="dark-mode"
                                    >
                                        {/* <img
                                            src={
                                                myStyle.color === "#fff"
                                                    ? Mode
                                                    : LightMode
                                            }
                                            alt=""
                                        /> */}
                                        <img
                                            src={
                                                theme === "light"
                                                    ? Mode
                                                    : LightMode
                                            }
                                            alt={
                                                theme === "light"
                                                    ? "Light Mode"
                                                    : "Dark Mode"
                                            }
                                        />
                                    </button>
                                </div>
                                <span id="curr-time">
                                    {/* <span id="hrs">00</span>
                                    <span>:</span>
                                    <span id="min">00</span>
                                    <span>:</span>
                                    <span id="sec">00</span> */}
                                    <LiveClockUpdate showSeconds={true} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
