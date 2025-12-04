import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { myAction } from "./Action";

const ProductInfo = () => {
  const [state, setState] = useState({});
  const [related, setRelated] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, id } = useParams();

  useEffect(() => {
    fetchapi();
  }, [category, id]);

  async function fetchapi() {
    const info = await axios.get(`http://localhost:3000/${category}/${id}`);
    const detail = await axios.get(`http://localhost:3000/${category}`);
    setState(info.data);
    setRelated(detail.data);
  }

  const filterCategory = related.filter(
    (itm) => itm.category === state.category && itm.id !== state.id
  );

  function AddToCart() {
    alert("You added in Your Cart!");
    dispatch(myAction(state));
    navigate("/cart");
  }

function AddWish() {
  alert("You added to Wishlist");

  const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const isExist = storedWishlist.some((item) => item.id === state.id);
  if (!isExist) {
    storedWishlist.push(state);
    localStorage.setItem("wishlist", JSON.stringify(storedWishlist));
  } else {
    alert("Already in Wishlist!");
  }

  navigate("/wishlist");
}


  return (
    <div>
      {/* ---------- Product Details ---------- */}
      <div className="product-info container my-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={state.image}
              alt={state.name}
              className="img-fluid rounded shadow-sm main-img"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <p className="text-muted">{state.vendor}</p>
            <h2 className="product-title fw-bold">{state.name}</h2>
            <p className="product-price fs-4 fw-bold">${state.price}</p>

            <div className="mb-3">
              <p>Shipping</p>
              <p>Ask About This Product</p>
            </div>

            <button className="btn btn-light border mb-3">{state.size}</button>

            <p>Vendor: {state.vendor}</p>
            <p>Type: {state.type}</p>
            <p>
              Share:{" "}
              <img
                style={{ width: "37px", padding: "2px" }}
                src="https://www.freeiconspng.com/uploads/facebook-png-icon-follow-us-facebook-1.png"
                alt=""
              />
              <img
                style={{ width: "40px", padding: "2px" }}
                src="https://clipartcraft.com/images/twitter-logo-png-round-3.png"
                alt=""
              />
              <img
                style={{ width: "40px" }}
                src="https://brandslogos.com/wp-content/uploads/images/large/pinterest-circle-logo.png"
                alt=""
              />
            </p>

            <div className="product-actions mt-3">
              <button className="btn btn-dark" onClick={AddToCart}>
                Add to Cart
              </button>
              <button
                className="btn btn-outline-danger ms-3"
                onClick={AddWish}
              >
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-center my-4">Related Products</h2>
      <div className="container mb-5">
        <div className="row g-4">
          {filterCategory.slice(1, 5).map((el, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 text-center shadow-sm related-card">
                <Link to={`/${el.category}/${el.id}`} className="image-wrapper">
                  <img
                    src={el.image}
                    alt={el.name}
                    className="card-img-top related-img"
                    style={{ height: "350px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body">
                  <p className="fw-semibold">{el.name}</p>
                  <p className="fw-bold">${el.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Hover Styles ---------- */}
      <style>{`
        .related-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 10px;
          overflow: hidden;
        }

        .related-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .image-wrapper {
          display: block;
          overflow: hidden;
          border-radius: 10px 10px 0 0;
        }

        .related-img {
          transition: transform 0.4s ease;
        }

        .related-card:hover .related-img {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default ProductInfo;
