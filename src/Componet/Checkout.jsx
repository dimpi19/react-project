import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const cartData = useSelector((store) => store);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const navigate = useNavigate();

    const totalPrice = cartData.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const gst = totalPrice * 0.05;
    const finalAmount = totalPrice + gst - discount;

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "Gujarat",
        pin: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handlePlaceOrder = () => {
        if (!paymentMethod) {
            alert("Please select a payment method!");
            return;
        }
        for (let key in formData) {
            if (!formData[key]) {
                alert("Please fill all fields!");
                return;
            }
        }

        const orderDetails = {
            ...formData,
            paymentMethod,
            discount,
            gst,
            finalAmount,
            totalPrice,
            cartItems: cartData,
            date: new Date().toLocaleString(),
        };

        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
        alert("Order placed successfully!");
        navigate("/bill");
    };

    return (
        <div className="container mt-5">
            <div className="row g-4">
                <div className="col-lg-8 col-md-7 col-12">
                    <div className="p-4 border rounded mb-4">
                        <h4>Contact</h4>
                        <input
                            type="text"
                            placeholder="Email or mobile phone number"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control mb-3"
                        />

                        <h4>Delivery</h4>
                        <div className="row mb-3">
                            <div className="col">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control mb-3"
                        />

                        <div className="row mb-3">
                            <div className="col">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col">
                                <label>State</label>
                                <select
                                    className="form-select"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                >
                                    <option>Gujarat</option>
                                    <option>Maharashtra</option>
                                    <option>Delhi</option>
                                </select>
                            </div>
                            <div className="col">
                                <label>PIN code</label>
                                <input
                                    type="text"
                                    name="pin"
                                    value={formData.pin}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border rounded mb-4">
                        <h4>Payment Method</h4>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="payment"
                                id="cod"
                                value="COD"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="cod">
                                Cash on Delivery
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="payment"
                                id="card"
                                value="Card"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="card">
                                Credit / Debit Card
                            </label>
                        </div>

                        {paymentMethod === "Card" && (
                            <div className="mt-3">
                                <label>Card Number</label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    className="form-control mb-3"
                                />
                                <div className="row">
                                    <div className="col">
                                        <label>Expiry Date</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col">
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button className="btn btn-dark w-100" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>

                {/* Right Side: Summary */}
                <div className="col-lg-4 col-md-5 col-12">
                    <div
                        className="p-4 border rounded"
                        style={{ backgroundColor: "#fafafa" }}
                    >
                        {cartData.map((item, index) => (
                            <div
                                key={index}
                                className="d-flex justify-content-between align-items-center mb-3"
                            >
                                <div className="d-flex align-items-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            borderRadius: "10px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div style={{ marginLeft: "10px" }}>
                                        <p className="m-0 fw-bold">{item.name}</p>
                                        <small className="text-muted">{item.category}</small>
                                    </div>
                                </div>
                                <p className="m-0">${item.price * item.quantity}</p>
                            </div>
                        ))}

                        <hr />
                        <p className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <strong>${totalPrice.toFixed(2)}</strong>
                        </p>
                        <p className="d-flex justify-content-between">
                            <span>GST (5%)</span>
                            <strong>${gst.toFixed(2)}</strong>
                        </p>
                        {discount > 0 && (
                            <p className="d-flex justify-content-between text-success">
                                <span>Discount</span>
                                <strong>-${discount.toFixed(2)}</strong>
                            </p>
                        )}
                        <hr />
                        <h5 className="d-flex justify-content-between">
                            <span>Total</span>
                            <strong>${finalAmount.toFixed(2)}</strong>
                        </h5>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
