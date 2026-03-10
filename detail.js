const businessData = [
    { 
        id: 1, 
        name: "Sakura Sushi Haven", 
        type: "restaurant", 
        location: "Central District", 
        image: "https://via.placeholder.com/1200x600/9B2E2E/FFFFFF?text=Sushi+Bar",
        details: { menu: ["Spicy Tuna Roll", "Miso Soup", "Dragon Roll"], highlight: "Chef's Special" }
    },
    { 
        id: 2, 
        name: "Vintage Threads", 
        type: "retail", 
        location: "West End", 
        image: "https://via.placeholder.com/1200x600/FF5A1F/FFFFFF?text=Thrift+Store",
        details: { sections: ["Menswear", "Accessories", "90s Retro"], highlight: "New Arrivals Daily" }
    },
    { 
        id: 3, 
        name: "Quick Fix Auto", 
        type: "service", 
        location: "North Heights", 
        image: "https://via.placeholder.com/1200x600/6D3D3D/FFFFFF?text=Mechanic+Shop",
        details: { services: ["Oil Change", "Tire Rotation", "Brake Check"], highlight: "Same Day Service" }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const bizId = parseInt(params.get('id'));
    const biz = businessData.find(b => b.id === bizId);

    if (biz) {
        document.getElementById('biz-name').innerText = biz.name;
        document.getElementById('biz-cat').innerText = biz.type.toUpperCase();
        document.getElementById('biz-loc').innerText = biz.location;
        document.getElementById('hero-bg').style.backgroundImage = `url('${biz.image}')`;
        
        const infoSection = document.getElementById('dynamic-info-section');
        
        // --- CONDITIONAL TEMPLATE LOGIC ---
        if (biz.type === "restaurant") {
            infoSection.innerHTML = `
                <div class="tab-container"><button class="tab-btn active">Menu</button></div>
                <div class="list-container">
                    ${biz.details.menu.map(item => `<div class="list-item"><span>${item}</span><i class="fas fa-plus"></i></div>`).join('')}
                </div>
            `;
        } else if (biz.type === "retail") {
            infoSection.innerHTML = `
                <div class="tab-container"><button class="tab-btn active">Inventory</button></div>
                <div class="inventory-grid">
                    ${biz.details.sections.map(sec => `<div class="pill">${sec}</div>`).join('')}
                </div>
                <p class="promo-box"><strong>Note:</strong> ${biz.details.highlight}</p>
            `;
        } else if (biz.type === "service") {
            infoSection.innerHTML = `
                <div class="tab-container"><button class="tab-btn active">Service List</button></div>
                <div class="list-container">
                    ${biz.details.services.map(ser => `<div class="list-item"><span>${ser}</span><button class="btn-small">Book</button></div>`).join('')}
                </div>
            `;
        }
    }
});