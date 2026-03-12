

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

// 2. INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    renderDeals(businessData); // Initial render
    setupPillFilters();
});

// 3. RENDER DEALS
function renderDeals(data) {
    const dealsGrid = document.getElementById('deals-grid');
    if (!dealsGrid) return;

    dealsGrid.innerHTML = '';
    const businessesWithDeals = data.filter(biz => biz.deal !== null);

    if (businessesWithDeals.length === 0) {
        dealsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">No deals found in this category.</p>';
        return;
    }

    businessesWithDeals.forEach(biz => {
        const emoji = typeEmojis[biz.type] || "📍";
        const dealCard = document.createElement('div');
        dealCard.className = 'deal-card';
        dealCard.innerHTML = `
            <div class="deal-image">
                <span class="deal-emoji">${emoji}</span>
                <div class="deal-badge">SPECIAL OFFER</div>
            </div>
            <div class="deal-info">
                <h3>${biz.name}</h3>
                <p class="deal-desc">${biz.deal}</p>
                <div class="deal-meta">
                    <span class="expiry"><i class="far fa-clock"></i> Local Gem Exclusive</span>
                </div>
                <button class="claim-btn" onclick="claimDeal('${biz.code || 'LOCALGEM'}')">Claim Voucher</button>
            </div>
        `;
        dealsGrid.appendChild(dealCard);
    });
}

// 4. PILL FILTER LOGIC
function setupPillFilters() {
    const pills = document.querySelectorAll('.deal-pill');
    
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // UI Update
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filterValue = pill.innerText.trim();

            if (filterValue === "All Deals") {
                renderDeals(businessData);
            } else {
                const filtered = businessData.filter(biz => biz.dealType === filterValue);
                renderDeals(filtered);
            }
        });
    });
}

// 5. MODAL LOGIC
function claimDeal(code) {
    const modal = document.getElementById('deal-modal');
    const voucherBox = document.getElementById('voucher-code');
    if(modal && voucherBox) {
        voucherBox.innerText = code;
        modal.style.display = "block";
    }
}

function closeModal() {
    document.getElementById('deal-modal').style.display = "none";
}

function copyCode() {
    const code = document.getElementById('voucher-code').innerText;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerText;
        btn.innerText = "Copied!";
        btn.style.background = "#27AE60";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "#FF5A1F";
        }, 2000);
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('deal-modal');
    if (event.target == modal) modal.style.display = "none";
}