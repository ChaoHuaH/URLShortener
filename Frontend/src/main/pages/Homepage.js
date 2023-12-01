import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import ad_adobe from "../../images/adobe.png";
import { IconContext } from "react-icons";
import { FaBeer, FaTruck, FaRegSmile, FaRegFrown, FaRegCopy, FaEdit } from "react-icons/fa";
import { TfiStatsUp } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const Homepage = ({longURL, setLongURL}) => {

    let [shortURL, setShortURL] = useState("");
    let [tempLongURL, setTempLongURL] = useState("");
    // let [longURL, setLongURL] = useState("");
    const handleOnChange = (e) => {
        let inputValue = e.target.value;
        setTempLongURL(inputValue)
    }

    useEffect(() => {
        if (longURL) {
          // Fetch data from the specified URL using longURL state
           fetch(`http://localhost:8080/to-shortURL?longURL=${longURL}`, {
             method: "get"
           })
             .then(response => {
                 return response.json()
             })
             .then(data => {
                 setShortURL(data.shortenedURL);
             })
             .catch(error => {
               console.error("Error fetching data:", error);
             });
        }
      }, [longURL]);



    const handleShortenClick = () => {
        setLongURL(tempLongURL);        
        setTempLongURL("");
        let shortenResult = document.querySelector(".shortenResult");
        shortenResult.style.visibility = "visible";
    }

    const handleCopyClick = async () => {
        console.log("copy")
        await navigator.clipboard.writeText(`http://localhost:8080/rl/${shortURL}`);
    }

    const navigate = useNavigate()
    const handleEditClick = () => {
        console.log("redirect")
        let path = '/customization';
        navigate(path);
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
                <div className="urlShortener">
                    <input
                        id="longURLInput"
                        type="text"
                        placeholder="Enter a link here"
                        onChange={handleOnChange}
                        value={tempLongURL}
                    />
                    <button id="shorten" onClick={handleShortenClick}>Shorten</button>
                </div>

                <div className="shortenResult">
                    <div className="up">
                        <div className="left">
                            <a href={`http://localhost:8080/rl/${shortURL}`} target="_blank">{shortURL}</a>
                            &nbsp;&nbsp;
                            
                        </div>
                        <div className="right">
                            <button onClick={handleCopyClick}>
                                &nbsp;<FaRegCopy className="icon" /> Copy&nbsp;
                            </button>
                            <button onClick={handleEditClick}>
                                &nbsp;<FaEdit className="icon" /> Edit&nbsp;
                            </button>
                            <button>
                                &nbsp;<TfiStatsUp className="icon" /> Stats&nbsp;
                            </button>
                        
                        </div>
                    </div>
                    <div className="down">
                        <p>
                            Long URL: &nbsp;<a href={longURL} target="_blank">{longURL}</a>
                        </p>
                    </div>
                </div>

                {/* <button onClick={handleShortenClick}>add</button> */}
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
                                <FaRegSmile color="green" />&nbsp;&nbsp;
                                <span> 30 Monthly Short Links</span>
                            </p>
                            <p>
                                <FaRegSmile color="green" />&nbsp;&nbsp;
                                <span> Basic Link Redirects</span>
                            </p>
                            <p>
                                <FaRegFrown color="red" />&nbsp;&nbsp;
                                <span> Advertisement Included</span>
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
                                <FaRegSmile color="green" />&nbsp;&nbsp;
                                <span> 100 Monthly Short Links</span>
                            </p>
                            <p>
                                <FaRegSmile color="green" />&nbsp;&nbsp;
                                <span> Custom Link Redirects</span>
                            </p>
                            <p>
                                <FaRegSmile color="green" />&nbsp;&nbsp;
                                <span> No Advertisement</span>
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
                                <FaRegSmile color="green" />&nbsp;&nbsp;
                                <span> Unlimited Short Links</span>
                            </p>
                            <p>
                                <FaRegSmile color="green" />&nbsp;&nbsp;
                                <span> Custom Link Redirects</span>
                            </p>
                            <p>
                                <FaRegSmile color="green" />&nbsp;&nbsp;
                                <span> No Advertisement</span>
                            </p>
                            <p>
                                <FaRegSmile color="green" />&nbsp;&nbsp;
                                <span> Analysis</span>
                            </p>
                            <p>
                                <FaRegSmile color="green" />&nbsp;&nbsp;
                                <span> 24/7 email phone support</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
