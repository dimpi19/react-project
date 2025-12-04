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
      duration: 1000,      // 🔹 animation speed
      offset: 100,         // 🔹 trigger point
      easing: 'ease-in-out',
      once: true           // 🔹 run once per scroll
    })
  }, [])

  const fetchapi = async () => {
    const api = await axios.get("http://localhost:3000/NewArrival")
    setState(api.data)
  }

  return (
    <div className="container text-center my-5">

      <p
        style={{
          fontSize: "30px",
          padding: "20px 0",
          fontWeight: "600"
        }}
        data-aos="fade-down"
      >
        NEW ARRIVAL
      </p>

      <div className="row g-4 justify-content-center">
        {state.slice(1, 5).map((el, i) => (
          <div
            key={i}
            className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center"
            data-aos="fade-up"               // 🔹 same smooth animation
            data-aos-delay={i * 200}         // 🔹 slight stagger for each
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

      {/* 🔹 Hover animation styling */}
      <style>{`
        .image-wrapper {
          display: block;
          overflow: hidden;
          border-radius: 8px;
        }

        .product-img:hover {
          transform: scale(1.08);
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  )
}

export default Product
