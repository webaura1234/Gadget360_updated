import { products } from './data/products.js';
import { cart } from './cart.js';

export function handleShopEvents(initAnimationsCallback) {
    const shopPage = document.querySelector('.shop-page');
    if (!shopPage) return;

    const productGrid = document.querySelector('.product-grid');
    const sortSelect = document.querySelector('.sort-select');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceSlider = document.querySelector('.price-slider');
    const priceValue = document.querySelector('.price-value');
    const showingText = document.querySelector('.showing-text');
    const scrollSentinel = document.getElementById('scroll-sentinel');
    const loadingIndicator = document.querySelector('.loading-indicator');

    let currentCategory = 'All';
    let maxPrice = 3000;
    let currentSort = 'featured';

    // Infinite Scroll State
    let displayedCount = 0;
    const itemsPerBatch = 8;
    let filteredProducts = [];
    let isLoading = false;

    function filterAndSortProducts() {
        let filtered = products.filter(p => {
            const matchCategory = currentCategory === 'All' || p.category === currentCategory;
            const matchPrice = p.price <= maxPrice;
            return matchCategory && matchPrice;
        });

        // Sorting
        if (currentSort === 'low-high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'high-low') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'newest') {
            filtered.sort((a, b) => b.id - a.id);
        }

        filteredProducts = filtered;
        displayedCount = 0;
        productGrid.innerHTML = ''; // Clear grid on filter change
        loadMoreProducts();
    }

    function loadMoreProducts() {
        if (isLoading) return;
        if (displayedCount >= filteredProducts.length) {
            if (loadingIndicator) loadingIndicator.style.display = 'none';
            return;
        }

        isLoading = true;
        if (loadingIndicator) loadingIndicator.style.display = 'block';

        // Simulate network delay for smooth effect
        setTimeout(() => {
            const nextBatch = filteredProducts.slice(displayedCount, displayedCount + itemsPerBatch);

            const html = nextBatch.map(product => `
        <div class="best-seller-card animate-on-scroll">
          <div class="best-seller-badge" style="display: ${product.badge ? 'block' : 'none'}">${product.badge}</div>
          <a href="/product/${product.id}" data-link style="display: block; width: 100%;">
            <div class="best-seller-image-wrapper">
              <img src="${product.image}" alt="${product.name}" class="img-primary">
              <img src="${product.altImage || product.image}" alt="${product.name} Alternate" class="img-secondary">
            </div>
            <div class="best-seller-info">
              <h3 class="best-seller-title">${product.name}</h3>
              <p class="best-seller-price">From Rs. ${product.price.toFixed(2)}</p>
            </div>
          </a>
          
          <div class="best-seller-thumbnails">
            <img src="${product.image}" class="best-seller-thumb" alt="Variant 1">
            <img src="${product.altImage || product.image}" class="best-seller-thumb" alt="Variant 2">
            <img src="${product.image}" class="best-seller-thumb" alt="Variant 3">
            <img src="${product.altImage || product.image}" class="best-seller-thumb" alt="Variant 4">
          </div>

          <button class="cinematic-add-btn btn-add-to-cart" data-id="${product.id}" style="margin-top: 15px; width: 100%;">Quick Add</button>
        </div>
      `).join('');

            productGrid.insertAdjacentHTML('beforeend', html);
            displayedCount += nextBatch.length;

            showingText.textContent = `Showing ${displayedCount} of ${filteredProducts.length} products`;

            if (initAnimationsCallback) initAnimationsCallback();

            isLoading = false;
            if (loadingIndicator) loadingIndicator.style.display = 'none';

            // Check if we need to load more immediately (if screen is large)
            if (displayedCount < filteredProducts.length && scrollSentinel.getBoundingClientRect().top < window.innerHeight + 10) {
                loadMoreProducts();
            }
        }, 500);
    }

    // Intersection Observer for Infinite Scroll
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMoreProducts();
        }
    }, { rootMargin: '10px' });

    if (scrollSentinel) {
        observer.observe(scrollSentinel);
    }

    // Event Listeners
    categoryFilters.forEach(cb => {
        cb.addEventListener('change', (e) => {
            if (e.target.checked) {
                categoryFilters.forEach(c => {
                    if (c !== e.target) c.checked = false;
                });
                currentCategory = e.target.value;
            } else {
                currentCategory = 'All';
                const allCb = document.querySelector('.category-filter[value="All"]');
                if (allCb) allCb.checked = true;
            }
            filterAndSortProducts();
        });
    });

    priceSlider.addEventListener('input', (e) => {
        maxPrice = parseInt(e.target.value);
        priceValue.textContent = `₹${maxPrice}`;
        filterAndSortProducts();
    });

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        filterAndSortProducts();
    });

    // Initial Render
    filterAndSortProducts();
}
