/**
 * COMMUNITY MAGNET - Core Logic
 */

// Global state for non-checkbox filters
let activeRating = 0;
let activePrice = null;

// 2. INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    renderBusinessCards(businessData);
    setupFilters();
    setupSpecialFilters(); // Added for Rating and Price
});

// 3. RENDER CARDS
function renderBusinessCards(data) {
    const grid = document.getElementById('business-grid');
    if (!grid) return;

    grid.innerHTML = ''; 
    const favorites = JSON.parse(localStorage.getItem('communityFavorites')) || [];

    if (data.length === 0) {
        grid.innerHTML = '<p class="no-results">No businesses match your filters.</p>';
        return;
    }

    data.forEach(biz => {
        const isFavorited = favorites.includes(biz.id);
        const heartClass = isFavorited ? 'fas' : 'far';
        
        // Use business image or a default placeholder
        const businessImg = biz.image || 'https://via.placeholder.com/300x200?text=No+Image';

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${businessImg}" alt="${biz.name}" class="card-main-img">
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

// 4. FILTERING LOGIC
function applyAllFilters() {
    let filtered = businessData;

    // 1. Favorites Filter
    const favCheckbox = document.getElementById('feat-verified');
    if (favCheckbox && favCheckbox.checked) {
        const favorites = JSON.parse(localStorage.getItem('communityFavorites')) || [];
        filtered = filtered.filter(biz => favorites.includes(biz.id));
    }

    // 2. Categories Filter
    const activeSubtypeCheckboxes = Array.from(document.querySelectorAll('.scroll-filter-box input:checked'));
    const activeSubtypes = activeSubtypeCheckboxes.map(cb => cb.nextElementSibling.innerText.trim());
    if (activeSubtypes.length > 0) {
        filtered = filtered.filter(biz => activeSubtypes.includes(biz.type));
    }

    // 3. Accessibility Features
    if (document.getElementById('acc-wifi').checked) filtered = filtered.filter(biz => biz.wifi);
    if (document.getElementById('acc-pet').checked) filtered = filtered.filter(biz => biz.petFriendly);
    if (document.getElementById('acc-wheel').checked) filtered = filtered.filter(biz => biz.accessible);

    // 4. Rating Filter
    if (activeRating > 0) {
        filtered = filtered.filter(biz => biz.rating >= activeRating);
    }

    // 5. Price Filter
    if (activePrice) {
        filtered = filtered.filter(biz => biz.price === activePrice);
    }

    renderBusinessCards(filtered);
}

function setupFilters() {
    const checkboxes = document.querySelectorAll('.sidebar-filters input[type="checkbox"]');
    checkboxes.forEach(box => {
        box.addEventListener('change', applyAllFilters);
    });
}

// 5. RATING & PRICE INTERACTIVITY
function setupSpecialFilters() {
    // Rating Stars
    const stars = document.querySelectorAll('.rating-stars-filter i');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            activeRating = parseInt(e.target.getAttribute('data-value'));
            
            // Update UI
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.getAttribute('data-value')) <= activeRating);
            });
            applyAllFilters();
        });
    });

    // Price Buttons
    const priceBtns = document.querySelectorAll('.price-btn');
    priceBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // If clicking the same one, toggle it off
            if (activePrice === e.target.innerText) {
                activePrice = null;
                e.target.classList.remove('active');
            } else {
                priceBtns.forEach(b => b.classList.remove('active'));
                activePrice = e.target.innerText;
                e.target.classList.add('active');
            }
            applyAllFilters();
        });
    });
}

// 6. FAVORITES
function toggleFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('communityFavorites')) || [];
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('communityFavorites', JSON.stringify(favorites));
    applyAllFilters();
}

function viewBusiness(id) {
    window.location.href = `details.html?id=${id}`;
}

// 7. AI ASSISTANT
function toggleChat() {
    document.getElementById('chat-window').classList.toggle('chat-hidden');
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    appendMessage(msg, 'user-msg');
    input.value = '';

    // Show "typing..."
    const typingDiv = appendMessage("Thinking...", 'bot-msg');
    
    setTimeout(() => {
        typingDiv.remove();
        const response = getBotResponse(msg.toLowerCase());
        appendMessage(response, 'bot-msg');
    }, 1200); // Simulate a 1.2s "thinking" delay
}

function appendMessage(text, className) {
    const div = document.createElement('div');
    div.className = className;
    div.innerText = text;
    document.getElementById('chat-body').appendChild(div);
    document.getElementById('chat-body').scrollTop = document.getElementById('chat-body').scrollHeight;
    return div;
}

function getBotResponse(input) {
    // Intelligent Keyword Mapping
    if (input.includes("hello") || input.includes("hi")) return "Hello! How can I help you find a local St. Louis spot today?";
    
    if (input.includes("coffee") || input.includes("cafe")) {
        const cafe = businessData.find(b => b.type.includes("Cafes"));
        return `You should try ${cafe.name} at ${cafe.address}! It has a ${cafe.rating} rating.`;
    }

    if (input.includes("deal") || input.includes("coupon")) {
        const dealBiz = businessData.find(b => b.deal !== null);
        return dealBiz ? `Good news! ${dealBiz.name} currently has a deal: ${dealBiz.deal}.` : "No active deals right now, check back later!";
    }

    if (input.includes("books")) {
        return "Left Bank Books is a community favorite for book lovers in the CWE!";
    }

    return "I'm not sure about that, but try asking me about 'coffee', 'deals', or a specific shop name!";
}