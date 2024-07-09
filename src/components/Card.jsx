import React from 'react';
import './Card.css'; // Assuming you have a CSS file for styling

const Card = ({ title, image, genre, cast, director, description }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-details"><strong>Genre:</strong> {genre}</p>
        <p className="card-details"><strong>Cast:</strong> {cast}</p>
        <p className="card-details"><strong>Director:</strong> {director}</p>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
