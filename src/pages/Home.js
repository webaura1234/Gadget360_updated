import { products } from '../data/products.js';

export function Home() {
  const trendingProducts = products.filter(p => p.isBestSeller).slice(0, 4);

  return `
    <!-- 1. Hero Carousel -->
    <div class="hero-carousel">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="slide-bg" style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=1600');"></div>
            <div class="slide-content animate-fade-up">
              <h2>Ultra-Slim Protection</h2>
              <p>Carbon fiber durability in a featherlight profile.</p>
              <a href="/shop" class="btn btn-primary btn-lg" data-link>SHOP CARBON</a>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="slide-bg" style="background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&q=80&w=1600');"></div>
            <div class="slide-content animate-fade-up">
              <h2>The Leather Edit</h2>
              <p>Develops a unique patina. Uniquely yours.</p>
              <a href="/shop" class="btn btn-primary btn-lg" data-link>SHOP LEATHER</a>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="slide-bg" style="background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?auto=format&fit=crop&q=80&w=1600');"></div>
            <div class="slide-content animate-fade-up">
              <h2>Glow Series</h2>
              <p>Stand out from the crowd with neon accents.</p>
              <a href="/shop" class="btn btn-primary btn-lg" data-link>SHOP NEON</a>
            </div>
          </div>
        </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <!-- 2. Brands Marquee -->
    <div class="brands-marquee">
      <div class="marquee-track">
        <span class="brand-item">FLAT 50% OFF</span>
        <span class="brand-item">FREE SHIPPING</span>
        <span class="brand-item">NEW ARRIVALS</span>
        <span class="brand-item">LIMITED TIME OFFER</span>
        <span class="brand-item">BUY 1 GET 1 FREE</span>
        <span class="brand-item">FLASH SALE</span>
        <span class="brand-item">FLAT 50% OFF</span>
        <span class="brand-item">FREE SHIPPING</span>
        <span class="brand-item">NEW ARRIVALS</span>
        <span class="brand-item">LIMITED TIME OFFER</span>
        <span class="brand-item">BUY 1 GET 1 FREE</span>
        <span class="brand-item">FLASH SALE</span>
      </div>
    </div>

    <!-- 3. Best Sellers Grid -->
    <section class="section container animate-on-scroll" style="margin-top: 80px;">
      <div class="section-header text-center" style="flex-direction: column; gap: 10px;">
        <h2 class="reveal-text" style="font-size: 2.5rem;">Best Sellers</h2>
        <p class="text-muted">Our most loved cases, tested by thousands.</p>
      </div>
      <div class="product-grid">
        ${trendingProducts.map((product, index) => `
          <div class="product-card animate-on-scroll" style="animation-delay: ${index * 100}ms">
            <div class="product-image">
              <img src="${product.image}" alt="${product.name}">
              ${product.isNew ? '<span class="badge badge-new">New</span>' : ''}
              <button class="btn btn-primary btn-sm btn-add-to-cart" data-id="${product.id}" style="position: absolute; bottom: 10px; right: 10px; z-index: 2;">Add</button>
            </div>
            <div class="product-info">
              <h3>${product.name}</h3>
              <p class="price">₹${product.price.toFixed(2)}</p>
              <a href="/product/${product.id}" class="btn-link" data-link>View Details</a>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="text-center" style="margin-top: 40px;">
        <a href="/shop" class="btn btn-outline" data-link>VIEW ALL PRODUCTS</a>
      </div>
    </section>

    <!-- 4. Feature Split Section -->
    <section class="feature-split animate-on-scroll">
      <div class="feature-image">
        <img src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=1000" alt="MagSafe Technology">
      </div>
      <div class="feature-content">
        <h2 class="reveal-text">Engineered for MagSafe</h2>
        <p>Experience seamless connectivity with our precision-aligned magnets. Compatible with all your favorite MagSafe accessories, from chargers to wallets.</p>
        <ul style="margin-bottom: 30px; list-style: disc; padding-left: 20px; color: var(--color-text-muted);">
          <li style="margin-bottom: 10px;">Strong magnetic lock</li>
          <li style="margin-bottom: 10px;">Fast wireless charging</li>
          <li>Slim, non-intrusive design</li>
        </ul>
        <a href="/shop" class="btn btn-primary" data-link>SHOP MAGSAFE</a>
      </div>
    </section>

    <!-- 5. Shop by Category -->
    <section class="section container animate-on-scroll" style="margin-top: 80px;">
      <div class="section-header">
        <h2 class="reveal-text">Curated Collections</h2>
      </div>
      <div class="category-grid">
        <div class="category-card animate-on-scroll" style="background-image: url('https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&q=80&w=600'); animation-delay: 0ms;">
          <div class="category-content">
            <h3>Leather</h3>
            <span class="btn btn-sm btn-light" style="background: white; color: black; padding: 5px 15px; font-size: 12px;">SHOP NOW</span>
          </div>
        </div>
        <div class="category-card animate-on-scroll" style="background-image: url('https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=600'); animation-delay: 100ms;">
          <div class="category-content">
            <h3>Carbon</h3>
            <span class="btn btn-sm btn-light" style="background: white; color: black; padding: 5px 15px; font-size: 12px;">SHOP NOW</span>
          </div>
        </div>
        <div class="category-card animate-on-scroll" style="background-image: url('https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?auto=format&fit=crop&q=80&w=600'); animation-delay: 200ms;">
          <div class="category-content">
            <h3>Silicone</h3>
            <span class="btn btn-sm btn-light" style="background: white; color: black; padding: 5px 15px; font-size: 12px;">SHOP NOW</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. About Founder Section -->
    <section class="section container animate-on-scroll" style="margin-top: 80px;">
      <div class="founder-section">
        <div class="founder-content">
          <h2 class="reveal-text">Meet the Founder</h2>
          <p class="text-muted">"I started GADGET360 with a simple mission: to create accessories that I would want to use myself. Every product is a reflection of my passion for technology and design."</p>
          <p class="text-primary font-bold">- Alex Morgan</p>
        </div>
        <div class="founder-video-trigger" id="btn-play-video">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" alt="Founder">
          <div class="play-button">
            <i data-lucide="play" style="fill: white; stroke: none;"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Modal -->
    <div id="video-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 3000; align-items: center; justify-content: center;">
        <button id="close-video-modal" style="position: absolute; top: 30px; right: 30px; background: none; border: none; color: #fff; cursor: pointer; z-index: 3001;">
            <i data-lucide="x" style="width: 40px; height: 40px;"></i>
        </button>
        <div class="video-container" style="width: 80%; max-width: 1000px; aspect-ratio: 16/9; background: #000;">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1" title="Founder Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

    <!-- 7. Newsletter -->
    <section class="section container newsletter-section animate-on-scroll" style="margin-top: 80px;">
      <h2>Join the Inner Circle</h2>
      <p class="text-muted" style="margin-bottom: 30px;">Subscribe for exclusive drops, early access to sales, and 10% off your first order.</p>
      <form class="newsletter-form">
        <div class="input-group" style="max-width: 400px; margin: 0 auto;">
          <input type="email" id="email" required placeholder="Enter your email address">
          <button type="submit" class="btn btn-primary">JOIN</button>
        </div>
      </form>
    </section>
  `;
}
