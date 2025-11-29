import { cart } from '../cart.js';

export function Checkout() {
  if (cart.items.length === 0) {
    return `
      <div class="container text-center" style="padding: 100px 0;">
        <h1>Your Cart is Empty</h1>
        <p>Add some items to your cart to proceed to checkout.</p>
        <a href="/shop" class="btn btn-primary" data-link>Return to Shop</a>
      </div>
    `;
  }

  return `
    <div class="container checkout-page">
      <h1 class="text-center" style="margin-bottom: 40px;">CHECKOUT</h1>
      
      <div class="checkout-grid">
        <div class="checkout-form-col">
          <div class="checkout-section">
            <h2>Shipping Information</h2>
            <form id="checkout-form">
              <!-- Saved Addresses Selection -->
              <div class="saved-addresses-section" style="margin-bottom: 30px;">
                <h3 style="font-size: 1rem; margin-bottom: 15px;">Select Delivery Address</h3>
                <div class="address-options" style="display: flex; flex-direction: column; gap: 10px;">
                    <div class="address-option" style="padding: 15px; background: #222; border: 1px solid var(--color-primary); border-radius: 8px; cursor: pointer; display: flex; align-items: flex-start; gap: 10px;">
                        <input type="radio" name="delivery-address" id="addr-1" value="saved-1" checked style="margin-top: 5px;">
                        <label for="addr-1" style="cursor: pointer; flex: 1;">
                            <strong>John Doe (Home)</strong><br>
                            <span style="font-size: 0.9em; color: #aaa;">123 Tech Street, Silicon Valley, CA 94000, United States</span>
                        </label>
                    </div>
                    
                    <div class="address-option" style="padding: 15px; background: #222; border: 1px solid var(--color-border); border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                        <input type="radio" name="delivery-address" id="addr-new" value="new">
                        <label for="addr-new" style="cursor: pointer; flex: 1; font-weight: 600;">
                            + Add New Address
                        </label>
                    </div>
                </div>
              </div>

              <div id="new-address-form" style="display: none;">
                  <div class="form-row">
                    <div class="form-group">
                      <label>First Name*</label>
                      <input type="text">
                    </div>
                    <div class="form-group">
                      <label>Last Name*</label>
                      <input type="text">
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label>Email Address*</label>
                    <input type="email">
                  </div>
                  
                  <div class="form-group">
                    <label>Street Address*</label>
                    <input type="text">
                  </div>
                  
                  <div class="form-row">
                    <div class="form-group">
                      <label>City*</label>
                      <input type="text">
                    </div>
                    <div class="form-group">
                      <label>Postal Code*</label>
                      <input type="text">
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label>Country*</label>
                    <select>
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                    </select>
                  </div>
              </div>

              <h2 style="margin-top: 40px;">Payment Method</h2>
              
              <div class="payment-methods" style="margin-bottom: 20px;">
                <div class="payment-option" style="margin-bottom: 10px; padding: 15px; background: #222; border-radius: 8px; display: flex; align-items: center; gap: 10px; cursor: pointer;">
                  <input type="radio" name="payment" id="cod" value="cod" checked style="width: auto;">
                  <label for="cod" style="margin: 0; cursor: pointer; flex: 1;">Cash on Delivery</label>
                </div>
                
                <div class="payment-option" style="margin-bottom: 10px; padding: 15px; background: #222; border-radius: 8px; display: flex; align-items: center; gap: 10px; cursor: pointer;">
                  <input type="radio" name="payment" id="card" value="card" style="width: auto;">
                  <label for="card" style="margin: 0; cursor: pointer; flex: 1;">Credit/Debit Card</label>
                </div>
              </div>

              <div class="payment-box" id="card-details" style="display: none;">
                <div class="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" maxlength="19">
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" maxlength="5">
                  </div>
                  <div class="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" maxlength="3">
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top: 30px;">PLACE ORDER</button>
            </form>
          </div>
        </div>

        <div class="checkout-summary-col">
          <div class="order-summary-card">
            <h3>Order Summary</h3>
            <div class="summary-items">
              ${cart.items.map(item => `
                <div class="summary-item">
                  <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-qty">x${item.quantity}</span>
                  </div>
                  <span class="item-price">₹${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              `).join('')}
            </div>
            
            <div class="summary-totals">
              <div class="total-row">
                <span>Subtotal</span>
                <span>₹${cart.total.toFixed(2)}</span>
              </div>
              <div class="total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div class="total-row final-total">
                <span>Total</span>
                <span>₹${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
