import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';
import SearchBar from '../components/SearchBar'; // Adjust the import path if needed
import Navbar from '../components/Navbar'; // Adjust the import path if needed
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState({});
  const [year, setYear] = useState(2012);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [scrollDirection, setScrollDirection] = useState(null);
  const [selectedGenreId, setSelectedGenreId] = useState(null); // Default selected genre ID
  const [currentYear, setCurrentYear] = useState(2012); // Starting year for movie fetch
  const [pagesLoaded, setPagesLoaded] = useState({}); // Track loaded pages for each year
  const containerRef = useRef(null); // Reference to scroll container

  const fetchMovies = async (fetchYear, pageNum = 1, genreId = selectedGenreId) => {
    setLoading(true);
    try {
      const genreParam = genreId ? `&with_genres=${genreId}` : '';
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${fetchYear}&page=${pageNum}&vote_count.gte=100${genreParam}`
      );
      setMovies((prevMovies) => ({
        ...prevMovies,
        [fetchYear]: [...(prevMovies[fetchYear] || []), ...response.data.results.slice(0, 20)],
      }));
      setPagesLoaded((prevPages) => ({
        ...prevPages,
        [fetchYear]: pageNum,
      }));
    } catch (error) {
      console.error('Error fetching the movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentYear, 1); // Fetch initial set of movies
  }, [currentYear, selectedGenreId]);

  const handleGenreSelect = (genreId) => {
    setSelectedGenreId(genreId);
    setMovies({});
    setCurrentYear(2012); // Reset current year when genre changes
    setPagesLoaded({});
    fetchMovies(2012, 1, genreId); // Fetch initial movies for the new genre
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      const currentYear = new Date().getFullYear();

      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && year < currentYear) {
        setScrollDirection('down');
        setYear((prevYear) => prevYear + 1);
      } else if (scrollTop === 0 && !loading && year > 2000) { // Assuming 2000 is the lower limit
        setScrollDirection('up');
        setYear((prevYear) => prevYear - 1);
      }
    }
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [loading, year]);

  useEffect(() => {
    if (scrollDirection) {
      const nextPage = (pagesLoaded[year] || 1) + 1;
      fetchMovies(year, nextPage);
    }
  }, [scrollDirection, year]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery.toLowerCase());
  };

  const filteredMovies = Object.keys(movies).reduce((acc, yearKey) => {
    const filtered = movies[yearKey].filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
    if (filtered.length > 0) {
      acc[yearKey] = filtered;
    }
    return acc;
  }, {});

  return (
    <div className="home" ref={containerRef}>
      <Navbar onGenreSelect={handleGenreSelect} />
      <SearchBar onSearch={handleSearch} />
      {Object.keys(filteredMovies)
        .sort((a, b) => b - a)
        .map((yearKey) => (
          <div key={yearKey} className="year-section">
            <h2>Movies from {yearKey}</h2>
            <div className="movies-grid">
              {filteredMovies[yearKey].map((movie, index) => (
                <Card
                key={index}
                title={movie.title}
                image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                genre={movie.genre_ids.join(', ')} // Assuming genre_ids are available
                cast="John Doe, Jane Smith" // Placeholder for cast (needs to be fetched separately)
                director="Director Name" // Placeholder for director (needs to be fetched separately)
                description={movie.overview}
              />
              ))}
            </div>
          </div>
        ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Home;
