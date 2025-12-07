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
import { Profile } from './pages/UserProfile.js';

import { handleShopEvents } from './shop_events.js';
import './components/BestSellers.css';
import './components/Reviews.css';
import './components/ProductDetail.css';

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

// Initialize Hero Swiper
const initHeroSwiper = () => {
  const heroSwiperEl = document.querySelector('.hero-swiper');
  if (heroSwiperEl) {
    new Swiper(heroSwiperEl, {
      modules: [Pagination, Autoplay, EffectFade],
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
};

// Initialize Swiper (renamed from initSwiper to initProductSwiper to avoid confusion with hero swiper)
const initProductSwiper = () => {
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
  const backCartBtn = document.getElementById('back-cart');
  if (backCartBtn) {
    backCartBtn.addEventListener('click', close);
  }

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
      modal.remove();
      navigateTo('/shop');
    }

    if (btn.id === 'checkout-btn') {
      modal.remove();
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

    // Handle profile page tab switching via hash
    if (path === '/profile') {
      const hash = window.location.hash.slice(1); // Remove the #
      const tabRadio = hash === 'addresses'
        ? document.getElementById('up-tab-addresses')
        : document.getElementById('up-tab-orders'); // Default to orders
      if (tabRadio) {
        tabRadio.checked = true;
      }
    }
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
  initHeroSwiper();
  initProductSwiper();
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

  // Theme Switching for Navbar
  const header = document.querySelector('.site-header');
  if (path === '/shop' || path === '/all-products' || path === '/best-sellers' || path.startsWith('/product/')) {
    header.classList.add('shop-nav');
  } else {
    header.classList.remove('shop-nav');
  }
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
        // renderCart(); // Removed to prevent auto-opening cart
      }
    }

    // Profile Page: Add Address Modal Handling
    const modal = document.getElementById('up-address-modal');
    if (modal) {
      // Open Modal
      if (e.target.closest('#btn-add-address-empty') || e.target.closest('#btn-add-address-list')) {
        modal.classList.add('open');
      }

      // Close Modal
      if (e.target.closest('#btn-close-modal') || e.target.closest('#btn-cancel-modal') || e.target === modal) {
        modal.classList.remove('open');
        // Optional: clear errors
        document.querySelectorAll('.up-input').forEach(i => i.classList.remove('error'));
        document.querySelectorAll('.up-error-msg').forEach(msg => msg.style.display = 'none');
      }

      // Save Address logic
      if (e.target.closest('#btn-save-address')) {
        const fullname = document.getElementById('addr-fullname');
        const phone = document.getElementById('addr-phone');
        const line1 = document.getElementById('addr-line1');
        const line2 = document.getElementById('addr-line2');
        const city = document.getElementById('addr-city');
        const state = document.getElementById('addr-state');
        const pincode = document.getElementById('addr-pincode');
        const isDefault = document.getElementById('addr-default').checked;

        let isValid = true;

        // Helper to validate
        const validateField = (input, condition) => {
          const errorMsg = input.nextElementSibling; // Assuming structure
          if (!condition) {
            input.classList.add('error');
            if (errorMsg && errorMsg.classList.contains('up-error-msg')) errorMsg.style.display = 'block';
            isValid = false;
          } else {
            input.classList.remove('error');
            if (errorMsg && errorMsg.classList.contains('up-error-msg')) errorMsg.style.display = 'none';
          }
        };

        validateField(fullname, fullname.value.trim() !== '');
        validateField(phone, /^\d{10}$/.test(phone.value.trim()));
        validateField(line1, line1.value.trim() !== '');
        validateField(city, city.value.trim() !== '');
        validateField(state, state.value !== '');
        validateField(pincode, /^\d{6}$/.test(pincode.value.trim()));

        if (isValid) {
          // Create Address Card
          const addressHTML = `
                    <div class="up-address-card">
                        <div class="up-address-name">
                            ${fullname.value} 
                            ${isDefault ? '<span class="up-tag-default">Default</span>' : ''}
                        </div>
                        <div class="up-address-details">
                            ${line1.value}, ${line2.value ? line2.value + ', ' : ''}<br>
                            ${city.value}, ${state.value} - ${pincode.value}
                        </div>
                        <div class="up-address-phone">
                            Phone: ${phone.value}
                        </div>
                    </div>
                 `;

          // Inject
          const listView = document.getElementById('address-list-view');
          const emptyView = document.getElementById('address-empty-view');
          const addAnotherBtn = document.getElementById('btn-add-address-list');

          // Insert before the 'Add another' buttons
          addAnotherBtn.insertAdjacentHTML('beforebegin', addressHTML);

          // Toggle Views
          emptyView.style.display = 'none';
          listView.style.display = 'block';

          // Close Modal
          modal.classList.remove('open');

          // Clear Form
          fullname.value = '';
          phone.value = '';
          line1.value = '';
          line2.value = '';
          city.value = '';
          state.value = '';
          pincode.value = '';
          document.getElementById('addr-default').checked = false;
        }
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


  });

  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;



    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down -> Hide
      header.classList.add('nav-hidden');
    } else {
      // Scrolling up -> Show
      header.classList.remove('nav-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  // Create overlay if it doesn't exist
  let menuOverlay = document.querySelector('.menu-overlay');
  if (!menuOverlay) {
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
  }

  // Create mobile drawer if it doesn't exist
  let mobileDrawer = document.querySelector('.mobile-drawer');
  if (!mobileDrawer && navMenu) {
    mobileDrawer = document.createElement('div');
    mobileDrawer.className = 'mobile-drawer';

    // Clone all children of nav-menu to capture dropdowns
    Array.from(navMenu.children).forEach(child => {
      const clonedChild = child.cloneNode(true);
      mobileDrawer.appendChild(clonedChild);

      // Add click listener for dropdowns in mobile
      if (clonedChild.classList.contains('dropdown')) {
        const toggle = clonedChild.querySelector('.dropdown-toggle');
        if (toggle) {
          toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            clonedChild.classList.toggle('active');
          });
        }
      }
    });

    // Add Wishlist Link manually
    const wishlistLink = document.createElement('a');
    wishlistLink.href = '/wishlist';
    wishlistLink.className = 'nav-link';
    wishlistLink.textContent = 'WISHLIST';
    wishlistLink.setAttribute('data-link', '');
    mobileDrawer.appendChild(wishlistLink);

    document.body.appendChild(mobileDrawer);
  }

  if (mobileMenuBtn && mobileDrawer) {
    const toggleMenu = () => {
      const isActive = mobileDrawer.classList.contains('active');

      if (isActive) {
        // Close Menu
        mobileDrawer.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll

        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
      } else {
        // Open Menu
        mobileDrawer.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll

        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'x');
      }
      initIcons();
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu); // Close on overlay click

    // Close menu when clicking a link
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target.matches('.nav-link')) {
        toggleMenu(); // Use toggle function to ensure cleanup
      }
    });
  }

  router();

  // Handle hash changes for profile page tab switching
  window.addEventListener('hashchange', () => {
    if (window.location.pathname === '/profile') {
      const hash = window.location.hash.slice(1);
      const tabRadio = hash === 'addresses'
        ? document.getElementById('up-tab-addresses')
        : document.getElementById('up-tab-orders');
      if (tabRadio) {
        tabRadio.checked = true;
      }
    }
  });

  // Update URL hash when profile tabs are clicked
  document.body.addEventListener('change', (e) => {
    if (e.target.name === 'up-tab-control' && window.location.pathname === '/profile') {
      const tabId = e.target.id;
      if (tabId === 'up-tab-orders') {
        window.location.hash = 'orders';
      } else if (tabId === 'up-tab-addresses') {
        window.location.hash = 'addresses';
      }
    }
  });
});
