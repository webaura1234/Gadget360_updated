export function Profile() {
    return `
    <div class="user-profile-page-wrapper">
      <style>
        /* Scoped Styles for Profile Page */
        .site-header .header-inner {
          background-color: #000000 !important;
        }

        .user-profile-page-wrapper {
          padding-top: 150px; /* Increased Header space */
          padding-bottom: 80px;
          min-height: 100vh;
          width: 100%;
          background-color: #ffffff !important;
          color: #000000 !important;
          font-family: 'Inter', system-ui, sans-serif;
          position: relative;
          z-index: 10;
        }

        .up-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Tabs Navigation */
        .up-tabs-header {
          display: flex;
          justify-content: center; /* Center the tabs */
          align-items: center;
          gap: 0;
          border-bottom: 1px solid #e5e5e5;
          margin-bottom: 60px;
          margin-top: 20px;
          position: relative; /* For absolute positioning of Logout */
        }

        .up-tab-label {
          padding: 16px 40px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          color: #666;
          position: relative;
          transition: color 0.2s;
          background: transparent;
        }

        .up-tab-label:hover {
          color: #000;
        }

        .up-logout-btn {
          /* Button Styling */
          background: transparent;
          border: 1px solid #000;
          color: #000;
          padding: 8px 24px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.5px;
        }

        .up-logout-btn:hover {
          background: #000;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        /* Radio Logic */
        input[name="up-tab-control"] {
          display: none;
        }

        /* Active State styling via sibling selectors */
        #up-tab-orders:checked ~ .up-container .up-tabs-header label[for="up-tab-orders"] {
          color: #000;
          font-weight: 600;
          border-bottom: 2px solid #000;
          margin-bottom: -1px; /* Overlap border */
        }

        #up-tab-addresses:checked ~ .up-container .up-tabs-header label[for="up-tab-addresses"] {
          color: #000;
          font-weight: 600;
          border-bottom: 2px solid #000;
          margin-bottom: -1px;
        }

        /* Content Areas */
        .up-tab-content {
          display: none;
          width: 100%;
          animation: upFadeIn 0.3s ease-out;
        }

        @keyframes upFadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        #up-tab-orders:checked ~ .up-container #up-content-orders {
          display: block;
        }
        
        #up-tab-addresses:checked ~ .up-container #up-content-addresses {
          display: block;
        }

        /* Empty State Styling - Explicit White Background */
        .up-empty-state {
          background-color: #ffffff !important; /* Force White */
          border-radius: 0;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 400px;
          margin: 0 auto;
          box-shadow: none !important; /* Remove any accidental shadows */
        }

        .up-empty-icon-wrapper {
          position: relative;
          margin-bottom: 24px;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .up-empty-icon-wrapper svg {
            width: 48px;
            height: 48px;
            stroke-width: 1;
            color: #000;
        }

        .up-notification-badge {
            position: absolute;
            top: -2px;
            right: -2px;
            background-color: #000;
            color: #fff;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 11px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #fff;
        }

        .up-empty-text {
          font-size: 16px;
          font-weight: 600; /* Made slightly bolder as per image */
          color: #000;
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .up-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #000000;
          color: #ffffff !important;
          height: 48px;
          padding: 0 40px; /* Wider padding */
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .up-btn-primary:hover {
          background-color: #222;
          transform: translateY(-1px);
        }

        /* Modal Styles */
        .up-modal-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.6);
          z-index: 990; /* Below navbar (1000) */
          align-items: flex-start; /* Start from top */
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
          padding: 20px;
          padding-top: 140px; /* Clear the navbar */
        }

        .up-modal-overlay.open {
          display: flex;
          opacity: 1;
        }

        .up-modal-content {
          background: #fff;
          width: 100%;
          max-width: 500px;
          border-radius: 16px;
          padding: 30px;
          position: relative;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
        }

        .up-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 10;
          padding-bottom: 10px;
          border-bottom: 1px solid #f0f0f0;
        }

        .up-modal-title {
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .up-close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        }

        .up-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .up-form-group {
          margin-bottom: 16px;
        }

        .up-form-group.full-width {
          grid-column: span 2;
        }

        .up-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .up-input, .up-select {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }

        .up-input:focus, .up-select:focus {
          border-color: #000;
        }

        .up-input.error {
          border-color: #d32f2f;
        }

        .up-error-msg {
          color: #d32f2f;
          font-size: 11px;
          margin-top: 4px;
          display: none;
        }

        .up-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
        }

        .up-btn-secondary {
          background: transparent;
          border: 1px solid #ccc;
          padding: 10px 24px;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Address Card Styling */
        #address-list-view {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .up-address-card {
           border: 1px solid #e0e0e0;
           border-radius: 12px;
           padding: 20px;
           margin-bottom: 16px;
           position: relative;
        }

        .up-address-name {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 8px;
        }
        
        .up-address-details {
          color: #555;
          font-size: 14px;
          line-height: 1.5;
        }

        .up-address-phone {
          margin-top: 8px;
          color: #555;
          font-size: 14px;
          font-weight: 500;
        }

        .up-tag-default {
          background: #000;
          color: #fff;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 10px;
          vertical-align: middle;
          text-transform: uppercase;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .up-tab-label {
            padding: 15px 20px;
            font-size: 14px;
          }
          .up-logout-btn {
            position: static; 
            display: none; 
          }
           .up-tabs-header {
             justify-content: space-between;
           }
           .up-form-grid {
             grid-template-columns: 1fr;
           }
           .up-form-group.full-width {
             grid-column: span 1;
           }
        }
      </style>

      <!-- Radio Controllers -->
      <input type="radio" name="up-tab-control" id="up-tab-orders" checked />
      <input type="radio" name="up-tab-control" id="up-tab-addresses" />

      <div class="up-container">
        
        <!-- Tabs Header -->
        <div class="up-tabs-header">
          <div style="flex: 1"></div> <!-- Spacer for centering -->
          <label for="up-tab-orders" class="up-tab-label">Orders</label>
          <label for="up-tab-addresses" class="up-tab-label">Addresses</label>
          <div style="flex: 1; display: flex; justify-content: flex-end;">
             <a href="/login" class="up-logout-btn" onclick="localStorage.removeItem('token')">Logout</a>
          </div>
        </div>

        <!-- Orders Panel -->
        <div id="up-content-orders" class="up-tab-content">
          <div class="up-empty-state">
            <div class="up-empty-icon-wrapper">
              <!-- Package Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              <span class="up-notification-badge">0</span>
            </div>
            <p class="up-empty-text">You haven't placed any orders yet.</p>
            <a href="/shop" class="up-btn-primary" data-link>Continue shopping</a>
          </div>
        </div>

        <!-- Addresses Panel -->
        <div id="up-content-addresses" class="up-tab-content">
          <div id="address-empty-view" class="up-empty-state">
             <div class="up-empty-icon-wrapper">
               <!-- Map Pin Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <p class="up-empty-text">You haven't saved any addresses yet.</p>
            <button id="btn-add-address-empty" class="up-btn-primary">Add new address</button>
          </div>

          <div id="address-list-view" style="display: none;">
             <!-- Addresses will be injected here -->
             <button id="btn-add-address-list" class="up-btn-primary" style="margin-top: 20px;">Add another address</button>
          </div>
        </div>

      </div>

      <!-- Address Modal -->
      <div id="up-address-modal" class="up-modal-overlay">
        <div class="up-modal-content">
            <div class="up-modal-header">
                <h3 class="up-modal-title">Add Delivery Address</h3>
                <button class="up-close-btn" id="btn-close-modal">×</button>
            </div>
            
            <div class="up-form-grid">
                <div class="up-form-group full-width">
                    <label class="up-label">Full Name</label>
                    <input type="text" id="addr-fullname" class="up-input" placeholder="Full Name">
                    <div class="up-error-msg">Full Name is required</div>
                </div>

                <div class="up-form-group full-width">
                    <label class="up-label">Phone Number</label>
                    <input type="text" id="addr-phone" class="up-input" placeholder="10-digit mobile number" maxlength="10">
                    <div class="up-error-msg">Valid 10-digit number required</div>
                </div>

                <div class="up-form-group full-width">
                    <label class="up-label">Address Line 1</label>
                    <input type="text" id="addr-line1" class="up-input" placeholder="House no, street">
                    <div class="up-error-msg">Address is required</div>
                </div>

                <div class="up-form-group full-width">
                    <label class="up-label">Address Line 2 (Optional)</label>
                    <input type="text" id="addr-line2" class="up-input" placeholder="Area, locality">
                </div>

                <div class="up-form-group full-width">
                    <label class="up-label">Landmark (Optional)</label>
                    <input type="text" id="addr-landmark" class="up-input" placeholder="Nearby landmark">
                </div>

                <div class="up-form-group">
                    <label class="up-label">City</label>
                    <input type="text" id="addr-city" class="up-input" placeholder="City">
                    <div class="up-error-msg">City is required</div>
                </div>

                <div class="up-form-group">
                    <label class="up-label">State</label>
                    <select id="addr-state" class="up-select">
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Other">Other</option>
                    </select>
                    <div class="up-error-msg">Select a state</div>
                </div>

                <div class="up-form-group full-width">
                    <label class="up-label">Pincode</label>
                    <input type="text" id="addr-pincode" class="up-input" placeholder="6-digit Pincode" maxlength="6">
                    <div class="up-error-msg">Valid 6-digit pincode required</div>
                </div>

                <div class="up-form-group full-width">
                     <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; font-weight: 500;">
                        <input type="checkbox" id="addr-default" style="width: 18px; height: 18px;">
                        Set as default address
                     </label>
                </div>
            </div>

            <div class="up-modal-footer">
                <button class="up-btn-secondary" id="btn-cancel-modal">Cancel</button>
                <button class="up-btn-primary" id="btn-save-address">Save Address</button>
            </div>
        </div>
      </div>
    </div>
  `;
}
