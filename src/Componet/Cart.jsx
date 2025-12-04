import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, deleteItem } from "./Redux/Action";
import { Link } from "react-router-dom";

function Cart() {
  const data = useSelector((store) => store);
  const dispatch = useDispatch();

  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [message, setMessage] = useState("");

  const totalPrice = data.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const gstAmount = totalPrice * 0.05;
  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalAmount = totalPrice + gstAmount - discountAmount;

  const applyCoupon = () => {
    const validCoupons = {
      DIMPLE10: 10,
      DIMPLE20: 20,
      DIMPLE50: 50,
    };

    const entered = coupon.toUpperCase();
    if (validCoupons[entered]) {
      setDiscountPercent(validCoupons[entered]);
      setMessage(`${validCoupons[entered]}% discount applied!`);
    } else {
      setDiscountPercent(0);
      setMessage("Invalid coupon code");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Shopping Cart</h2>

      {data.length === 0 ? (
        <h4 className="text-center">Your cart is empty</h4>
      ) : (
        <>
          <table className="table table-bordered text-center align-middle">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>ACTIONS</th>
                <th>SUBTOTAL</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, i) => (
                <tr key={i}>
                  <td>
                    <img
                      src={el.image}
                      alt={el.name}
                      style={{ height: "100px", borderRadius: "10px" }}
                    />
                    <div>{el.name}</div>
                  </td>
                  <td>₹{el.price}</td>
                  <td>{el.quantity}</td>
                  <td>
                    <button
                      className="btn btn-outline-dark btn-sm me-2"
                      onClick={() => dispatch(incrementQuantity(i))}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => dispatch(decrementQuantity(i))}
                    >
                      -
                    </button>
                  </td>
                  <td>₹{(el.price * el.quantity).toFixed(2)}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(deleteItem(i))}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end mt-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="form-control w-25 me-2"
            />
            <button className="btn btn-dark" onClick={applyCoupon}>
              Apply
            </button>
          </div>

          {message && <p className="text-end mt-2">{message}</p>}

          <div className="text-end mt-4">
            <h5>Total Price: ₹{totalPrice.toFixed(2)}</h5>
            <h5>GST (5%): ₹{gstAmount.toFixed(2)}</h5>
            <h5>Discount: -₹{discountAmount.toFixed(2)}</h5>
            <hr />
            <h4>Final Amount: ₹{finalAmount.toFixed(2)}</h4>
          </div>

          <div className="text-end mt-3">
            <Link to="/checkout">
              <button className="btn btn-success">Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
