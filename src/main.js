import { Home } from './pages/Home.js';
import { Shop } from './pages/Shop.js';
import { ProductDetail } from './pages/ProductDetail.js';
import { Sale } from './pages/Sale.js';
import { Help } from './pages/Help.js';
import { Legal } from './pages/Legal.js';
import { Checkout } from './pages/Checkout.js';
import { OrderSuccess } from './pages/OrderSuccess.js';
import { initIcons } from './utils.js';
import { cart } from './cart.js';
import { CartModal, initCartIcons } from './components/CartModal.js';
import { products } from './data/products.js';
import Profile from './pages/Profile.js';
import { handleShopEvents } from './shop_events.js';

// Import Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const routes = {
  '/': Home,
  '/shop': Shop,
  '/sale': Sale,
  '/help': Help,
  '/login': () => `
    <div class="container" style="max-width: 400px; padding: 100px 0;">
      <h1 class="text-center" style="margin-bottom: 30px;">Log In</h1>
      <form class="newsletter-form">
        <input type="email" placeholder="Email" style="padding: 10px; margin-bottom: 10px; width: 100%; background: #111; color: #fff; border: 1px solid #2A2A2A; border-radius: 4px;" required>
        <input type="password" placeholder="Password" style="padding: 10px; margin-bottom: 20px; width: 100%; background: #111; color: #fff; border: 1px solid #2A2A2A; border-radius: 4px;" required>
        <button class="btn btn-primary" style="width: 100%;">LOG IN</button>
        <p class="text-center" style="margin-top: 10px;"><a href="#" style="text-decoration: underline;">Create Account</a></p>
      </form>
    </div>
  `,
  '/all-products': Shop,
  '/best-sellers': () => Shop(),
  '/legal': () => Legal('legal'),
  '/terms': () => Legal('terms'),
  '/privacy': () => Legal('privacy'),
  '/shipping': () => Legal('shipping'),
  '/refund': () => Legal('refund'),
  '/accessibility': () => Legal('accessibility'),
  '/checkout': Checkout,
  '/order-success': OrderSuccess,
  '/profile': Profile,
};

// Animation Observer & Advanced Animations
const initAnimations = () => {
  // 1. Scroll Progress Bar (Only create if not exists)
  if (!document.querySelector('.scroll-progress-container')) {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-container';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.prepend(progressBar);

    const bar = progressBar.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      bar.style.width = scrolled + '%';
    });
  }

  // 2. Floating Support Button (Only create if not exists)
  if (!document.querySelector('.support-btn')) {
    const supportBtn = document.createElement('div');
    supportBtn.className = 'support-btn';
    supportBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
    document.body.appendChild(supportBtn);

    supportBtn.addEventListener('click', () => {
      navigateTo('/help');
    });
  }

  // 3. Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('category-card')) {
          entry.target.classList.add('animate-pop-in');
        } else {
          entry.target.classList.add('animate-fade-up');
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // 4. Parallax Hero
  // Always clean up previous listener
  if (window.parallaxHandlerRef) {
    window.removeEventListener('scroll', window.parallaxHandlerRef);
    window.parallaxHandlerRef = null;
  }

  const heroBg = document.querySelector('.slide-bg');
  if (heroBg) {
    const parallaxHandler = () => {
      const scroll = window.scrollY;
      if (heroBg) heroBg.style.transform = `translateY(${scroll * 0.5}px) scale(1.1)`;
    };
    window.parallaxHandlerRef = parallaxHandler;
    window.addEventListener('scroll', parallaxHandler);
  }
};

// Initialize Swiper
const initSwiper = () => {
  const swiperEl = document.querySelector('.swiper');
  // Only init main hero swiper if it doesn't have reels-swiper class
  if (swiperEl && !swiperEl.classList.contains('reels-swiper')) {
    new Swiper(swiperEl, {
      modules: [Navigation, Pagination, Autoplay, EffectFade],
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // Navigation arrows removed
    });
  }
};

const initReelsSwiper = () => {
  const swiperEl = document.querySelector('.reels-swiper');
  if (swiperEl) {
    new Swiper(swiperEl, {
      modules: [Autoplay],
      slidesPerView: 1.2,
      spaceBetween: 10,
      loop: false,
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20,
      grabCursor: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
      },
    });
  }
};

