import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

function Product() {
  const [state, setState] = useState([])

  useEffect(() => {
    fetchapi()
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: 'ease-in-out',
      once: true,
    })
  }, [])

  const fetchapi = async () => {
    const api = await axios.get("http://localhost:3000/BestSale")
    setState(api.data)
  }

  return (
    <div className="container text-center my-5">

      {/* Section Title */}
      <p
        style={{ fontSize: "30px", padding: "20px 0", fontWeight: "600" }}
        data-aos="fade-down"
      >
        FEATURED PRODUCTS
      </p>

      {/* Product Grid */}
      <div className="row g-4 justify-content-center">
        {state.slice(1, 5).map((el, i) => (
          <div
            key={i}
            className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center"
            data-aos="zoom-in"
            data-aos-delay={i * 150}
          >
            <div
              className="card h-100 shadow-sm border-0 product-card"
              style={{
                width: "100%",
                maxWidth: "280px",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <Link to={`/${el.category}/${el.id}`} className="image-wrapper">
                <img
                  src={el.image}
                  alt={el.name}
                  className="img-fluid rounded-top product-img"
                  style={{
                    objectFit: "cover",
                    height: "350px",
                    width: "100%",
                    transition: "transform 0.4s ease",
                  }}
                />
              </Link>

              <div className="card-body">
                <h6 className="card-title mb-1">{el.name}</h6>
                <p className="text-muted mb-0">${el.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Section */}
      <div className="mt-5 position-relative" data-aos="fade-up" data-aos-delay="200">
        <img
          src="https://maroko-demo.myshopify.com/cdn/shop/files/add_banner_img_1920x.webp?v=1683534853"
          className="img-fluid rounded w-100"
          style={{ maxHeight: "450px", objectFit: "cover" }}
          alt="Banner"
        />

        {/* Text Overlay */}
        <div
          className="banner-text text-black"
          style={{
            position: "absolute",
            top: "40%",
            left: "40%",
            transform: "translate(-20%, -20%)",
            textAlign: "left"
          }}
        >
          <h1 data-aos="fade-right">NEW WOMEN COLLECTION</h1>
          <h1 data-aos="fade-left">
            START AT{" "}
            <span
              style={{
                backgroundColor: "#FF5A5A",
                padding: "5px 12px",
                borderRadius: "5px",
                color: "white",
              }}
            >
              $70.00
            </span>
          </h1>
        </div>
      </div>

      {/* Inline CSS for hover animation */}
      <style>{`
        .image-wrapper {
          display: block;
          overflow: hidden;
          border-radius: 8px;
        }
        .product-img:hover {
          transform: scale(1.1);
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .banner-text h1 {
          font-weight: 700;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  )
}

export default Product
