import React from 'react'
import "../../styles/style.css"

const Homepage = () => {
  return (
    <div>
        <div className='homepage'>
            <div className="urlShortener">
                <input id="longURL" type="text" name="longURL" />
                <button>Shorten!</button>
            </div>
        </div>
    </div>
    
  )
}

export default Homepage