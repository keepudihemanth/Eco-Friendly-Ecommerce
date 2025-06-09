// src/pages/Home.js

import React, { useState } from "react";
import { getRecommendations } from "../api";
import GreenStore from "../components/GreenStore"; // Adjust path if needed
import "../styles/main.css";

const Home = () => {
  const [category, setCategory] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!category.trim()) {
      setError("Please enter a category.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getRecommendations(category);
      setRecommendations(data);
    } catch (err) {
      setError("Failed to fetch recommendations.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>🌿 GreenStore Product Recommender</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a product category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-input"
        />
        <button onClick={handleFetch} className="fetch-button">
          Get Recommendations
        </button>
      </div>

      {loading && <p>Loading recommendations...</p>}
      {error && <p className="error">{error}</p>}

      <GreenStore recommendations={recommendations} />
    </div>
  );
};

export default Home;
