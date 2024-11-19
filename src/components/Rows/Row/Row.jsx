import React, { useEffect, useState, useRef } from 'react';
import axios from '../../../utils/axios';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Modal from '../../modal/Modal';
import RowSkeleton from '../../LoadingSkeleton/RowSkeleton';
import './row.css';

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const rowRef = useRef(null);
    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
            } catch (err) {
                console.error("Error fetching movies:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovies();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedMovie(null);
        document.body.style.overflow = 'auto';
    };

    const scroll = (direction) => {
        const scrollAmount = direction === 'left' ? -1200 : 1200;
        if (rowRef.current) {
            rowRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            setScrollPosition(rowRef.current.scrollLeft + scrollAmount);
        }
    };

    if (isLoading) return <RowSkeleton isLargeRow={isLargeRow} />;

    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__container">
                <button
                    className={`row__slider-button left ${scrollPosition <= 0 ? 'hidden' : ''}`}
                    onClick={() => scroll('left')}>
                    <ChevronLeftIcon />
                </button>

                <div className="row__posters" ref={rowRef}>
                    {movies?.map((movie) => (
                        <div
                            key={movie.id}
                            className="poster__container"
                            onClick={() => handleClick(movie)}
                        >
                            <img
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                <button
                    className="row__slider-button right"
                    onClick={() => scroll('right')}>
                    <ChevronRightIcon />
                </button>
            </div>

            {showModal && selectedMovie && (
                <Modal
                    movie={selectedMovie}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default Row;
