import React, { useEffect, useState } from "react";

function WishList() {
  const [wishlist, setWishlist] = useState([]);

  // Load Wishlist from LocalStorage when page loads
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedData);
  }, []);

  // Remove Item from Wishlist
  const removeWishlist = (index) => {
    const updatedList = wishlist.filter((_, i) => i !== index);
    setWishlist(updatedList);
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4 fw-bold">My Wishlist </h2>

      {wishlist.length === 0 ? (
        <h5 className="text-center text-muted">Your Wishlist is Empty</h5>
      ) : (
        <div className="row">
          {wishlist.map((el, i) => (
            <div key={i} className="col-md-3 col-sm-6 mb-4">
              <div className="card shadow h-100 border-0">
                <img
                  src={el.image}
                  className="card-img-top p-3"
                  style={{
                    height: "250px",
                    objectFit: "contain",
                    borderRadius: "15px",
                  }}
                  alt=""
                />

                <div className="card-body text-center">
                  <h6 className="text-truncate">{el.name}</h6>
                  <p className="fw-bold mb-2">₹{el.price}</p>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeWishlist(i)}
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList;
