import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faStar} from '@fortawesome/free-solid-svg-icons'
import './MovieReviews.css' 

const MovieReviews = ({result}) => {
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
                <div className='movie-content'>{result.content}</div>
            </div>
        </div>
    </div>
  )
}

export default MovieReviews
