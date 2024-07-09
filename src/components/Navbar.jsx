import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Navbar.css'; // Import your CSS file for navbar styling

const Navbar = ({ onGenreSelect, onSearch }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d&language=en-US'
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-title">MOVIEFIX</div>
      </div>
      <div className="menu-bar">
        <ul className="menu-list">
          {genres.map((genre) => (
            <li key={genre.id} className="menu-item">
              <button onClick={() => onGenreSelect(genre.id)}>{genre.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
