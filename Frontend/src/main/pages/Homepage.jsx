import {React, useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import ad_adobe from "../../images/adobe.png";
import { IconContext } from "react-icons";
import { FaBeer, FaTruck, FaRegSmile, FaRegFrown, FaRegCopy, FaEdit } from "react-icons/fa";
import { TfiStatsUp } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import LineChart from "../components/LineChart";

export const baseBackendUrl = "https://linkpulse-backend-dot-rice-comp-539-spring-2022.uk.r.appspot.com"
/** 
 * const chartData = {
    "dailyVisitCounts": [
        {
            "date": "2023-11-01",
            "viewCount": 12
        },
        {
            "date": "2023-11-02",
            "viewCount": 17
        },
        {
            "date": "2023-11-03",
            "viewCount": 8
        },
        {
            "date": "2023-11-04",
            "viewCount": 15
        },
        {
            "date": "2023-11-05",
            "viewCount": 20
        },
        {
            "date": "2023-11-06",
            "viewCount": 25
        },
        {
            "date": "2023-11-07",
            "viewCount": 18
        },
        {
            "date": "2023-11-08",
            "viewCount": 22
        },
        {
            "date": "2023-11-09",
            "viewCount": 24
        },
        {
            "date": "2023-11-10",
            "viewCount": 19
        }
    ]
};
 * 
*/

const Homepage = ({longURL, setLongURL}) => {

    const {loggedin} = useGlobalContext();
    let [shortURL, setShortURL] = useState("");
    let [tempLongURL, setTempLongURL] = useState("");
    const [analytic, setAnalytic] = useState({});
    const [show, setShow] = useState(false);
    // let [longURL, setLongURL] = useState("");
    const { getCurrentDate, getDate30DaysAgo } = require('./FormatDate');
    const currentDate = getCurrentDate();
    const aMonthAgo = getDate30DaysAgo();
    const handleOnChange = (e) => {
        let inputValue = e.target.value;
        setTempLongURL(inputValue)
    }
    
    const fetchAnalyticsData = async () => {
        try {
            const response = await fetch(`${baseBackendUrl}/analytic?url=${longURL}/&start=${aMonthAgo}/&end=${currentDate}`);
            const data = await response.json();
            console.log(data);
            setAnalytic(data);
        } catch (error) {
            console.log(error);
        }

    }
    
    useEffect(() => {
        if (longURL) {
           fetch(`${baseBackendUrl}/to-shortURL?longURL=${longURL}`, {
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
        console.log(currentDate);
        fetchAnalyticsData();
      }, [longURL]);



    const handleShortenClick = () => {
        setLongURL(tempLongURL);        
        setTempLongURL("");
        let shortenResult = document.querySelector(".shortenResult");
        shortenResult.style.visibility = "visible";
    }

    const handleCopyClick = async () => {
        console.log("copy")
        await navigator.clipboard.writeText(`${baseBackendUrl}/rl/${shortURL}`);
    }

    const handleStatsClick = () => {
        setShow(true);
    }

    const navigate = useNavigate()
    const handleEditClick = () => {
        if (loggedin) {
            console.log("redirect")
            let path = '/customization';
            navigate(path);
        } else {
            alert("Please login first.");
        }
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
                            <a href={`${baseBackendUrl}/rl/${shortURL}`} target="_blank">{shortURL}</a>
                            &nbsp;&nbsp;
                            
                        </div>
                        <div className="right">
                            <button onClick={handleCopyClick}>
                                &nbsp;<FaRegCopy className="icon" /> Copy&nbsp;
                            </button>
                            <button onClick={handleEditClick}>
                                &nbsp;<FaEdit className="icon" /> Edit&nbsp;
                            </button>
                            <button onClick={handleStatsClick}>
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
                {show && 
                    <div>
                        <h1>Website Veiwcount of Past 30 Days</h1>
                        <LineChart data={analytic} />
                    </div>
                }

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
