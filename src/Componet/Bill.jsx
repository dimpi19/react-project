import React from "react";
import { Link } from "react-router";

function Bill() {
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

    if (!orderDetails) {
        return <h3 className="text-center mt-5">No order found!</h3>;
    }

    return (
        <div className="container mt-5">
            <div className="p-4 border rounded shadow-sm">
                <h2 className="text-center mb-4"> Your order</h2>
                <p><strong>Customer:</strong> {orderDetails.firstName} {orderDetails.lastName}</p>
                <p><strong>Address:</strong> {orderDetails.address}, {orderDetails.city}, {orderDetails.state} - {orderDetails.pin}</p>
                <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>

                <hr />
                <h4>Ordered Products:</h4>
                {orderDetails.cartItems.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between mb-3">
                        <div className="d-flex align-items-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "70px", height: "70px", borderRadius: "10px", objectFit: "cover" }}
                            />
                            <div style={{ marginLeft: "10px" }}>
                                <p className="m-0 fw-bold">{item.name}</p>
                                <small className="text-muted">Qty: {item.quantity}</small>
                            </div>
                        </div>
                        <p className="m-0">${item.price * item.quantity}</p>
                    </div>
                ))}

                <hr />
                <p className="d-flex justify-content-between">
                    <span>Subtotal</span> <strong>${orderDetails.totalPrice.toFixed(2)}</strong>
                </p>
                <p className="d-flex justify-content-between">
                    <span>GST (5%)</span> <strong>${orderDetails.gst.toFixed(2)}</strong>
                </p>
                {orderDetails.discount > 0 && (
                    <p className="d-flex justify-content-between text-success">
                        <span>Discount</span> <strong>-${orderDetails.discount.toFixed(2)}</strong>
                    </p>
                )}
                <hr />
                <h4 className="d-flex justify-content-between">
                    <span>Total Amount</span> <strong>${orderDetails.finalAmount.toFixed(2)}</strong>
                </h4>
            </div>
            <Link to={``}><button>Back To Home</button></Link>
        </div>
    );
}

export default Bill;
