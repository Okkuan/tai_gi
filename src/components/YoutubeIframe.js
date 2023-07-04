import { useEffect, useState } from 'react'

function YouTubeIframe (props) {
    const { videoId, startTime, player, setPlayer, onPlayerReady, 
        onPlayerStateChange,  onPlaybackQualityChange } = props
        const [windowSize, setWindowsize] = useState(['400', '300'])
    useEffect(() => {
      loadYTApi()
    }, [])
  
    useEffect(() => {
        player &&
        player.loadVideoById({
          videoId: videoId,
          startSeconds: parseFloat(startTime)
        })
    }, [videoId])
  
    useEffect(() => {
      player &&
        player.seekTo(startTime)
    }, [startTime])
    const loadYTApi = () => {
      if (!window.YT) { 
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        window.onYouTubeIframeAPIReady = loadVideo; 
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else { 
        loadVideo();
      }
    }
    const loadVideo = () => { 
        setPlayer(new window.YT.Player('YoutubePlayer', {
        videoId: videoId,
        width: '100%',
        height: '100%',
        playerVars: {
          start: parseFloat(startTime),
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          enablejsapi: 1  
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onPlaybackQualityChange': onPlaybackQualityChange
        },
      }))
    }
    
    return (
      <div id="YoutubePlayer" ></div>
    )
}


export default YouTubeIframe