/**
 * COMMUNITY MAGNET - Core Logic
 */

// 2. INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    renderBusinessCards(businessData);
    setupFilters();
});

// 3. RENDER CARDS
function renderBusinessCards(data) {
    const grid = document.getElementById('business-grid');
    if (!grid) return;

    grid.innerHTML = ''; 
    const favorites = JSON.parse(localStorage.getItem('communityFavorites')) || [];

    const typeEmojis = {
        "Cafes & Bakeries": "☕",
        "Fine Dining": "🍽️",
        "Fast Food": "🍕",
        "Thrift & Vintage": "👕",
        "Boutiques": "✨",
        "Bookstores": "📖",
        "Auto Repair": "🚗",
        "Hair & Beauty": "💅",
        "Health & Fitness": "💪"
    };

    if (data.length === 0) {
        grid.innerHTML = '<p class="no-results">No businesses match your filters.</p>';
        return;
    }

    data.forEach(biz => {
        const isFavorited = favorites.includes(biz.id);
        const heartClass = isFavorited ? 'fas' : 'far';
        const emoji = typeEmojis[biz.type] || "📍";

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                ${emoji}
                ${biz.deal ? `<span class="deal-tag">Deal Available</span>` : ''}
                <button class="card-bookmark-btn" onclick="toggleFavorite('${biz.id}')">
                    <i class="${heartClass} fa-heart"></i>
                </button>
            </div>
            <div class="card-content">
                <div class="card-rating">
                    <i class="fas fa-star"></i> <span>${biz.rating}/5</span>
                </div>
                <h3 class="card-title">${biz.name}</h3>
                <p class="card-category">${biz.type}</p>
                <p class="card-location"><i class="fas fa-map-marker-alt"></i> ${biz.address}</p>
                <div class="card-features">
                    ${biz.wifi ? '<i class="fas fa-wifi" title="Free WiFi"></i> ' : ''}
                    ${biz.petFriendly ? '<i class="fas fa-dog" title="Pet Friendly"></i> ' : ''}
                    ${biz.accessible ? '<i class="fas fa-wheelchair" title="Accessible"></i>' : ''}
                </div>
                <div class="card-price-deal">
                    <span class="price-start">Price: <strong>${biz.price}</strong></span>
                </div>
            </div>
            <div class="card-action">
                <button class="btn-card-visit" onclick="viewBusiness('${biz.id}')">View Details</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 4. FILTERING
function setupFilters() {
    const checkboxes = document.querySelectorAll('.sidebar-filters input[type="checkbox"]');
    
    checkboxes.forEach(box => {
        box.addEventListener('change', () => {
            let filtered = businessData;

            // Favorites
            const favCheckbox = document.getElementById('feat-verified');
            if (favCheckbox && favCheckbox.checked) {
                const favorites = JSON.parse(localStorage.getItem('communityFavorites')) || [];
                filtered = filtered.filter(biz => favorites.includes(biz.id));
            }

            // Categories
            const activeSubtypeCheckboxes = Array.from(document.querySelectorAll('.scroll-filter-box input:checked'));
            const activeSubtypes = activeSubtypeCheckboxes.map(cb => cb.nextElementSibling.innerText.trim());

            if (activeSubtypes.length > 0) {
                filtered = filtered.filter(biz => activeSubtypes.includes(biz.type));
            }

            // Features
            if (document.getElementById('acc-wifi').checked) filtered = filtered.filter(biz => biz.wifi);
            if (document.getElementById('acc-pet').checked) filtered = filtered.filter(biz => biz.petFriendly);
            if (document.getElementById('acc-wheel').checked) filtered = filtered.filter(biz => biz.accessible);

            renderBusinessCards(filtered);
        });
    });
}

// 5. FAVORITES
function toggleFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('communityFavorites')) || [];
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('communityFavorites', JSON.stringify(favorites));
    
    // Trigger the change event on a checkbox to refresh current view with existing filters
    document.querySelector('.sidebar-filters input').dispatchEvent(new Event('change'));
}

// 6. NAVIGATION
function viewBusiness(id) {
    window.location.href = `details.html?id=${id}`;
}