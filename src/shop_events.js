import { products } from './data/products.js';
import { cart } from './cart.js';

export function handleShopEvents(initAnimationsCallback) {
    const shopPage = document.querySelector('.shop-page');
    if (!shopPage) return;

    // Check for Category Page context
    const pageCategory = shopPage.dataset.category ? decodeURIComponent(shopPage.dataset.category) : null;

    const productGrid = document.querySelector('.product-grid');
    const sortSelect = document.querySelector('.sort-select');
    const showingText = document.querySelector('.showing-text');
    const scrollSentinel = document.getElementById('scroll-sentinel');
    const loadingIndicator = document.querySelector('.loading-indicator');

    // New Filter Elements
    const priceSliderMin = document.getElementById('priceRangeMin');
    const priceSliderMax = document.getElementById('priceRangeMax');
    const minPriceValue = document.getElementById('minPriceValue');
    const maxPriceValue = document.getElementById('maxPriceValue');
    const colorInputs = document.querySelectorAll('input[name="color"]');

    let currentSort = 'featured';
    let minPrice = 0;
    let maxPrice = 50000;
    let selectedColor = 'All';

    // Infinite Scroll State
    let displayedCount = 0;
    const itemsPerBatch = 8;
    let filteredProducts = [];
    let isLoading = false;

    // Helper for Star Rating
    function getStarRating(rating) {
        return Array(5).fill(0).map((_, i) =>
            `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="${i < Math.floor(rating) ? '#FFD700' : 'none'}" stroke="${i < Math.floor(rating) ? '#FFD700' : '#ccc'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
        ).join('');
    }

    function showNoProductsMessage() {
        // Check if filters are applied
        const hasFilters = minPrice > 0 || maxPrice < 50000 || selectedColor !== 'All';
        const categoryText = pageCategory ? `in ${pageCategory}` : '';
        
        let messageText = '';
        if (pageCategory && hasFilters) {
            messageText = `in ${pageCategory} matching your filters`;
        } else if (pageCategory) {
            messageText = `in ${pageCategory}`;
        } else if (hasFilters) {
            messageText = 'matching your filters';
        } else {
            messageText = 'available';
        }
        
        productGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #666;">
                <h3 style="font-size: 1.5rem; margin-bottom: 10px; color: #333;">No products found</h3>
                <p>We couldn't find any items ${messageText}.</p>
                ${pageCategory || hasFilters ? `<button class="btn btn-primary" style="margin-top: 20px;" onclick="window.location.href='/shop'">View All Products</button>` : ''}
            </div>
        `;
    }

    function updateGrid(items) {
        // If it's the first batch and no items, show empty message
        if (items.length === 0 && displayedCount === 0) {
            showNoProductsMessage();
            return;
        }

        const html = items.map(product => {
            const isNewBadge = product.isNew ? '<span class="badge badge-new" style="position: absolute; top: 10px; left: 10px; background: #000; color: #fff; padding: 4px 8px; font-size: 10px; border-radius: 4px; z-index: 2;">NEW</span>' : '';
            const isSaleBadge = !product.isNew && product.isBestSeller ? '<span class="badge badge-sale" style="position: absolute; top: 10px; left: 10px; background: #cc0000; color: #fff; padding: 4px 8px; font-size: 10px; border-radius: 4px; z-index: 2;">BESTSELLER</span>' : '';

            return `
        <div class="best-seller-card animate-on-scroll">
          ${isNewBadge}
          ${isSaleBadge}
          <a href="/product/${product.id}" data-link style="display: block; width: 100%;">
            <div class="best-seller-image-wrapper">
              <img src="${product.image}" alt="${product.name}" class="img-primary">
              <img src="${product.altImage || product.image}" alt="${product.name} Alternate" class="img-secondary">
            </div>
            <div class="best-seller-info">
              <div class="rating-stars" style="display: flex; gap: 2px; margin-bottom: 5px;">
                  ${getStarRating(product.rating)}
              </div>
              <h3 class="best-seller-title">${product.name}</h3>
              <p class="best-seller-price">Rs. ${product.price.toLocaleString()}</p>
            </div>
          </a>
          
          <button class="cinematic-add-btn btn-add-to-cart" data-id="${product.id}" style="margin-top: 15px; width: 100%;">Quick Add</button>
        </div>
      `;
        }).join('');

        productGrid.insertAdjacentHTML('beforeend', html);

        // Re-init icons
        if (window.lucide) window.lucide.createIcons();
    }

    function filterAndSortProducts() {
        let filtered = products.filter(p => {
            // Page Level Category Filter (Case Insensitive)
            if (pageCategory && p.category.toLowerCase() !== pageCategory.toLowerCase()) return false;

            // Price Filter
            if (p.price < minPrice || p.price > maxPrice) return false;

            // Color Filter (Inferred)
            if (selectedColor !== 'All') {
                const colorQuery = selectedColor.toLowerCase();
                const searchableText = `${p.name} ${p.description} ${p.category}`.toLowerCase();

                // Special case for 'Clear'
                if (colorQuery === 'clear' && searchableText.includes('clear')) return true;

                // General color matching
                if (!searchableText.includes(colorQuery)) return false;
            }

            return true;
        });

        // Sorting
        if (currentSort === 'low-high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === 'high-low') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === 'rating') {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (currentSort === 'latest') {
            filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id - a.id);
        } else if (currentSort === 'featured') {
            // Default sort, maybe prioritize best sellers
            filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        }

        filteredProducts = filtered;
        displayedCount = 0;
        productGrid.innerHTML = ''; // Clear grid on filter change
        
        // Check if no products found and show message immediately
        if (filteredProducts.length === 0) {
            showNoProductsMessage();
            if (showingText) showingText.textContent = 'No products found';
            if (loadingIndicator) loadingIndicator.style.display = 'none';
            return;
        }
        
        loadMoreProducts();
    }

    function loadMoreProducts() {
        if (isLoading) return;
        
        // Check if no products available
        if (filteredProducts.length === 0) {
            showNoProductsMessage();
            if (showingText) showingText.textContent = 'No products found';
            if (loadingIndicator) loadingIndicator.style.display = 'none';
            return;
        }
        
        if (displayedCount >= filteredProducts.length) {
            if (loadingIndicator) loadingIndicator.style.display = 'none';
            return;
        }

        isLoading = true;
        if (loadingIndicator) loadingIndicator.style.display = 'block';

        // Simulate network delay for smooth effect
        setTimeout(() => {
            const nextBatch = filteredProducts.slice(displayedCount, displayedCount + itemsPerBatch);

            updateGrid(nextBatch); // Use the new updateGrid function

            displayedCount += nextBatch.length;

            showingText.textContent = `Showing ${displayedCount} of ${filteredProducts.length} products`;

            if (initAnimationsCallback) initAnimationsCallback();

            isLoading = false;
            if (loadingIndicator) loadingIndicator.style.display = 'none';

            // Check if we need to load more immediately (if screen is large)
            if (displayedCount < filteredProducts.length && scrollSentinel.getBoundingClientRect().top < window.innerHeight + 10) {
                loadMoreProducts();
            }
        }, 300);
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
    const filterToggle = document.getElementById('filterToggle');
    const filterCard = document.getElementById('filterCard');

    if (filterToggle && filterCard) {
        filterToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            filterCard.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!filterCard.contains(e.target) && !filterToggle.contains(e.target)) {
                filterCard.classList.remove('active');
            }
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterAndSortProducts();
        });
    }

    // Dual Range Slider Logic
    const dualRangeContainer = document.querySelector('.dual-range-container');
    const maxSliderValue = 50000;

    function updatePriceDisplay() {
        if (minPriceValue) minPriceValue.textContent = minPrice.toLocaleString();
        if (maxPriceValue) maxPriceValue.textContent = maxPrice.toLocaleString();
        
        // Update the active range track
        if (dualRangeContainer) {
            const minPercent = (minPrice / maxSliderValue) * 100;
            const maxPercent = (maxPrice / maxSliderValue) * 100;
            dualRangeContainer.style.setProperty('--min-percent', `${minPercent}%`);
            dualRangeContainer.style.setProperty('--max-percent', `${maxPercent}%`);
        }
    }

    function handlePriceSliderChange() {
        filterAndSortProducts();
    }

    if (priceSliderMin && priceSliderMax) {
        priceSliderMin.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            // Ensure min doesn't exceed max
            if (value > maxPrice) {
                minPrice = maxPrice;
                priceSliderMin.value = maxPrice;
            } else {
                minPrice = value;
            }
            updatePriceDisplay();
            handlePriceSliderChange();
        });

        priceSliderMax.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            // Ensure max doesn't go below min
            if (value < minPrice) {
                maxPrice = minPrice;
                priceSliderMax.value = minPrice;
            } else {
                maxPrice = value;
            }
            updatePriceDisplay();
            handlePriceSliderChange();
        });

        // Initialize display
        updatePriceDisplay();
    }

    if (colorInputs) {
        colorInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                selectedColor = e.target.value;
                filterAndSortProducts();
            });
        });
    }

    // Initial Render
    filterAndSortProducts();
}
