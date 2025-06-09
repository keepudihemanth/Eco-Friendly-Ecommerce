import React from "react";

const GreenStore = ({ recommendations }) => {
  return (
    <div className="product-grid">
      {recommendations.map((product, index) => (
        <div key={index} className="product-card">
          {/* Product Image */}
          {product.img_url && (
            <img
              src={product.img_url}
              alt={product.Title || "Product Image"}
              className="product-image"
              style={{ width: "100%", height: "200px", objectFit: "contain", borderRadius: "8px" }}
            />
          )}

          {/* Product Details */}
          <h3>{product.Title || "No Title"}</h3>
          <p><strong>Category:</strong> {product.Category || "N/A"}</p>
          <p><strong>Price:</strong> ₹{product.Price || "N/A"}</p>
          <a href={product.url || "#"} target="_blank" rel="noopener noreferrer">
            Buy Now
          </a>
        </div>
      ))}
    </div>
  );
};

export default GreenStore;