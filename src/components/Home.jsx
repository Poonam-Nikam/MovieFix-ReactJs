import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState({});
  const [year, setYear] = useState(2012);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async (year) => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`);
        setMovies((prevMovies) => ({
          ...prevMovies,
          [year]: response.data.results.slice(0, 20),
        }));
      } catch (error) {
        console.error('Error fetching the movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!movies[year]) {
      fetchMovies(year);
    }
  }, [year, movies]);

  useEffect(() => {
    const handleScroll = (event) => {
      const { scrollTop, clientHeight, scrollHeight } = event.target.scrollingElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        setYear((prevYear) => prevYear + 1);
      } else if (scrollTop === 0 && !loading) {
        setYear((prevYear) => prevYear - 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="home">
      {Object.keys(movies).sort((a, b) => b - a).map((yearKey) => (
        <div key={yearKey} className="year-section">
          <h2>Movies from {yearKey}</h2>
          <div className="movies-grid">
            {movies[yearKey].map((movie, index) => (
              <Card 
                key={index} 
                title={movie.title} 
                image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                description={movie.overview} 
              />
            ))}
          </div>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Home;
