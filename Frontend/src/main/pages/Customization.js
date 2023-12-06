import React from 'react'
import { useState, useEffect } from 'react';
import { FaRegCopy } from "react-icons/fa";

const baseBackendUrl = "https://linkpulse-backend-dot-rice-comp-539-spring-2022.uk.r.appspot.com"

const Customization = ({longURL, setLongURL}) => {
    let [customizeURL, setCustomizeURL] = useState("");
    let [changeTag, setChangeTag] = useState(true);

    const handleCustomizeClick = () => {
        let inputValue = document.getElementById('customizeURLInput').value
        setCustomizeURL(inputValue)
        console.log(customizeURL)

        if (changeTag) {
            setChangeTag(false)
        } else {
            setChangeTag(true)
        }
    }

    const handleCopyClick = async () => {
        console.log("copy")
        await navigator.clipboard.writeText(`${baseBackendUrl}/rl/${customizeURL}`);
    }

    useEffect(() => {
        if (longURL && customizeURL !== "") {
           fetch(`${baseBackendUrl}/custom-shortURL?longURL=${longURL}&alias=${customizeURL}`, {
             method: "get"
           })
             .then(response => {
                return response.json()
             })
             .catch(error => {
                window.alert(`${customizeURL} already in use. Please try another one.`)
                console.error("Error fetching data:", error);
            });
        }
      }, [customizeURL, longURL, changeTag]);


    return (
    <div className="customize">
        <div className="customized_area">

            <h3>Your Costomize URL</h3>
            <input 
                id="customizeURLInput" 
                type="text"
                placeholder='Your Costomize URL'
            />
            <button onClick={handleCustomizeClick}>Customize</button>
            
        </div>
        <div className="result_area">
            <div className="up">
                <div className="left">
                    Customized URL: &nbsp;<a href={`${baseBackendUrl}/rl/${customizeURL}`} target="_blank">{customizeURL}</a>
                    
                </div>
                <div className="right">
                    <button onClick={handleCopyClick}>
                        &nbsp;<FaRegCopy className="icon" /> Copy&nbsp;
                    </button>
                
                </div>
            </div>
            <div className="down">
                <p>
                    Long URL: &nbsp;<a href={longURL} target="_blank">{longURL}</a>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Customization