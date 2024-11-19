import React, { useEffect, useState } from 'react';
import requests from '../../utils/requests';
import axios from '../../utils/axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VideoPreview from '../VideoPreview/VideoPreview';
import './banner.css';

const Banner = () => {
    const [movie, setMovie] = useState({});
    const [videoData, setVideoData] = useState(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                const randomMovie = request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ];
                setMovie(randomMovie);

                // Fetch both movie and TV videos
                const [movieVideos, tvVideos] = await Promise.all([
                    axios.get(`/movie/${randomMovie.id}/videos?api_key=${import.meta.env.VITE_API_KEY}`),
                    axios.get(`/tv/${randomMovie.id}/videos?api_key=${import.meta.env.VITE_API_KEY}`)
                ]);

                const allVideos = [...movieVideos.data.results, ...tvVideos.data.results];

                // Find the best quality video
                const officialTrailer = allVideos.find(video =>
                    video.type === "Trailer" &&
                    video.name.toLowerCase().includes("official")
                );
                const trailer = allVideos.find(video => video.type === "Trailer");
                const teaser = allVideos.find(video => video.type === "Teaser");

                const selectedVideo = officialTrailer || trailer || teaser || allVideos[0];

                if (selectedVideo) {
                    setVideoData(selectedVideo);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return (
        <div className="banner">
            {!isPlaying ? (
                <div
                    className="banner__background"
                    style={{
                        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`
                    }}
                >
                    <div className="banner__vignette"></div>
                    <div className="banner__contents">
                        <div className="banner__rating">
                            <span className="match-score">98% Match</span>
                            <span className="age-rating">TV-MA</span>
                            <span className="duration">2h 30m</span>
                            <span className="quality">HD</span>
                        </div>
                        <h1 className="banner__title">
                            {movie?.title || movie?.name || movie?.original_name}
                        </h1>
                        <h1 className="banner__description">
                            {truncate(movie?.overview, 150)}
                        </h1>
                        <div className="banner__buttons">
                            <button
                                className="banner__button play"
                                onClick={() => videoData && setIsPlaying(true)}
                            >
                                <PlayArrowIcon /> Play
                            </button>
                            <button
                                className="banner__button more-info"
                                onClick={() => setShowInfo(true)}
                            >
                                <InfoOutlinedIcon /> More Info
                            </button>
                        </div>
                    </div>
                    <button
                        className="banner__mute-button"
                        onClick={() => setIsMuted(!isMuted)}
                    >
                        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </button>
                </div>
            ) : (
                <VideoPreview
                    movie={movie}
                    videoData={videoData}
                    isMuted={isMuted}
                    onClose={() => setIsPlaying(false)}
                    onMuteToggle={() => setIsMuted(!isMuted)}
                />
            )}

            {showInfo && (
                <div className="banner__modal">
                    <div className="modal__content">
                        <button
                            className="modal__close"
                            onClick={() => setShowInfo(false)}
                        >×</button>
                        <h2>{movie?.title || movie?.name}</h2>
                        <p>{movie?.overview}</p>
                        <div className="modal__details">
                            <div className="modal__metadata">
                                <span>Release: {movie?.release_date || movie?.first_air_date}</span>
                                <span>Rating: {movie?.vote_average} / 10</span>
                                <span>Language: {movie?.original_language?.toUpperCase()}</span>
                            </div>
                            <div className="modal__genres">
                                {movie?.genre_ids?.map(genreId => (
                                    <span key={genreId} className="genre-tag">
                                        {genreId}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banner;
