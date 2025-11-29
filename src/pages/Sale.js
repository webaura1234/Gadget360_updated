import { products } from '../data/products.js';

export function Sale() {
  // Filter for sale items (mock logic: price < 200 or isBestSeller for demo)
  const saleProducts = products.filter(p => p.price < 200);

  return `
    <div class="sale-page">
      <section class="hero-section" style="height: 400px; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&q=80&w=1600');">
        <div class="hero-content">
          <h1>SALE</h1>
          <p>Limited time offers on your favorite cases.</p>
          <a href="#sale-grid" class="btn btn-primary">SHOP SALE</a>
        </div>
      </section>

      <div class="container" id="sale-grid">
        <div class="banner-box" style="background: #e9ecef; padding: 2rem; text-align: center; margin-bottom: 2rem; border-radius: 8px;">
          <h3>Buy more, save more. Extra 5% off on orders above ₹2000.</h3>
        </div>

        <div class="product-grid">
          ${saleProducts.map(product => `
            <div class="product-card">
              <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <span class="badge badge-sale">10% OFF</span>
              </div>
              <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">
                  <span style="text-decoration: line-through; color: #999; margin-right: 8px;">₹${(product.price * 1.1).toFixed(2)}</span>
                  <span style="color: var(--color-sale);">₹${product.price.toFixed(2)}</span>
                </p>
                <a href="/product/${product.id}" class="btn-link" data-link>View Details</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
