import React, { useState, useEffect } from 'react';
import "./Row.css";
import axios from "axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await axios.get(`https://api.themoviedb.org/3${fetchUrl}`);
                setMovies(request.data.results);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            const movieName = movie?.title || movie?.name || movie?.original_name;
            movieTrailer(movieName)
                .then((url) => {
                    if (url) {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        const videoId = urlParams.get("v");
                        setTrailerUrl(videoId);
                    }
                })
                .catch((error) => console.log("Trailer error:", error));
        }
    };

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies?.map((movie, index) => (
                    <img
                        onClick={() => handleClick(movie)}
                        key={index}
                        src={`${base_url}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`}
                        alt={movie?.name || movie?.title}
                        className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};

export default Row;