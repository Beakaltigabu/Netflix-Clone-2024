import React, { useState, useEffect, useRef } from 'react';
import './VideoPreview.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';

const VideoPreview = ({ movie, videoData, onClose }) => {
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(50);
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);
    const progressRef = useRef(null);
    let progressTracker;

    useEffect(() => {
        if (window.YT) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            if (player) {
                player.destroy();
            }
            clearInterval(progressTracker);
        };
    }, [videoData]);

    const initPlayer = () => {
        const newPlayer = new window.YT.Player('youtube-player', {
            videoId: videoData?.key,
            playerVars: {
                autoplay: 1,
                controls: 0,
                modestbranding: 1,
                rel: 0,
                showinfo: 0
            },
            events: {
                onReady: (event) => {
                    setPlayer(event.target);
                    event.target.setVolume(volume);
                    startProgressTracker(event.target);
                }
            }
        });
    };

    const startProgressTracker = (videoPlayer) => {
        progressTracker = setInterval(() => {
            const currentTime = videoPlayer.getCurrentTime();
            const duration = videoPlayer.getDuration();
            setProgress((currentTime / duration) * 100);
        }, 1000);
    };

    const handlePlayPause = (e) => {
        e.preventDefault();
        if (player) {
            if (isPlaying) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e) => {
        e.preventDefault();
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (player) {
            player.setVolume(newVolume);
        }
    };

    const handleProgressChange = (e) => {
        e.preventDefault();
        if (player) {
            const clickPosition = (e.nativeEvent.offsetX / progressRef.current.offsetWidth);
            const newTime = clickPosition * player.getDuration();
            player.seekTo(newTime);
        }
    };

    const handleFullscreen = (e) => {
        e.preventDefault();
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div ref={containerRef} className={`video-preview ${isFullscreen ? 'fullscreen' : ''}`}>
            <div id="youtube-player" className="video-preview__player"></div>

            <div className="video-preview__controls">
                <div className="video-preview__progress" ref={progressRef} onClick={handleProgressChange}>
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="video-preview__buttons">
                    <div className="video-preview__left">
                        <button className="control-button primary" onClick={handlePlayPause}>
                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </button>

                        <div className="volume-control">
                            {volume === 0 ? <VolumeMuteIcon /> :
                             volume < 50 ? <VolumeDownIcon /> :
                             <VolumeUpIcon />}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                            />
                        </div>
                        <span className="video-preview__title">{movie?.title || movie?.name}</span>
                    </div>

                    <div className="video-preview__right">
                        <button className="control-button secondary" onClick={handleFullscreen}>
                            <FullscreenIcon />
                        </button>
                        <button className="control-button secondary" onClick={onClose}>
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPreview;
