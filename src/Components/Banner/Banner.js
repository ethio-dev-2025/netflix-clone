import React, { useState, useEffect } from 'react';
import './banner.css';
import axios from '../../Utils/axios';
import requests from '../../Utils/requests';

const Banner = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Add cache-busting parameter to avoid cached responses
                const timestamp = Date.now();
                const url = `${requests.fetchNetflixOriginals}&_=${timestamp}`;
                
                console.log("Fetching URL:", url);
                const request = await axios.get(url);
                console.log("API Response:", request.data);
                
                if (request.data.results && request.data.results.length > 0) {
                    // Get a truly random movie using multiple factors
                    const results = request.data.results;
                    
                    // Use multiple random factors for better distribution
                    const randomIndex1 = Math.floor(Math.random() * results.length);
                    const randomIndex2 = Math.floor(Math.random() * results.length);
                    const randomIndex3 = Math.floor(Math.random() * results.length);
                    
                    // Combine multiple random indices with timestamp
                    const finalIndex = (randomIndex1 + randomIndex2 + randomIndex3 + timestamp) % results.length;
                    
                    console.log("Random Indices:", randomIndex1, randomIndex2, randomIndex3);
                    console.log("Final Index:", finalIndex);
                    
                    const randomMovie = results[finalIndex];
                    setMovie(randomMovie);
                    
                    // Display current movie title for verification
                    console.log("🎬 Selected Movie:", randomMovie?.title || randomMovie?.name);
                    console.log("📝 Overview:", randomMovie?.overview?.substring(0, 50) + "...");
                } else {
                    console.log("No results found in API response");
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []); // Empty dependency array runs on every refresh

    // Function to truncate text
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    // Manual refresh function
    const refreshBanner = () => {
        setLoading(true);
        // Force a re-render with new random movie
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    if (loading) {
        return (
            <div className="banner_loading">
                <div className="loading_spinner"></div>
                <p>Loading amazing content...</p>
            </div>
        );
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: movie?.backdrop_path 
                    ? `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`
                    : `url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name || "Netflix Original"}
                </h1>
                
                {/* Display movie info prominently */}
                <div className="banner_movie_info">
                    <span className="movie_title_display">
                        Now Playing: {movie?.title || movie?.name || movie?.original_name}
                    </span>
                    <button onClick={refreshBanner} className="refresh_button">
                        🔄 Refresh
                    </button>
                </div>
                
                <div className="banner_buttons">
                    <button className="banner_button banner_button_play">▶ Play</button>
                    <button className="banner_button banner_button_list">+ My List</button>
                </div>
                
                <p className="banner_description">
                    {truncate(movie?.overview, 150) || "Watch this amazing Netflix original series now!"}
                </p>
                
                {/* Additional movie info */}
                <div className="banner_meta">
                    {movie?.vote_average && (
                        <span className="banner_rating">⭐ {movie.vote_average}/10</span>
                    )}
                    {movie?.first_air_date && (
                        <span className="banner_date">
                            {new Date(movie.first_air_date).getFullYear()}
                        </span>
                    )}
                </div>
            </div>
            
            <div className="banner_fadeBottom" />
        </header>
    );
};

export default Banner;