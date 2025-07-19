
import React, { useState } from 'react';
import '../styles/checkout.css';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCompletePayment = () => {
    alert('Thank you for your purchase! Your order has been placed.');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <a href="/" className="back-btn">
          <i className="fas fa-arrow-left"></i>
        </a>
        <h1>Checkout</h1>
        <p>Complete your purchase with Grocer-ease</p>
      </div>
      
      <div className="checkout-content">
        <div className="order-summary">
          <h2>Your Order</h2>
          <div className="cart-items">
            <div className="cart-item">
              <div className="item-img">
                <i className="fas fa-coffee"></i>
              </div>
              <div className="item-details">
                <div className="item-name">Premium Coffee</div>
                <div className="item-price">$8.99 per item</div>
                <div className="item-quantity">
                  <span className="quantity-value">2</span>
                </div>
              </div>
              <div className="item-total">$17.98</div>
            </div>
          </div>
          
          <div className="price-summary">
            <div className="price-row">
              <span className="price-label">Subtotal</span>
              <span className="price-value">$17.98</span>
            </div>
            <div className="price-row">
              <span className="price-label">Tax (8.5%)</span>
              <span className="price-value">$1.53</span>
            </div>
            <div className="divider"></div>
            <div className="total-row">
              <span className="price-label">Total</span>
              <span className="price-value">$19.51</span>
            </div>
          </div>
        </div>
        
        <div className="payment-section">
          <h2 className="section-title">Payment Information</h2>
          
          <div className="payment-methods">
            <div 
              className={`payment-method ${paymentMethod === 'credit-card' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('credit-card')}
            >
              <i className="fas fa-credit-card"></i>
              <h3>Credit Card</h3>
              <p>Pay with Visa, Mastercard</p>
            </div>
            
            <div 
              className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('paypal')}
            >
              <i className="fab fa-paypal"></i>
              <h3>PayPal</h3>
              <p>Secure online payments</p>
            </div>
          </div>
          
          <div className="payment-form">
            <div className="form-group">
              <label htmlFor="card-name">Name on Card</label>
              <input type="text" id="card-name" placeholder="John Smith" />
            </div>
            
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input type="text" id="card-number" placeholder="1234 5678 9012 3456" />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="exp-date">Expiration Date</label>
                <input type="text" id="exp-date" placeholder="MM/YY" />
              </div>
              
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" placeholder="123" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="your@email.com" />
            </div>
            
            <button className="complete-btn" onClick={handleCompletePayment}>
              Complete Purchase - $19.51
            </button>
            
            <div className="secure-notice">
              <i className="fas fa-lock"></i> Your payment is secure and encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
