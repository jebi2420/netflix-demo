import React from 'react';
import YouTube from 'react-youtube';

function MovieVideo({video}) {
    // 'type'이 'Trailer'인 항목들만 필터링
    const teaserVideos = video.results?.filter(item => item.type === "Trailer");

    // 필터링된 결과에서 첫 번째 항목의 'key' 추출
    const videoId = teaserVideos?.[0]?.key;


    const opts = {
        height: '100%',
        width: '100%',
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
