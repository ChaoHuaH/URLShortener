import {React, useState} from "react";
import { Link } from "react-router-dom";
import ad_adobe from "../../images/adobe.png";
import { IconContext } from "react-icons";
import { FaBeer, FaTruck, FaRegSmile, FaRegFrown, FaRegCopy, FaEdit } from "react-icons/fa";
import { TfiStatsUp } from "react-icons/tfi";

const Homepage = () => {
    let [shortURL, setShortURL] = useState("yourShortUrl.com");
    let [longURL, setLongURL] = useState("");
    const handleShortenClick = () => {
        console.log("Shorten the URL");
        setShortURL("www.linkpulseddfd.com")
        setLongURL("www.linkpulseLongssssssss.com")
    }

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(shortURL);
        console.log("COPY!!!!!!");
    }

    return (
        <div className="homepage">
            <div className="urlShortenerContainer">
                <h2>URL Shortener</h2>
                <p>
                    LinkPulse is a URL shortening service to track and share
                    your short URLs{" "}
                </p>
                <div className="advertisement">
                    <div className="ad">
                        <Link to="https://www.adobe.com/" target="_blank">
                            <img src={ad_adobe} alt="advertisement" />
                        </Link>
                    </div>
                </div>
                <form action="" className="urlShortener">
                    <input
                        id="longURL"
                        type="text"
                        name="longURL"
                        placeholder="Enter a link here"
                        // onChange={}
                    />
                    <button id="shorten" onClick={handleShortenClick}>
                        Shorten
                    </button>
                </form>

                <div className="shortenResult">
                    <div className="up">
                        <div className="left">
                            <a href={shortURL}>{shortURL}</a>
                            &nbsp;&nbsp;
                            
                        </div>
                        <div className="right">
                            <button onClick={handleCopyClick}>
                                &nbsp;<FaRegCopy className="icon" /> Copy&nbsp;
                            </button>
                            <button>
                                &nbsp;<FaEdit className="icon" /> Edit&nbsp;
                            </button>
                            <button>
                                &nbsp;<TfiStatsUp className="icon" /> Stats&nbsp;
                            </button>
                        
                        </div>
                    </div>
                    <div className="down">
                        <p>
                            Long URL: &nbsp;<a href={longURL}>{longURL}</a>
                        </p>
                    </div>
                </div>

                <button onClick={handleShortenClick}>add</button>
            </div>

            <div className="features">
                <IconContext.Provider
                    value={{ color: "white", className: "icon", size: "100px" }}
                >
                    <div className="feature">
                        <FaBeer className="icon" />
                        <h3>Shorten URL with Ease</h3>
                        <p>
                            Instantly transform long web addresses into sleek,
                            shareable links with our user-friendly service.
                            Enhance your online presence effortlessly by bidding
                            farewell to unwieldy URLs.
                        </p>
                    </div>
                    <div className="feature">
                        <TfiStatsUp className="icon" />
                        <h3>Track Link Clicks</h3>
                        <p>
                            Boost digital strategies with real-time link
                            tracking, insights, and detailed analytics. Measure
                            engagement and optimize content effortlessly for
                            maximum impact.
                        </p>
                    </div>
                    <div className="feature">
                        <FaTruck className="icon" />
                        <h3>Bulk URL Shortening</h3>
                        <p>
                            Streamline your link management. Easily shorten
                            multiple URLs in bulk, saving time for your content
                            and audience focus.
                        </p>
                    </div>
                </IconContext.Provider>
                ;
            </div>

            <div className="premium">
                <h3>Go Premium</h3>
                <div className="plans">
                    <div className="plan">
                        <h4>Free</h4>
                        <h3>
                            $ 0
                            <span style={{ fontSize: "1.25rem" }}> /month</span>
                        </h3>
                        <div className="pTag">
                            <p>
                                <FaRegSmile color="green" />
                                <span> 5 Monthly Short Links</span>
                            </p>
                            <p>
                                <FaRegFrown color="red" />
                                <span> Lorem ipsum dolor sit amet.</span>
                            </p>
                            <p>
                                <FaRegFrown color="red" />
                                <span> Lorem ipsum dolor sit amet.</span>
                            </p>
                            <p>
                                <FaRegFrown color="red" />
                                <span> Lorem ipsum dolor sit amet.</span>
                            </p>
                        </div>
                    </div>
                    <div className="plan">
                        <h4>Basic</h4>
                        <h3>
                            $ 20
                            <span style={{ fontSize: "1.25rem" }}> /month</span>
                        </h3>
                        <div className="pTag">
                            <p>
                                <FaRegSmile color="green" />
                                <span> 50 Monthly Short Links</span>
                            </p>
                            <p>
                                <FaRegSmile color="green" />
                                <span> Lorem ipsum dolor sit amet.</span>
                            </p>
                            <p>
                                <FaRegFrown color="red" />
                                <span> Lorem ipsum dolor sit amet.</span>
                            </p>
                            <p>
                                <FaRegFrown color="red" />
                                <span> Lorem ipsum dolor sit amet.</span>
                            </p>
                        </div>
                    </div>
                    <div className="plan">
                        <h4>Pro</h4>
                        <h3>
                            $ 50
                            <span style={{ fontSize: "1.25rem" }}> /month</span>
                        </h3>
                        <div className="pTag">
                            <p>
                                <FaRegSmile color="green" />
                                <span> 500 Monthly Short Links</span>
                            </p>
                            <p>
                                <FaRegSmile color="green" />
                                <span> Lorem ipsum dolor sit amet.</span>
                            </p>
                            <p>
                                <FaRegSmile color="green" />
                                <span> Lorem ipsum dolor sit amet.</span>
                            </p>
                            <p>
                                <FaRegSmile color="green" />
                                <span> Lorem ipsum dolor sit amet.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
