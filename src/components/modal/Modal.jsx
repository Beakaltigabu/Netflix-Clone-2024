import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CloseIcon from '@mui/icons-material/Close';
import VideoPreview from '../VideoPreview/VideoPreview';
import './Modal.css';

const Modal = ({ movie, onClose }) => {
    const [videoData, setVideoData] = useState(null);
    const [movieDetails, setMovieDetails] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const [videoResponse, detailsResponse, similarResponse] = await Promise.all([
                    axios.get(`/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_API_KEY}`),
                    axios.get(`/movie/${movie.id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=credits`),
                    axios.get(`/movie/${movie.id}/similar?api_key=${import.meta.env.VITE_API_KEY}`)
                ]);

                const trailer = videoResponse.data.results.find(
                    video => video.type === "Trailer" && video.site === "YouTube"
                );
                setVideoData(trailer);
                setMovieDetails(detailsResponse.data);
                setSimilarMovies(similarResponse.data.results.slice(0, 6));
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };

        fetchMovieData();
    }, [movie]);

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <button className="modal__close" onClick={onClose}>
                    <CloseIcon />
                </button>

                <div className="modal__hero">
                    {!isPlaying ? (
                        <div className="modal__preview">
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title}
                                className="modal__backdrop"
                            />
                            <div className="modal__hero-content">
                                <h1 className="modal__title">{movie.title}</h1>
                                <div className="modal__actions">
                                    <button
                                        className="modal__button modal__button--play"
                                        onClick={() => setIsPlaying(true)}
                                    >
                                        <PlayArrowIcon /> Play
                                    </button>
                                    <button className="modal__button modal__button--secondary">
                                        <AddIcon />
                                    </button>
                                    <button className="modal__button modal__button--secondary">
                                        <ThumbUpOutlinedIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <VideoPreview
                            movie={movie}
                            videoData={videoData}
                            onClose={() => setIsPlaying(false)}
                        />
                    )}
                </div>

                <div className="modal__info">
                    <div className="modal__metadata">
                        <span className="modal__match">98% Match</span>
                        <span>{movieDetails?.release_date?.split('-')[0]}</span>
                        <span className="modal__rating">TV-MA</span>
                        <span>{Math.floor(movieDetails?.runtime / 60)}h {movieDetails?.runtime % 60}m</span>
                        <span className="modal__quality">HD</span>
                    </div>

                    <div className="modal__overview">{movie.overview}</div>

                    <div className="modal__details">
                        <div className="modal__cast">
                            <span className="label">Cast:</span>
                            {movieDetails?.credits?.cast?.slice(0, 5).map(actor => actor.name).join(', ')}
                        </div>
                        <div className="modal__genres">
                            <span className="label">Genres:</span>
                            {movieDetails?.genres?.map(genre => genre.name).join(', ')}
                        </div>
                    </div>

                    {similarMovies.length > 0 && (
                        <div className="modal__similar">
                            <h3>More Like This</h3>
                            <div className="similar__grid">
                                {similarMovies.map(similar => (
                                    <div key={similar.id} className="similar__item">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300${similar.backdrop_path}`}
                                            alt={similar.title}
                                        />
                                        <div className="similar__info">
                                            <div className="similar__metadata">
                                                <span className="match">95% Match</span>
                                                <span className="rating">TV-MA</span>
                                            </div>
                                            <h4>{similar.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
