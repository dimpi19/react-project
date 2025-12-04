import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Category = () => {
  const [state, setState] = useState([]);
  const [price, setPrice] = useState("all");
  const [vendor, setVendor] = useState("all");
  const [sort, setSort] = useState("default");
  const { category } = useParams();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    async function fetchapi() {
      try {
        const info = await axios.get(`http://localhost:3000/${category}`);
        setState(info.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }
    fetchapi();
  }, [category]);

  const filteredProducts = [];

  for (let item of state) {
    const itemPrice = Number(String(item.price).replace(/[^0-9.]/g, ""));

    if (price !== "all") {
      const [min, max] = price.split("-").map(Number);
      if (itemPrice < min || itemPrice > max) continue;
    }

    if (vendor !== "all" && item.vendor?.toLowerCase() !== vendor.toLowerCase()) {
      continue;
    }

    filteredProducts.push(item);
  }

  if (sort === "low-high") {
    filteredProducts.sort((a, b) => {
      const priceA = Number(String(a.price).replace(/[^0-9.]/g, ""));
      const priceB = Number(String(b.price).replace(/[^0-9.]/g, ""));
      return priceA - priceB;
    });
  } else if (sort === "high-low") {
    filteredProducts.sort((a, b) => {
      const priceA = Number(String(a.price).replace(/[^0-9.]/g, ""));
      const priceB = Number(String(b.price).replace(/[^0-9.]/g, ""));
      return priceB - priceA;
    });
  }

  const resetFilters = () => {
    setPrice("all");
    setVendor("all");
    setSort("default");
  };

  return (
    <div className="container my-4">
      <div className="row">
        {/* ---------- FILTER SIDEBAR ---------- */}
        <div className="col-md-3 mb-4">
          <h4 className="text-dark border-bottom pb-2">Filters</h4>

          <div className="mb-3">
            <label className="form-label fw-semibold">Price</label>
            <select
              className="form-select"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            >
              <option value="all">All</option>
              <option value="0-100">0 - 100</option>
              <option value="100-200">100 - 200</option>
              <option value="200-300">200 - 300</option>
              <option value="300-400">300 - 400</option>
              <option value="400-600">400 - 600</option>
              <option value="600-800">600 - 800</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Vendor</label>
            <select
              className="form-select"
              onChange={(e) => setVendor(e.target.value)}
              value={vendor}
            >
              <option value="all">All</option>
              <option value="Imara">Imara</option>
              <option value="Glus">Glus</option>
              <option value="Aurelia">Aurelia</option>
              <option value="Krystle">Krystle</option>
              <option value="Generic">Generic</option>
              <option value="Creature">Creature</option>
              <option value="Orion">Orion</option>
              <option value="Creator">Creator</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Sort By</label>
            <select
              className="form-select"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="default">Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <button
            className="btn btn-outline-dark w-100 mt-2"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>

        <div className="col-md-9">
          <div className="row justify-content-start g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((el, i) => (
                <div
                  key={i}
                  className="col-lg-4 col-md-6 col-sm-12"
                >
                  <div className="card h-100 shadow-sm border-0 product-card">
                    <Link to={`/${el.category}/${el.id}`}>
                      <div className="image-wrapper">
                        <img
                          src={el.image}
                          alt={el.name}
                          className="img-fluid product-img rounded-top"
                        />
                      </div>
                    </Link>
                    <div className="card-body text-center">
                      <h6 className="card-title fw-semibold">{el.name}</h6>
                      <p className="text-muted mb-1">{el.vendor}</p>
                      <p className="card-text mb-1">
                        <strong>Price:</strong> ${el.price}
                      </p>
                      <span className="badge bg-light text-dark border">
                        Size: {el.size?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-danger fs-5 w-100 mt-5">
                No products found
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 10px;
          overflow: hidden;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .image-wrapper {
          overflow: hidden;
          border-radius: 10px 10px 0 0;
        }

        .product-img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover .product-img {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Category;
