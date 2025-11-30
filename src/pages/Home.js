import { products } from '../data/products.js';

export function Home() {
  const trendingProducts = products.filter(p => p.isBestSeller).slice(0, 4);

  return `
    <!-- 1. Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>Elevate Your Tech</h1>
        <p>Premium accessories designed for the modern minimalist. Protection meets style.</p>
        <a href="/shop" class="btn btn-primary btn-lg" data-link>SHOP COLLECTION</a>
      </div>
    </div>

    <!-- 2. Best Sellers Grid -->
    <section class="section container animate-on-scroll">
      <div class="section-header">
        <h2>Best Sellers</h2>
        <a href="/shop" class="btn-link" data-link>View All</a>
      </div>
      <div class="product-grid">
        ${trendingProducts.map((product, index) => `
          <div class="product-card animate-on-scroll" style="animation-delay: ${index * 100}ms">
            <a href="/product/${product.id}" class="product-image" data-link>
              <img src="${product.image}" alt="${product.name}">
              ${product.isNew ? '<span class="badge badge-new">New</span>' : ''}
              ${product.onSale ? '<span class="badge badge-sale">Sale</span>' : ''}
            </a>
            <div class="product-info">
              <h3><a href="/product/${product.id}" data-link>${product.name}</a></h3>
              <p class="price">₹${product.price.toFixed(2)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- 3. Curated Collections -->
    <section class="section container animate-on-scroll">
      <div class="section-header">
        <h2>Shop by Category</h2>
      </div>
      <div class="category-grid">
        <div class="category-card animate-on-scroll" style="background-image: url('https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&q=80&w=600'); animation-delay: 0ms;" onclick="window.location.href='/shop'">
          <div class="category-content">
            <span>Collection</span>
            <h3>Leather</h3>
          </div>
        </div>
        <div class="category-card animate-on-scroll" style="background-image: url('https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=600'); animation-delay: 100ms;" onclick="window.location.href='/shop'">
          <div class="category-content">
            <span>Collection</span>
            <h3>Carbon</h3>
          </div>
        </div>
        <div class="category-card animate-on-scroll" style="background-image: url('https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?auto=format&fit=crop&q=80&w=600'); animation-delay: 200ms;" onclick="window.location.href='/shop'">
          <div class="category-content">
            <span>Collection</span>
            <h3>Silicone</h3>
          </div>
        </div>
        <div class="category-card animate-on-scroll" style="background-image: url('https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&q=80&w=600'); animation-delay: 300ms;" onclick="window.location.href='/shop'">
          <div class="category-content">
            <span>Collection</span>
            <h3>Accessories</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Promo Banner -->
    <section class="promo-banner animate-on-scroll">
      <div class="container">
        <h2>The Future of Protection</h2>
        <p>Engineered with aerospace-grade materials for ultimate durability without the bulk.</p>
        <a href="/shop" class="btn btn-primary" data-link>DISCOVER MORE</a>
      </div>
    </section>

    <!-- 5. Newsletter -->
    <section class="newsletter-section animate-on-scroll">
      <h2>Stay in the Loop</h2>
      <p class="text-muted" style="margin-bottom: 30px;">Sign up for exclusive offers and new product drops.</p>
      <form class="newsletter-form">
        <div class="input-group">
          <input type="email" id="email" required placeholder="Enter your email">
          <button type="submit" class="btn btn-primary">SUBSCRIBE</button>
        </div>
      </form>
    </section>
  `;
}
