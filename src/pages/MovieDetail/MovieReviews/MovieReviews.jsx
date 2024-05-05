import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faStar} from '@fortawesome/free-solid-svg-icons'
import './MovieReviews.css' 
import { useState } from 'react'

const MovieReviews = ({result}) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
  return (
    <div>
        <div className="user-review">
            <div className="user-info">
                <div className="user-profile">
                    <FontAwesomeIcon className="profile-icon" icon={faCircleUser} />
                    <h5>{result.author}</h5>
                </div>
                <div className='star-icon'><FontAwesomeIcon icon={faStar} style={{color: "#FFD43B"}} />
                &nbsp;{result?.author_details.rating}</div>
            </div>
            <div className='movie-content-area'>
                <div 
                    className='movie-content'
                    style={{
                        height: isExpanded ? 'auto' : 'calc(1.7em * 7)',
                        overflow: isExpanded ? 'visible' : 'hidden',
                        display: isExpanded ? 'inline-block' : '-webkit-box'
                    }}
                >
                    {result.content}
                </div>
                <button className='read-more-btn' onClick={toggleExpand}>{isExpanded ? 'less' : 'read more'}</button>
            </div>
        </div>
    </div>
  )
}

export default MovieReviews
