
import { useState } from "react";

function Checkout({
  cartItems,
  formatPrice,
  cartSubtotal,
  onPlaceOrder,
  onReturnHome
}) {
  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    onPlaceOrder({
      customer,
      items: cartItems,
      total: cartSubtotal
    });

    setOrderPlaced(true);
  }

  // ORDER CONFIRMATION
  if (orderPlaced) {
    return (
      <section className="checkout-section">
        <div className="order-success">
          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you, {customer.fullName}.
            Your order has been received.
          </p>

          <h2>{formatPrice(cartSubtotal)}</h2>

          <button
            className="primary-button"
            onClick={onReturnHome}
          >
            Return to Home
          </button>
        </div>
      </section>
    );
  }

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <section className="checkout-section">
        <div className="empty-cart">
          <h2>Your cart is empty.</h2>

          <p>Add some products before checking out.</p>

          <button
            className="primary-button"
            onClick={onReturnHome}
          >
            Return to Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-section">

      <div className="section-heading">
        <p className="eyebrow">COMPLETE YOUR ORDER</p>

        <h1>Checkout</h1>

        <p>
          Review your items and enter your delivery information.
        </p>
      </div>

      <div className="checkout-container">

        {/* CUSTOMER INFORMATION */}
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <h2>Customer Information</h2>

          <label>Full Name</label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={customer.fullName}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={customer.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={customer.phone}
            onChange={handleChange}
            required
          />

          <label>Delivery Address</label>

          <textarea
            name="address"
            placeholder="Enter your delivery address"
            rows="4"
            value={customer.address}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="primary-button"
          >
            Place Order
          </button>
        </form>

        {/* ORDER SUMMARY */}
        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>

              <div>
                <h4>{item.name}</h4>

                <p>Quantity: {item.quantity}</p>
              </div>

              <strong>
                {formatPrice(item.price * item.quantity)}
              </strong>

            </div>
          ))}

          <div className="checkout-total">
            <span>Total</span>

            <strong>
              {formatPrice(cartSubtotal)}
            </strong>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Checkout;
