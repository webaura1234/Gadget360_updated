
export default function Profile() {
  return `
    <div class="container profile-page animate-fade-up">
      <div class="profile-header">
        <div class="profile-avatar">
          <span>JD</span>
        </div>
        <div class="profile-info">
          <h1>John Doe</h1>
          <p>john.doe@example.com</p>
          <span class="badge badge-gold">Gold Member</span>
        </div>
      </div>

      <div class="profile-layout">
        <aside class="profile-sidebar">
          <button class="profile-tab active" data-tab="orders">
            <i data-lucide="package"></i> My Orders
          </button>
          <button class="profile-tab" data-tab="refunds">
            <i data-lucide="rotate-ccw"></i> Refunds & Returns
          </button>
          <button class="profile-tab" data-tab="addresses">
            <i data-lucide="map-pin"></i> Addresses
          </button>
          <button class="profile-tab" data-tab="settings">
            <i data-lucide="settings"></i> Settings
          </button>
          <button class="profile-tab logout">
            <i data-lucide="log-out"></i> Log Out
          </button>
        </aside>

        <main class="profile-content">
          <!-- Orders Tab -->
          <div id="orders" class="tab-pane active">
            <h2>Order History</h2>
            <div class="order-list">
              <div class="order-card">
                <div class="order-header">
                  <div>
                    <span class="order-id">#ORD-3921</span>
                    <span class="order-date">Nov 28, 2025</span>
                  </div>
                  <span class="status status-delivered">Delivered</span>
                </div>
                <div class="order-items">
                  <div class="order-item">
                    <img src="https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&q=80&w=100" alt="Product">
                    <div>
                      <h4>Crystal Clear MagSafe Case</h4>
                      <p>Qty: 1</p>
                    </div>
                    <span class="item-price">$1200.00</span>
                  </div>
                </div>
                <div class="order-footer">
                  <span>Total: <strong>$1200.00</strong></span>
                  <button class="btn btn-sm btn-outline btn-view-order" data-id="ORD-3921">View Details</button>
                </div>
              </div>
              
              <div class="order-card">
                <div class="order-header">
                  <div>
                    <span class="order-id">#ORD-3850</span>
                    <span class="order-date">Nov 15, 2025</span>
                  </div>
                  <span class="status status-processing">Processing</span>
                </div>
                <div class="order-items">
                  <div class="order-item">
                    <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=100" alt="Product">
                    <div>
                      <h4>Carbon Fiber Ultra Slim</h4>
                      <p>Qty: 1</p>
                    </div>
                    <span class="item-price">$2200.00</span>
                  </div>
                </div>
                <div class="order-footer">
                  <span>Total: <strong>$2200.00</strong></span>
                  <button class="btn btn-sm btn-outline btn-view-order" data-id="ORD-3850">Track Order</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Refunds Tab -->
          <div id="refunds" class="tab-pane">
            <h2>Refunds & Returns</h2>
            <div class="empty-state">
              <div class="icon-box">
                <i data-lucide="check-circle"></i>
              </div>
              <h3>No active return requests</h3>
              <p>You haven't requested any returns yet.</p>
              <button class="btn btn-primary" style="margin-top: 20px;">Start a Return</button>
            </div>
          </div>

          <!-- Addresses Tab -->
          <div id="addresses" class="tab-pane">
             <div class="flex justify-between items-center" style="margin-bottom: 20px;">
                <h2>Saved Addresses</h2>
             </div>
             
                 <div id="address-list" class="address-grid">
                     <!-- Addresses will be added here dynamically -->
                     <div class="address-card new-address" id="btn-add-address">
                        <i data-lucide="plus"></i>
                        <span>Add New Address</span>
                     </div>
                 </div>

             <!-- Add/Edit Address Form (Hidden by default) -->
             <div id="address-form-container" style="display: none; margin-top: 20px;">
                <h3 id="address-form-title">Add New Address</h3>
                <form id="address-form" class="settings-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Label (e.g. Home, Work)</label>
                            <input type="text" placeholder="Home">
                        </div>
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="John Doe">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Street Address</label>
                        <input type="text" placeholder="123 Street Name">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>City</label>
                            <input type="text" placeholder="City">
                        </div>
                        <div class="form-group">
                            <label>Postal Code</label>
                            <input type="text" placeholder="ZIP Code">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Country</label>
                        <select>
                            <option>United States</option>
                            <option>India</option>
                            <option>United Kingdom</option>
                            <option>Canada</option>
                        </select>
                    </div>
                    <div class="flex gap-sm">
                        <button type="submit" class="btn btn-primary">Save Address</button>
                        <button type="button" class="btn btn-outline" id="btn-cancel-address">Cancel</button>
                    </div>
                </form>
             </div>
          </div>

           <!-- Settings Tab -->
           <div id="settings" class="tab-pane">
             <h2>Account Settings</h2>
             <form class="settings-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" value="John">
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" value="Doe">
                    </div>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" value="john.doe@example.com">
                </div>
                <div class="form-group">
                    <label>Current Password</label>
                    <input type="password" placeholder="********">
                </div>
                <div class="form-group">
                    <label>New Password</label>
                    <input type="password" placeholder="Leave blank to keep current">
                </div>
                <button class="btn btn-primary">Save Changes</button>
             </form>
          </div>
        </main>
      </div>

      <!-- Order Details Modal -->
      <div id="order-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 2000; align-items: center; justify-content: center;">
        <div class="modal-content" style="background: #111; padding: 30px; border-radius: 16px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; position: relative; border: 1px solid var(--color-border);">
            <button id="close-order-modal" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: #fff; cursor: pointer;">
                <i data-lucide="x"></i>
            </button>
            <div id="order-modal-body">
                <!-- Content injected via JS -->
            </div>
        </div>
      </div>
    </div>
  `;
}
