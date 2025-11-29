import { products } from './data/products.js';

export const handleShopEvents = (initAnimations) => {
    const sortSelect = document.querySelector('.sort-select');
    const productGrid = document.querySelector('.product-grid');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const priceSlider = document.querySelector('.price-slider');
    const priceValue = document.querySelector('.price-value');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageNumbers = document.querySelector('.page-numbers');
    const showingText = document.querySelector('.showing-text');

    if (!productGrid) return;

    // State
    let state = {
        categories: ['All'],
        maxPrice: 3000,
        sortBy: 'featured',
        currentPage: 1,
        itemsPerPage: 6
    };

    // Filter, Sort, and Paginate Logic
    const getProcessedProducts = () => {
        let filtered = products.filter(product => {
            // Category Filter
            if (!state.categories.includes('All')) {
                if (!state.categories.includes(product.category)) return false;
            }
            // Price Filter
            if (product.price > state.maxPrice) return false;
            return true;
        });

        // Sort
        if (state.sortBy === 'low-high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (state.sortBy === 'high-low') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (state.sortBy === 'newest') {
            filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        } else {
            filtered.sort((a, b) => a.id - b.id);
        }

        return filtered;
    };

    const renderProducts = () => {
        const processed = getProcessedProducts();
        const totalPages = Math.ceil(processed.length / state.itemsPerPage);

        // Adjust current page if out of bounds
        if (state.currentPage > totalPages) state.currentPage = totalPages || 1;

        const start = (state.currentPage - 1) * state.itemsPerPage;
        const end = start + state.itemsPerPage;
        const paginated = processed.slice(start, end);

        // Update Grid
        if (processed.length === 0) {
            productGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No products found matching your criteria.</p>';
        } else {
            productGrid.innerHTML = paginated.map(product => `
        <div class="product-card animate-on-scroll">
          <a href="/product/${product.id}" class="product-image" data-link style="display: block; cursor: pointer;">
            <img src="${product.image}" alt="${product.name}">
            ${product.isNew ? '<span class="badge badge-new">New</span>' : ''}
            ${product.price < 150 ? '<span class="badge badge-sale">Sale</span>' : ''}
          </a>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price.toFixed(2)}</p>
            <div class="product-actions" style="display: flex; gap: 10px; justify-content: center;">
              <button class="btn btn-primary btn-sm btn-add-to-cart" data-id="${product.id}" style="width: 100%;">Add to Cart</button>
            </div>
          </div>
        </div>
      `).join('');
        }

        // Update Showing Text
        if (showingText) showingText.textContent = `Showing ${paginated.length} of ${processed.length} products`;

        // Update Pagination UI
        if (prevBtn) prevBtn.disabled = state.currentPage === 1;
        if (nextBtn) nextBtn.disabled = state.currentPage === totalPages || totalPages === 0;

        if (pageNumbers) {
            pageNumbers.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.className = `btn btn-outline ${i === state.currentPage ? 'active' : ''}`;
                btn.textContent = i;
                btn.style.margin = '0'; // Removed margin since we use gap
                if (i === state.currentPage) {
                    btn.classList.add('active'); // Use class for active state
                    // Inline styles are handled by CSS .active now, but keeping for safety if CSS fails
                    btn.style.backgroundColor = 'var(--color-primary)';
                    btn.style.color = '#fff';
                    btn.style.borderColor = 'var(--color-primary)';
                }
                btn.onclick = () => {
                    state.currentPage = i;
                    renderProducts();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };
                pageNumbers.appendChild(btn);
            }
        }

        // Re-init animations for new elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-up');
                    observer.unobserve(entry.target);
                }
            });
        });
        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    };

    // Event Listeners
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            renderProducts();
        });
    }

    if (categoryFilters) {
        categoryFilters.forEach(cb => {
            cb.addEventListener('change', (e) => {
                const val = e.target.value;
                if (val === 'All') {
                    if (e.target.checked) {
                        state.categories = ['All'];
                        categoryFilters.forEach(c => {
                            if (c.value !== 'All') c.checked = false;
                        });
                    } else {
                        if (state.categories.length === 1 && state.categories[0] === 'All') {
                            e.target.checked = true;
                        }
                    }
                } else {
                    if (e.target.checked) {
                        state.categories = state.categories.filter(c => c !== 'All');
                        state.categories.push(val);
                        const allCb = document.querySelector('.category-filter[value="All"]');
                        if (allCb) allCb.checked = false;
                    } else {
                        state.categories = state.categories.filter(c => c !== val);
                        if (state.categories.length === 0) {
                            state.categories = ['All'];
                            const allCb = document.querySelector('.category-filter[value="All"]');
                            if (allCb) allCb.checked = true;
                        }
                    }
                }
                state.currentPage = 1;
                renderProducts();
            });
        });
    }

    if (priceSlider) {
        priceSlider.addEventListener('input', (e) => {
            state.maxPrice = parseInt(e.target.value);
            if (priceValue) priceValue.textContent = `₹${state.maxPrice}`;
            state.currentPage = 1;
            renderProducts();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (state.currentPage > 1) {
                state.currentPage--;
                renderProducts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const processed = getProcessedProducts();
            const totalPages = Math.ceil(processed.length / state.itemsPerPage);
            if (state.currentPage < totalPages) {
                state.currentPage++;
                renderProducts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Initial Render
    renderProducts();
};