const initShowcaseSwiper = () => {
  const swiperEl = document.querySelector('.showcase-swiper');
  if (swiperEl) {
    new Swiper(swiperEl, {
      modules: [Autoplay, EffectFade],
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      },
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  }
};

const initMaterialCards = () => {
  const cards = document.querySelectorAll('.material-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const texture = card.querySelector('.material-texture');
      const x = (e.clientX - card.getBoundingClientRect().left) / card.offsetWidth;
      const y = (e.clientY - card.getBoundingClientRect().top) / card.offsetHeight;

      texture.style.transform = `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px) scale(1.1)`;
    });

    card.addEventListener('mouseleave', () => {
      const texture = card.querySelector('.material-texture');
      texture.style.transform = 'translate(0, 0) scale(1)';
    });
  });
};

// Cart UI Handler (Same as before)
const renderCart = () => {
  const existingModal = document.getElementById('cart-overlay');
  if (existingModal) existingModal.remove();

  document.body.insertAdjacentHTML('beforeend', CartModal());
  initCartIcons();

  const modal = document.getElementById('cart-overlay');
  requestAnimationFrame(() => modal.classList.add('open'));

  const close = () => {
    modal.classList.remove('open');
    setTimeout(() => modal.remove(), 300);
  };

  document.getElementById('close-cart').addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  modal.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const id = parseInt(btn.dataset.id);
    const action = btn.dataset.action;

    if (action === 'increase') {
      const item = cart.items.find(i => i.id === id);
      if (item) cart.updateQuantity(id, item.quantity + 1);
    } else if (action === 'decrease') {
      const item = cart.items.find(i => i.id === id);
      if (item) cart.updateQuantity(id, item.quantity - 1);
    } else if (action === 'remove') {
      cart.removeItem(id);
    }

    if (btn.id === 'start-shopping') {
      close();
      navigateTo('/shop');
    }

    if (btn.id === 'checkout-btn') {
      close();
      navigateTo('/checkout');
    }
  });
};

const updateCartCount = () => {
  const countBadge = document.querySelector('.cart-count');
  if (countBadge) {
    countBadge.textContent = cart.count;
    countBadge.style.display = cart.count > 0 ? 'flex' : 'none';
  }
  if (document.getElementById('cart-overlay')) {
    renderCart();
  }
};

cart.subscribe(updateCartCount);

// Profile & Checkout Event Delegation
const handleGlobalEvents = () => {
  // We only need to set this up once, but since router calls this on every page load,
  // we should ensure we don't duplicate listeners.
  // However, the current architecture calls init functions on every route.
  // A better approach for this codebase is to use the existing global click listener in DOMContentLoaded
  // and add our logic there.
};

// We will move the logic to the global listener at the bottom of the file
// and remove these specific handler functions to avoid confusion/duplication.
// But to keep the structure similar, we can leave empty functions or remove calls.


