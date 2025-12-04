import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BestProducts() {
    const [state, setState] = useState([]);
    const [text, setText] = useState([]);
    const [text1, setText1] = useState([]);

    useEffect(() => {
        fetchapi();
    }, []);

    const fetchapi = async () => {
        const api = await axios.get("http://localhost:3000/BestSale");
        setState(api.data);

        const api1 = await axios.get("http://localhost:3000/NewArrival");
        setText(api1.data);

        const api2 = await axios.get("http://localhost:3000/TopRated");
        setText1(api2.data);
    };

    const boxStyle = {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginBottom: "20px"
    };

    const imgStyle = {
        width: "80px",
        height: "100px",
        objectFit: "cover",
        borderRadius: "5px"
    };

    const textBox = {
        lineHeight: "30px"
    };

    return (
        <div className="container mt-5">
            <div className="row text-center mb-4">
                <div className="col-md-4">
                    <h3 style={{fontFamily:'typeface-cormorant-garamond'}}>Best Sale</h3>
                    <hr />
                    {state.slice(4, 7).map((el, i) => (
                        <div key={i} style={boxStyle}>
                            <Link to={`/${el.category}/${el.id}`}>
                                <img src={el.image} alt={el.name} style={imgStyle} />
                            </Link>
                            <div style={textBox} className="text-start">
                                <p className="mb-1 fw-medium">{el.name}</p>
                                <p className="text-muted">${el.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-md-4">
                    <h3>New Arrivals</h3>
                    <hr />
                    {text.slice(5, 8).map((el, i) => (
                        <div key={i} style={boxStyle}>
                            <Link to={`/${el.category}/${el.id}`}>
                                <img src={el.image} alt={el.name} style={imgStyle} />
                            </Link>
                            <div style={textBox} className="text-start">
                                <p className="mb-1 fw-medium">{el.name}</p>
                                <p className="text-muted">${el.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-md-4">
                    <h3>Top Rated</h3>
                    <hr />
                    {text1.slice(5, 8).map((el, i) => (
                        <div key={i} style={boxStyle}>
                            <Link to={`/${el.category}/${el.id}`}>
                                <img src={el.image} alt={el.name} style={imgStyle} />
                            </Link>
                            <div style={textBox} className="text-start">
                                <p className="mb-1 fw-medium">{el.name}</p>
                                <p className="text-muted">${el.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container text-center mt-5 mb-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col-6 col-md-3 mb-3">
                        <img src="https://maroko-demo.myshopify.com/cdn/shop/files/1.png?v=1614283545" alt="" className="img-fluid" />
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                        <img src="https://maroko-demo.myshopify.com/cdn/shop/files/4.png?v=1614283545" alt="" className="img-fluid" />
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                        <img src="https://maroko-demo.myshopify.com/cdn/shop/files/3.png?v=1614283545" alt="" className="img-fluid" />
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                        <img src="https://maroko-demo.myshopify.com/cdn/shop/files/4.png?v=1614283545" alt="" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BestProducts;
