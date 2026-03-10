/**
 * COMMUNITY MAGNET - Core Logic
 * Handles: Data Rendering, Filtering, Search, and Page Navigation
 */

// 1. DUMMY DATA (This would eventually come from a Database API)
const businessData = [
    {
        id: 1,
        name: "Sakura Sushi Haven",
        category: "Food",
        rating: 4.8,
        price: "$$$",
        location: "Central District",
        image: "https://via.placeholder.com/300x200/9B2E2E/FFFFFF?text=Sushi+Haven",
        verified: true,
        deal: "15% Off First Visit"
    },
    {
        id: 2,
        name: "Vintage Threads",
        category: "Retail",
        rating: 4.5,
        price: "$$",
        location: "West End",
        image: "https://via.placeholder.com/300x200/FF5A1F/FFFFFF?text=Vintage+Threads",
        verified: true,
        deal: null
    },
    {
        id: 3,
        name: "Ramen Revelations",
        category: "Food",
        rating: 4.7,
        price: "$$",
        location: "North Heights",
        image: "https://via.placeholder.com/300x200/F9A11B/FFFFFF?text=Ramen+Shop",
        verified: false,
        deal: "BOGO Ramen Mondays"
    }
];

// 2. INITIALIZE PAGE
document.addEventListener('DOMContentLoaded', () => {
    renderBusinessCards(businessData);
    setupFilters();
});

// 3. RENDER CARDS TO GRID
function renderBusinessCards(data) {
    const grid = document.getElementById('business-grid');
    if (!grid) return; // Exit if not on the discovery page

    grid.innerHTML = ''; // Clear existing cards

    data.forEach(biz => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${biz.image}" alt="${biz.name}">
                ${biz.verified ? '<span class="card-verified-badge">Verified</span>' : ''}
                <button class="card-bookmark-btn"><i class="far fa-heart"></i></button>
            </div>
            <div class="card-content">
                <div class="card-rating">
                    <i class="fas fa-star"></i> <span>${biz.rating}/5</span>
                </div>
                <h3 class="card-title">${biz.name}</h3>
                <p class="card-category">${biz.category} • ${biz.location}</p>
                <div class="card-price-deal">
                    <span class="price-start">Starting at ${biz.price}</span>
                    ${biz.deal ? `<span class="deal-tag">${biz.deal}</span>` : ''}
                </div>
            </div>
            <div class="card-action">
                <button class="btn-card-visit" onclick="viewBusiness(${biz.id})">View Details</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 4. FILTERING LOGIC
function setupFilters() {
    const checkboxes = document.querySelectorAll('.sidebar-filters input[type="checkbox"]');
    
    checkboxes.forEach(box => {
        box.addEventListener('change', () => {
            const activeCategories = Array.from(checkboxes)
                .filter(i => i.checked)
                .map(i => i.id.replace('cat-', '').toLowerCase());

            if (activeCategories.length === 0) {
                renderBusinessCards(businessData); // Show all if none selected
            } else {
                const filtered = businessData.filter(biz => 
                    activeCategories.includes(biz.category.toLowerCase())
                );
                renderBusinessCards(filtered);
            }
        });
    });
}

// 5. NAVIGATION HELPER
function viewBusiness(id) {
    window.location.href = `business.html?id=${id}`;
}

// 6. INPUT VALIDATION (Anti-Bot Check)
function validateReview(input) {
    const pattern = /^[a-zA-Z0-9\s,.!?]*$/;
    if (!pattern.test(input)) {
        console.error("Invalid characters detected.");
        return false;
    }
    return true;
}

