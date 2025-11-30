import { products } from '../data/products.js';

export function Home() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);

  return `
    <!-- 1. Spotlight Hero -->
    <section class="hero-cinematic">
      <video class="hero-video" autoplay muted playsinline>
        <source src="https://res.cloudinary.com/djb258n8t/video/upload/v1764533868/Dramatic_iPhone_Case_Animation_Creation_wzu3f0.mp4" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>
      <div class="spotlight"></div>
      <div class="hero-content-cinematic">


        <h1 class="hero-title-cinematic">Crafted for the Bold</h1>
        <a href="/shop" class="btn btn-cinematic" data-link>Explore iPhone Cases</a>
      </div>
    </section>

    <!-- 2. Best Sellers (Cinematic Zoom) -->
    <section class="section container" style="padding: 100px 20px;">
      <div class="section-header" style="border-bottom: 1px solid #222;">
        <h2 style="text-transform: uppercase; letter-spacing: 3px; font-weight: 300;">Best Sellers</h2>
        <a href="/shop" style="text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem;" data-link>View All</a>
      </div>
      <div class="cinematic-grid">
        ${bestSellers.map(product => `
          <div class="cinematic-card">
            <a href="/product/${product.id}" data-link style="display: block; text-align: center;">
              <div class="cinematic-image-wrapper">
                <div class="cinematic-image-slider">
                  <img src="${product.image}" alt="${product.name}">
                  <img src="${product.altImage || product.image}" alt="${product.name} Alternate">
                </div>
              </div>
              <h3 style="font-size: 1.1rem; margin-bottom: 10px; letter-spacing: 1px;">${product.name}</h3>
              <p style="color: #666;">₹${product.price.toFixed(2)}</p>
            </a>
            <button class="cinematic-add-btn btn-add-to-cart" data-id="${product.id}">Quick Add</button>
          </div>
        `).join('')}
      </div>
      <div class="text-center" style="margin-top: 60px;">
        <a href="/shop" class="btn btn-cinematic" style="color: #fff; border-color: #333;" data-link>EXPLORE MORE</a>
      </div>
    </section>

    <!-- 3. Design Philosophy (Sketch to Real) -->
    <section class="philosophy-section">
      <div class="container" style="margin-bottom: 60px; text-align: center;">
        <h2 style="text-transform: uppercase; letter-spacing: 3px; font-weight: 300; margin-bottom: 20px;">Design Philosophy</h2>
        <p style="color: #666; max-width: 600px; margin: 0 auto;">From concept to reality. Hover to reveal the final form.</p>
      </div>
      <div class="philosophy-grid">
        <div class="philosophy-item">
          <img src="https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&q=80&w=800" class="philo-img philo-real">
          <div class="philo-overlay"></div>
          <div class="philo-text">
            <h3 style="text-transform: uppercase; letter-spacing: 2px;">Minimalist</h3>
          </div>
        </div>
        <div class="philosophy-item">
          <img src="https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&q=80&w=800" class="philo-img philo-real">
          <div class="philo-overlay"></div>
          <div class="philo-text">
            <h3 style="text-transform: uppercase; letter-spacing: 2px;">Precision</h3>
          </div>
        </div>
        <div class="philosophy-item">
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" class="philo-img philo-real">
          <div class="philo-overlay"></div>
          <div class="philo-text">
            <h3 style="text-transform: uppercase; letter-spacing: 2px;">Durability</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Materials & Protection -->
    <section class="materials-section">
      <div class="container">
        <h2 class="text-center" style="margin-bottom: 60px; text-transform: uppercase; letter-spacing: 3px; font-weight: 300;">Advanced Materials</h2>
        <div class="grid-3" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2px; background: #222;">
          
          <div class="material-card">
            <div class="material-texture" style="background-image: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');"></div>
            <div class="material-content">
              <h3 style="text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">CarbonShield</h3>
              <p style="color: #666; font-size: 0.9rem;">Aerospace-grade fiber.</p>
            </div>
          </div>

          <div class="material-card">
            <div class="material-texture" style="background-image: url('https://www.transparenttextures.com/patterns/brushed-alum.png');"></div>
            <div class="material-content">
              <h3 style="text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">TitanGuard</h3>
              <p style="color: #666; font-size: 0.9rem;">Impact resistant alloy.</p>
            </div>
          </div>

          <div class="material-card">
            <div class="material-texture" style="background-image: url('https://www.transparenttextures.com/patterns/leather.png');"></div>
            <div class="material-content">
              <h3 style="text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">SoftSilk Grip</h3>
              <p style="color: #666; font-size: 0.9rem;">Tactile perfection.</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 5. Minimal Footer -->
    <footer class="footer-minimal">
      <div class="container">
        <div class="footer-logo-text">GADGET360</div>
        <nav class="footer-nav">
          <a href="/shop" data-link>Shop</a>
          <a href="/about" data-link>About</a>
          <a href="/journal" data-link>Journal</a>
          <a href="/contact" data-link>Contact</a>
        </nav>
        <div class="footer-copy">
          &copy; 2025 GADGET360. All Rights Reserved.
        </div>
      </div>
    </footer>
  `;
}
