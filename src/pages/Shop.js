import { products } from '../data/products.js';

export function Shop(categoryName = null) {
  // In a real app, we would handle state (filters, sort) here or via URL params.
  // For this static version, we'll just render the initial state.

  const title = categoryName ? decodeURIComponent(categoryName) : 'SHOP';
  const subtitle = categoryName
    ? `Browse our exclusive collection of ${title}.`
    : 'Browse all our latest gadgets and accessories.';

  const categoryAttribute = categoryName ? `data-category="${categoryName}"` : '';

  return `
    <div class="shop-page" ${categoryAttribute}>
      <div class="shop-header">
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>

      <div class="shop-layout">
        <main class="shop-main">
          <!-- Top Filters Bar -->
          <!-- Shop Toolbar: Filter Button & Sort -->
          <div class="shop-toolbar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; position: relative;">
            <div class="filter-section">
              <button id="filterToggle" class="btn-filter-toggle">
                Filter <span class="toggle-icon">+</span>
              </button>
              
              <!-- Filter Card (Hidden by default) -->
              <div class="filter-card" id="filterCard">
                <div class="filter-item">
                  <span class="filter-label">Price Range: <span class="price-value">₹<span id="minPriceValue">0</span> - ₹<span id="maxPriceValue">50000</span></span></span>
                  <div class="dual-range-container">
                    <input type="range" min="0" max="50000" value="0" class="price-slider price-slider-min" id="priceRangeMin">
                    <input type="range" min="0" max="50000" value="50000" class="price-slider price-slider-max" id="priceRangeMax">
                  </div>
                </div>

                <div class="filter-item">
                  <span class="filter-label" style="margin-bottom: 5px; display: block;">Color:</span>
                  <div class="color-swatches">
                    <input type="radio" name="color" value="All" id="color-all" checked>
                    <label for="color-all" class="color-swatch all" title="All Colors"></label>

                    <input type="radio" name="color" value="Black" id="color-black">
                    <label for="color-black" class="color-swatch black" title="Black" style="background-color: #000;"></label>

                    <input type="radio" name="color" value="White" id="color-white">
                    <label for="color-white" class="color-swatch white" title="White" style="background-color: #fff; border: 1px solid #ddd;"></label>

                    <input type="radio" name="color" value="Red" id="color-red">
                    <label for="color-red" class="color-swatch red" title="Red" style="background-color: #e74c3c;"></label>

                    <input type="radio" name="color" value="Blue" id="color-blue">
                    <label for="color-blue" class="color-swatch blue" title="Blue" style="background-color: #3498db;"></label>

                    <input type="radio" name="color" value="Green" id="color-green">
                    <label for="color-green" class="color-swatch green" title="Green" style="background-color: #2ecc71;"></label>
                    
                    <input type="radio" name="color" value="Clear" id="color-clear">
                    <label for="color-clear" class="color-swatch clear" title="Clear/Transparent" style="background: linear-gradient(135deg, #eee 50%, #fff 50%); border: 1px solid #ddd;"></label>
                  </div>
                </div>
              </div>
            </div>

            <div class="shop-controls-right" style="display: flex; gap: 20px; align-items: center;">
              <span class="showing-text">Showing all products</span>
              <select class="sort-select">
                <option value="featured">Sort by: Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="latest">Latest</option>
              </select>
            </div>
          </div>

          <div class="product-grid">
            <!-- Populated by JS -->
          </div>

          <div id="scroll-sentinel" style="height: 20px; margin: 20px 0;"></div>
          <div class="loading-indicator text-center" style="display: none; padding: 20px;">
            <p>Loading more products...</p>
          </div>
        </main>
      </div>
    </div>
  `;
}
