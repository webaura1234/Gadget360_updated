import { products } from '../data/products.js';

export function Shop() {
  // In a real app, we would handle state (filters, sort) here or via URL params.
  // For this static version, we'll just render the initial state.

  return `
    <div class="container shop-page">
      <div class="shop-header">
        <h1>SHOP</h1>
        <p>Browse all our latest gadgets and accessories.</p>
      </div>

      <div class="shop-layout">
        <aside class="shop-sidebar">
          <div class="filter-group">
            <h3>Category</h3>
            <label><input type="checkbox" value="All" class="category-filter" checked> All Cases</label>
            <label><input type="checkbox" value="Leather Cases" class="category-filter"> Leather Cases</label>
            <label><input type="checkbox" value="Clear Cases" class="category-filter"> Clear Cases</label>
            <label><input type="checkbox" value="Rugged Cases" class="category-filter"> Rugged Cases</label>
            <label><input type="checkbox" value="Designer Cases" class="category-filter"> Designer Cases</label>
            <label><input type="checkbox" value="Silicone Cases" class="category-filter"> Silicone Cases</label>
          </div>

          <div class="filter-group">
            <h3>Price</h3>
            <input type="range" min="0" max="3000" value="3000" class="price-slider">
            <div class="price-labels">
              <span>₹0</span>
              <span class="price-value">₹3000</span>
            </div>
          </div>
        </aside>

        <main class="shop-main">
          <div class="shop-controls">
            <span class="showing-text">Showing all products</span>
            <select class="sort-select">
              <option value="featured">Sort by: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div class="product-grid">
            <!-- Populated by JS -->
          </div>

          <div class="pagination">
            <button class="btn btn-outline prev-btn" disabled>Previous</button>
            <div class="page-numbers">
              <!-- Populated by JS -->
            </div>
            <button class="btn btn-outline next-btn">Next</button>
          </div>
        </main>
      </div>
    </div>
  `;
}
