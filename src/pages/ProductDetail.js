import { products } from '../data/products.js';

export function ProductDetail(id) {
  const product = products.find(p => p.id == id);

  if (!product) {
    return `
      <div class="container text-center" style="padding: 100px 0;">
        <h1>Product Not Found</h1>
        <a href="/shop" class="btn btn-primary" data-link>Return to Shop</a>
      </div>
    `;
  }

  return `
    <div class="container product-detail-page">
      <div class="product-detail-grid">
        <div class="product-gallery">
          <div class="main-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="thumbnail-list">
            <img src="${product.image}" class="active">
            <img src="${product.image}">
            <img src="${product.image}">
          </div>
        </div>

        <div class="product-info-col">
          <h1>${product.name}</h1>
          <div class="rating">
            ★★★★★ <span class="text-muted">(${product.reviews} reviews)</span>
          </div>
          <div class="price-tag">₹${product.price.toFixed(2)}</div>
          
          <p class="description">${product.description}</p>

          <div class="product-options">
            <div class="option-group">
              <label>Color</label>
              <select>
                <option>Black</option>
                <option>White</option>
                <option>Silver</option>
              </select>
            </div>
            <div class="option-group">
              <label>Quantity</label>
              <input type="number" value="1" min="1" max="10">
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn btn-primary btn-lg btn-add-to-cart" data-id="${product.id}">ADD TO CART</button>
            <button class="btn btn-secondary btn-lg btn-buy-now" data-id="${product.id}">BUY NOW</button>
          </div>

          <div class="product-tabs">
            <div class="tab-headers">
              <button class="active">Description</button>
              <button>Specifications</button>
              <button>Reviews</button>
            </div>
            <div class="tab-content">
              <p>Experience the best quality with ${product.name}. Designed for modern life, it features state-of-the-art technology and premium materials.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
