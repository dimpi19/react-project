import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Product1 from "./Product1";
import Product from "./Product";
import BestProducts from "./BestProducts";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const pro = [
    {
      image:
        "https://maroko-demo.myshopify.com/cdn/shop/files/1_e063fe5a-a291-4ee0-b668-bc6cfe9b74d3_525x280.jpg?v=1684562243",
      content: "Best Sale",
      category: "BestSale",
    },
    {
      image:
        "https://maroko-demo.myshopify.com/cdn/shop/files/4_442a9c19-0cc8-4638-b24b-3d61778795e1_525x280.jpg?v=1684562276",
      content: "New Arrive",
      category: "NewArrival",
    },
    {
      image:
        "https://maroko-demo.myshopify.com/cdn/shop/files/2_70f73b32-ab58-471b-8387-c03a87d7fe0e_525x280.jpg?v=1684562277",
      content: "Top Rated",
      category: "TopRated",
    },
  ];

  return (
    <div style={{ paddingTop: "50px" }}>
      <div className="container p-3">
        <div className="row justify-content-center g-4">
          {pro.map((el, i) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 300}
            >
              <div className="card border-0 text-center category-card">
                <Link to={`/${el.category}`}>
                  <img
                    src={el.image}
                    alt={el.content}
                    className="category-img"
                  />
                </Link>
                <h4 className="pt-3">{el.content}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product sections */}
      <div>
        <Product1 />
      </div>
      <div>
        <Product />
      </div>
      <div>
        <BestProducts />
      </div>

      <style>{`
        .category-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          overflow: hidden;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .category-img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: 10px;
          transition: transform 0.4s ease;
        }

        .category-card:hover .category-img {
          transform: scale(1.05);
        }

        h4 {
          font-weight: 600;
        }

        @media (max-width: 992px) {
          .category-img {
            height: 250px;
          }
        }

        @media (max-width: 768px) {
          .category-img {
            height: 220px;
          }
        }

        @media (max-width: 576px) {
          .category-img {
            height: 200px;
          }
          h4 {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
