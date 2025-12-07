import { products } from '../data/products.js';

export function Home() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);

  return `
    <!-- 1. Spotlight Hero -->
    <!-- 1. Spotlight Hero (Carousel) -->
    <section class="hero-cinematic" style="padding: 0; height: 80vh; min-height: 600px; margin-bottom: 0; display: flex;">
      <div class="swiper hero-swiper" style="width: 100%; height: 100%;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="https://thecasefactory.in/cdn/shop/files/banner_02_v2.jpg?v=1753091030&width=1800" alt="Hero 1" class="hero-slide-image" style="vertical-align: bottom;">
          </div>
          <div class="swiper-slide">
            <img src="https://thecasefactory.in/cdn/shop/files/banner_03.jpg?v=1753091030&width=1800" alt="Hero 2" class="hero-slide-image" style="vertical-align: bottom;">
          </div>
          <div class="swiper-slide">
            <img src="https://thecasefactory.in/cdn/shop/files/banner_01_v2_ef6e1b14-26e9-470e-9da1-0ab0eede4c24.jpg?v=1753101304&width=1800" alt="Hero 3" class="hero-slide-image" style="vertical-align: bottom;">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </section>

    <!-- New Section: Shop by Category -->
    <section class="category-section section text-dark" style="background-color: #f6f6f6; padding-top: 40px; padding-bottom: 40px;">
      <div class="container-fluid">
        <div class="section-header" style="justify-content: center; margin-bottom: 30px;">
          <h2 style="font-size: 2rem; font-weight: 700; text-transform: uppercase; color: #333;">Shop by Category</h2>
        </div>
        
        <div class="category-grid">
          ${(() => {
      const NAV_CATEGORIES = [
        { id: 'cases', label: 'Cases', imageCategory: 'Cases' },
        { id: 'chargers', label: 'Chargers', imageCategory: 'Chargers' },
        { id: 'cables', label: "Cable's", imageCategory: 'Cables' },
        { id: 'powerbanks', label: 'Powerbanks', imageCategory: 'Powerbanks' },
        { id: 'gadgets', label: "Gadget's", imageCategory: 'Gadgets' },
        { id: 'diecast', label: 'DieCast', imageCategory: 'DieCast' },
        { id: 'marshall', label: 'Marshall', imageCategory: 'Marshall' },
        { id: 'sony', label: 'Sony', imageCategory: 'Sony' }
      ];

      return NAV_CATEGORIES.map(cat => {
        const product = products.find(p => p.category === cat.imageCategory) || products[0];
        return `
                <a href="/category/${cat.id}" class="category-card" data-link>
                  <div class="category-image-wrapper">
                    <img src="${product.image}" alt="${cat.label}" class="img-primary">
                    <img src="${product.image}" alt="${cat.label}" class="img-secondary">
                  </div>
                  <div class="category-info">
                    <h3 class="category-title">${cat.label}</h3>
                    <p class="category-action" style="font-size: 0.8rem; color: #888; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-top: 5px;">View Collection</p>
                  </div>
                </a>
              `;
      }).join('');
    })()}
        </div>
      </div>
    </section>

    <!-- New Section: Premium Cases -->
    <section class="section text-dark" style="background-color: #ffffff; padding-top: 60px; padding-bottom: 60px; margin-bottom: 0; border-bottom: 1px solid #e5e5e5;">
      <div class="container-fluid">
        <div class="section-header" style="justify-content: center; border-bottom: none; margin-bottom: 40px;">
          <h2 style="font-size: 2.5rem; font-weight: 800; letter-spacing: -1px; color: #000000; text-transform: uppercase;">PREMIUM CASES</h2>
        </div>
        <div class="best-seller-grid">
          ${products.filter(p => p.category.includes('Case')).slice(0, 4).map(product => `
            <div class="best-seller-card">
              <div class="best-seller-badge">BUY 1 GET 2</div>
              <a href="/product/${product.id}" data-link style="display: block; width: 100%;">
                <div class="best-seller-image-wrapper">
                  <img src="${product.image}" alt="${product.name}" class="img-primary">
                  <img src="${product.altImage || product.image}" alt="${product.name} Alt" class="img-secondary">
                </div>
                <div class="best-seller-info">
                  <h3 class="best-seller-title" style="color: #000; font-weight: 700; letter-spacing: -0.5px;">${product.name}</h3>
                  <p class="best-seller-price" style="color: #333;">From Rs. ${product.price.toFixed(2)}</p>
                </div>
              </a>
              
              <div class="best-seller-thumbnails">
                <img src="${product.image}" class="best-seller-thumb" alt="Variant 1">
                <img src="${product.altImage || product.image}" class="best-seller-thumb" alt="Variant 2">
                <img src="${product.image}" class="best-seller-thumb" alt="Variant 3">
                <img src="${product.altImage || product.image}" class="best-seller-thumb" alt="Variant 4">
              </div>

              <button class="cinematic-add-btn btn-add-to-cart" data-id="${product.id}">Quick Add</button>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- New Section: Die Cast Cars -->
    <section class="section text-white" style="background-color: #000000; padding-top: 60px; padding-bottom: 60px; margin-bottom: 0;">
      <div class="container-fluid">
        <div class="section-header" style="justify-content: center; border-bottom: none; margin-bottom: 40px;">
          <h2 style="font-size: 2.5rem; font-weight: 800; letter-spacing: -1px; color: #FFFFFF; text-transform: uppercase;">DIE CAST COLLECTION</h2>
        </div>
        <div class="best-seller-grid">
          ${products.filter(p => p.category === 'Die Cast').slice(0, 4).map(product => `
            <div class="best-seller-card">
              <div class="best-seller-badge">BUY 1 GET 2</div>
              <a href="/product/${product.id}" data-link style="display: block; width: 100%;">
                <div class="best-seller-image-wrapper">
                  <img src="${product.image}" alt="${product.name}" class="img-primary">
                  <img src="${product.altImage || product.image}" alt="${product.name} Alt" class="img-secondary">
                </div>
                <div class="best-seller-info">
                  <h3 class="best-seller-title" style="color: #FFF; font-weight: 700; letter-spacing: -0.5px;">${product.name}</h3>
                  <p class="best-seller-price" style="color: #CCC;">From Rs. ${product.price.toFixed(2)}</p>
                </div>
              </a>

              <div class="best-seller-thumbnails">
                <img src="${product.image}" class="best-seller-thumb" alt="Variant 1">
                <img src="${product.altImage || product.image}" class="best-seller-thumb" alt="Variant 2">
                <img src="${product.image}" class="best-seller-thumb" alt="Variant 3">
                <img src="${product.altImage || product.image}" class="best-seller-thumb" alt="Variant 4">
              </div>

              <button class="cinematic-add-btn btn-add-to-cart" data-id="${product.id}" style="background: #FFF; color: #000;">Quick Add</button>
            </div>
          `).join('')}
        </div>
        
        <div class="text-center" style="margin-top: 60px;">
          <a href="/shop" class="btn btn-cinematic" style="color: #FFF; border-color: #FFF;" data-link>Load more</a>
        </div>
      </div>
    </section>



    <!-- 5. Reels Review Section -->
    <section class="reels-section animate-on-scroll" style="background-color: #f6f6f6;">
      <div class="container">
        <div class="reels-header">
          <h2>Unboxing the Truth</h2>
          <p>Real customers. Real reviews. Real protection.</p>
        </div>
      </div>

      <div class="reels-container">
        <div class="swiper reels-swiper">
          <div class="swiper-wrapper">
            <!-- Reel 1 -->
            <div class="swiper-slide">
              <div class="reel-card">
                <video src="https://cdn.pixabay.com/video/2024/03/04/202987-919379330_large.mp4"
                  poster="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=600"
                  autoplay muted loop playsinline webkit-playsinline class="reel-video"></video>
                <div class="reel-label">Screen Guard Installation</div>
              </div>
            </div>
            <!-- Reel 2 -->
            <div class="swiper-slide">
              <div class="reel-card">
                <video src="https://cdn.pixabay.com/video/2020/05/04/38084-416330724_large.mp4"
                  poster="https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&q=80&w=600"
                  autoplay muted loop playsinline webkit-playsinline class="reel-video"></video>
                <div class="reel-label">Drop Test</div>
              </div>
            </div>
            <!-- Reel 3 -->
            <div class="swiper-slide">
              <div class="reel-card">
                <video src="https://cdn.pixabay.com/video/2021/09/15/88686-607824521_large.mp4"
                  poster="https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?auto=format&fit=crop&q=80&w=600"
                  autoplay muted loop playsinline webkit-playsinline class="reel-video"></video>
                <div class="reel-label">Daily Use Review</div>
              </div>
            </div>
            <!-- Reel 4 -->
            <div class="swiper-slide">
              <div class="reel-card">
                <video src="https://cdn.pixabay.com/video/2021/01/28/63241-505964153_large.mp4"
                  poster="https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&q=80&w=600"
                  autoplay muted loop playsinline webkit-playsinline class="reel-video"></video>
                <div class="reel-label">MagSafe Strength</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="reels-explore-container">
        <a href="#" class="reels-explore-btn">
          Explore More <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
        </a>
      </div>
    </section>

    <!-- 6. Customer Reviews Section -->
    <section class="reviews-section animate-on-scroll">
      <div class="container">
        <div class="reviews-header">
          <h2>Customer Reviews</h2>
          <p>What our community is saying</p>
        </div>

        <div class="reviews-scroller">
          <div class="reviews-track">
            <!-- Review 1 -->
            <div class="review-card">
              <div class="review-stars">
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
              </div>
              <p class="review-text">"Absolutely love the quality! The case feels premium and the protection is top-notch. Highly recommended!"</p>
              <div class="review-author">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" class="review-avatar" alt="User">
                <div class="review-info">
                  <h4>Alex Johnson</h4>
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>

            <!-- Review 2 -->
            <div class="review-card">
              <div class="review-stars">
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
              </div>
              <p class="review-text">"Best case I've ever owned. The MagSafe works perfectly and the design is stunning."</p>
              <div class="review-author">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" class="review-avatar" alt="User">
                <div class="review-info">
                  <h4>Sarah Williams</h4>
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>

            <!-- Review 3 -->
            <div class="review-card">
              <div class="review-stars">
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
              </div>
              <p class="review-text">"Fast shipping and great packaging. The case fits my phone perfectly."</p>
              <div class="review-author">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" class="review-avatar" alt="User">
                <div class="review-info">
                  <h4>Michael Brown</h4>
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>

            <!-- Review 4 -->
            <div class="review-card">
              <div class="review-stars">
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
              </div>
              <p class="review-text">"I dropped my phone yesterday and not a scratch! This case is a lifesaver."</p>
              <div class="review-author">
                <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100" class="review-avatar" alt="User">
                <div class="review-info">
                  <h4>David Lee</h4>
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>

            <!-- Review 5 -->
            <div class="review-card">
              <div class="review-stars">
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
              </div>
              <p class="review-text">"Stylish and protective. I get compliments on it all the time."</p>
              <div class="review-author">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100" class="review-avatar" alt="User">
                <div class="review-info">
                  <h4>Emily Davis</h4>
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>

             <!-- Duplicates for infinite scroll -->
            <div class="review-card">
              <div class="review-stars">
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
              </div>
              <p class="review-text">"Absolutely love the quality! The case feels premium and the protection is top-notch. Highly recommended!"</p>
              <div class="review-author">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" class="review-avatar" alt="User">
                <div class="review-info">
                  <h4>Alex Johnson</h4>
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>

             <div class="review-card">
              <div class="review-stars">
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
                <i data-lucide="star" fill="#f1c40f" stroke="none"></i>
              </div>
              <p class="review-text">"Best case I've ever owned. The MagSafe works perfectly and the design is stunning."</p>
              <div class="review-author">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" class="review-avatar" alt="User">
                <div class="review-info">
                  <h4>Sarah Williams</h4>
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </section>
  `;
}
