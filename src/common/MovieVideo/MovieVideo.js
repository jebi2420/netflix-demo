import React from 'react';
import YouTube from 'react-youtube';

function MovieVideo({video}) {
    const videoId = video?.results[0]?.key;
    
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        },
    };

    const onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
    }

export default MovieVideo;