const router = async () => {
  const path = window.location.pathname;
  const app = document.getElementById('app');

  let page = routes[path];

  if (!page && path.startsWith('/product/')) {
    const id = path.split('/')[2];
    page = () => ProductDetail(id);
  }

  if (page) {
    app.innerHTML = await page();
    window.scrollTo(0, 0);
  } else {
    app.innerHTML = `
      <div class="container text-center" style="padding: 100px 0;">
        <h1>404 - Page Not Found</h1>
        <a href="/" class="btn btn-primary" data-link>Go Home</a>
      </div>
    `;
  }

  initIcons();
  updateCartCount();

  // Initialize new UI features
  initSwiper();
  initReelsSwiper();
  initShowcaseSwiper();
  initMaterialCards();
  handleShopEvents(initAnimations);
  initAnimations();

  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

const navigateTo = url => {
  window.history.pushState(null, null, url);
  router();
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    } else if (e.target.closest('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.closest('[data-link]').href);
    }

    if (e.target.closest('.btn-cart')) {
      renderCart();
    }

    // Founder Video Modal
    const btnPlayVideo = document.getElementById('btn-play-video');
    const videoModal = document.getElementById('video-modal');
    const closeVideoModal = document.getElementById('close-video-modal');

    if (btnPlayVideo && videoModal) {
      btnPlayVideo.addEventListener('click', () => {
        videoModal.style.display = 'flex';
        // Auto-play video if possible (handled by iframe src usually, but we can't easily manipulate iframe content cross-origin without API)
        // For now, just showing the modal is enough.
      });
    }

    if (closeVideoModal && videoModal) {
      closeVideoModal.addEventListener('click', () => {
        videoModal.style.display = 'none';
        // Stop video by resetting src
        const iframe = videoModal.querySelector('iframe');
        if (iframe) {
          const src = iframe.src;
          iframe.src = src;
        }
      });
    }

    if (videoModal) {
      videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
          videoModal.style.display = 'none';
          const iframe = videoModal.querySelector('iframe');
          if (iframe) {
            const src = iframe.src;
            iframe.src = src;
          }
        }
      });
    }

    // Profile: View Order Details
    const viewOrderBtn = e.target.closest('.btn-view-order');
    if (viewOrderBtn) {
      const orderId = viewOrderBtn.dataset.id;
      const orderModal = document.getElementById('order-modal');
      const orderModalBody = document.getElementById('order-modal-body');

      if (orderModal && orderModalBody) {
        // Mock data
        const orderDetails = {
          id: orderId,
          date: 'Nov 28, 2025',
          status: 'Delivered',
          items: [
            { name: 'Crystal Clear MagSafe Case', price: 1200, qty: 1, image: 'https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&q=80&w=100' }
          ],
          total: 1200
        };

        orderModalBody.innerHTML = `
          <h2 style="margin-bottom: 20px;">Order Details</h2>
          <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #333;">
            <p><strong>Order ID:</strong> #${orderDetails.id}</p>
            <p><strong>Date:</strong> ${orderDetails.date}</p>
            <p><strong>Status:</strong> <span class="status status-delivered">${orderDetails.status}</span></p>
          </div>
          <div style="margin-bottom: 20px;">
            ${orderDetails.items.map(item => `
              <div class="flex items-center gap-md" style="margin-bottom: 15px;">
                <img src="${item.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                <div>
                  <h4>${item.name}</h4>
                  <p class="text-muted">Qty: ${item.qty} x ₹${item.price}</p>
                </div>
                <div style="margin-left: auto;">₹${item.price * item.qty}</div>
              </div>
            `).join('')}
          </div>
          <div style="border-top: 1px solid #333; padding-top: 20px; text-align: right;">
            <h3>Total: ₹${orderDetails.total.toFixed(2)}</h3>
          </div>
        `;
        orderModal.style.display = 'flex';
      }
    }

    // Profile: Close Modal
    if (e.target.closest('#close-order-modal') || e.target.id === 'order-modal') {
      const orderModal = document.getElementById('order-modal');
      if (orderModal) orderModal.style.display = 'none';
    }

    // Profile: Add New Address
    if (e.target.closest('#btn-add-address')) {
      const addressFormContainer = document.getElementById('address-form-container');
      const addressForm = document.getElementById('address-form');
      if (addressFormContainer && addressForm) {
        addressFormContainer.style.display = 'block';
        document.getElementById('address-form-title').textContent = 'Add New Address';
        addressForm.reset();
        addressFormContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Profile: Cancel Address
    if (e.target.closest('#btn-cancel-address')) {
      const addressFormContainer = document.getElementById('address-form-container');
      if (addressFormContainer) addressFormContainer.style.display = 'none';
    }

    // Profile: Delete Address
    if (e.target.closest('.btn-delete-address')) {
      if (confirm('Are you sure you want to delete this address?')) {
        e.target.closest('.address-card').remove();
      }
    }

    // Profile: Edit Address
    if (e.target.closest('.btn-edit-address')) {
      const addressFormContainer = document.getElementById('address-form-container');
      if (addressFormContainer) {
        addressFormContainer.style.display = 'block';
        document.getElementById('address-form-title').textContent = 'Edit Address';
        addressFormContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Profile: Tabs
    const profileTab = e.target.closest('.profile-tab');
    if (profileTab) {
      const target = profileTab.dataset.tab;
      if (target) {
        document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
        profileTab.classList.add('active');
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        const pane = document.getElementById(target);
        if (pane) pane.classList.add('active');
      }
    }

    // Product Detail: Thumbnails
    const thumb = e.target.closest('.thumbnail-list img');
    if (thumb) {
      const mainImage = document.querySelector('.main-image img');
      const thumbnails = document.querySelectorAll('.thumbnail-list img');
      if (mainImage) {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.src = thumb.src;
          mainImage.style.opacity = '1';
        }, 200);
      }
    }

    // Product Detail: Tabs
    const tabBtn = e.target.closest('.tab-headers button');
    if (tabBtn) {
      const tabButtons = document.querySelectorAll('.tab-headers button');
      tabButtons.forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
    }

    const addToCartBtn = e.target.closest('.btn-add-to-cart');
    if (addToCartBtn) {
      const id = parseInt(addToCartBtn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) {
        let quantity = 1;
        let color = 'Default';

        // Check if we are in product detail view
        const container = addToCartBtn.closest('.product-info-col');
        if (container) {
          const qtyInput = container.querySelector('input[type="number"]');
          const colorSelect = container.querySelector('select');
          if (qtyInput) quantity = parseInt(qtyInput.value);
          if (colorSelect) color = colorSelect.value;
        }

        cart.addItem(product, quantity, { color });
        renderCart();
      }
    }

    const buyNowBtn = e.target.closest('.btn-buy-now');
    if (buyNowBtn) {
      const id = parseInt(buyNowBtn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) {
        let quantity = 1;
        let color = 'Default';

        const container = buyNowBtn.closest('.product-info-col');
        if (container) {
          const qtyInput = container.querySelector('input[type="number"]');
          const colorSelect = container.querySelector('select');
          if (qtyInput) quantity = parseInt(qtyInput.value);
          if (colorSelect) color = colorSelect.value;
        }

        cart.addItem(product, quantity, { color });
        navigateTo('/checkout');
      }
    }
  });

  // Global Change Listener (Delegation)
  document.body.addEventListener('change', e => {
    // Checkout: Payment Method
    if (e.target.name === 'payment') {
      const cardDetails = document.getElementById('card-details');
      if (cardDetails) {
        cardDetails.style.display = e.target.value === 'card' ? 'block' : 'none';
      }
    }

    // Checkout: Address Selection
    if (e.target.name === 'delivery-address') {
      const newAddressForm = document.getElementById('new-address-form');
      if (newAddressForm) {
        if (e.target.value === 'new') {
          newAddressForm.style.display = 'block';
          newAddressForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          newAddressForm.style.display = 'none';
        }
      }
    }
  });

  document.body.addEventListener('submit', e => {
    if (e.target.id === 'checkout-form') {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      btn.textContent = 'PROCESSING...';
      btn.disabled = true;

      setTimeout(() => {
        cart.clear();
        navigateTo('/order-success');
      }, 1500);
    }

    // Profile: Save Address
    if (e.target.id === 'address-form') {
      e.preventDefault();
      const addressList = document.getElementById('address-list');
      const btnAddAddress = document.getElementById('btn-add-address');
      const addressFormContainer = document.getElementById('address-form-container');

      if (addressList && btnAddAddress) {
        const newCard = document.createElement('div');
        newCard.className = 'address-card';
        newCard.innerHTML = `
                <div class="address-header">
                    <strong>${e.target.querySelector('input[placeholder="Home"]').value || 'New Address'}</strong>
                </div>
                <p>${e.target.querySelector('input[placeholder="John Doe"]').value}</p>
                <p>${e.target.querySelector('input[placeholder="123 Street Name"]').value}</p>
                <p>${e.target.querySelector('input[placeholder="City"]').value}, ${e.target.querySelector('input[placeholder="ZIP Code"]').value}</p>
                <p>${e.target.querySelector('select').value}</p>
                <div class="address-actions">
                    <button class="btn btn-sm btn-link btn-edit-address">Edit</button>
                    <button class="btn btn-sm btn-link text-danger btn-delete-address">Delete</button>
                </div>
            `;
        addressList.insertBefore(newCard, btnAddAddress);
        if (addressFormContainer) addressFormContainer.style.display = 'none';
      }
    }
  });

  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    // Glass effect logic
    if (scrollTop > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/Show logic
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down -> Hide
      header.classList.add('nav-hidden');
    } else {
      // Scrolling up -> Show
      header.classList.remove('nav-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  router();
});
