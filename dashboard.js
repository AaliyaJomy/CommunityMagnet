// 1. Data Prep
const userData = JSON.parse(localStorage.getItem('cm_user')) || { username: "Explorer" };
const favoriteIds = JSON.parse(localStorage.getItem('communityFavorites')) || [];

/**
 * Renders the favorites list and updates stats
 */
function initDashboard() {
    console.log("Initializing Dashboard...");
    const favList = document.getElementById('favorites-list');
    const welcomeMsg = document.getElementById('welcome-msg');
    const favCount = document.getElementById('fav-count');

    if (welcomeMsg) welcomeMsg.innerText = `Welcome, ${userData.username}!`;
    if (favCount) favCount.innerText = favoriteIds.length;

    if (!favList) return;

    if (favoriteIds.length === 0) {
        favList.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #f9f9f9; border-radius: 15px;">
                <p style="color: #888;">No favorites yet.</p>
                <a href="index.html" style="color: #FF5A1F; text-decoration: none; font-weight: 600;">Explore Businesses →</a>
            </div>`;
        return;
    }

    favList.innerHTML = '';
    
    // Ensure businessData exists from data.js
    if (typeof businessData === 'undefined') {
        console.error("Error: businessData is not defined. Check if data.js is loaded.");
        return;
    }

    favoriteIds.forEach(id => {
        const biz = businessData.find(b => b.id === id);
        if (biz) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-img-wrapper" style="background-image: url('${biz.image}'); height: 180px; background-size: cover; background-position: center; position: relative;">
                    <button onclick="removeFavorite('${biz.id}')" style="position: absolute; top: 10px; right: 10px; border: none; background: white; color: #FF5A1F; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div style="padding: 15px;">
                    <h4 style="margin: 0 0 5px 0;">${biz.name}</h4>
                    <p style="font-size: 0.8rem; color: #888; margin-bottom: 12px;">${biz.type}</p>
                    <button onclick="window.location.href='details.html?id=${biz.id}'" style="width: 100%; padding: 8px; border: 1px solid #FF5A1F; background: transparent; color: #FF5A1F; border-radius: 5px; cursor: pointer; font-weight: 600;">
                        View Details
                    </button>
                </div>`;
            favList.appendChild(card);
        }
    });
}

/**
 * Removes a favorite and refreshes
 */
function removeFavorite(id) {
    let favs = JSON.parse(localStorage.getItem('communityFavorites')) || [];
    favs = favs.filter(favId => favId !== id);
    localStorage.setItem('communityFavorites', JSON.stringify(favs));
    location.reload();
}

/**
 * Generates the PDF Report
 */
function generatePDFReport() {
    if (favoriteIds.length === 0) {
        alert("No favorites to export!");
        return;
    }

    const reportWindow = window.open('', '_blank');
    const reportHTML = `
        <html>
        <head>
            <title>Impact Report | ${userData.username}</title>
            <style>
                body { font-family: sans-serif; padding: 40px; color: #333; }
                .header { border-bottom: 3px solid #FF5A1F; padding-bottom: 10px; }
                .biz-item { border: 1px solid #eee; padding: 10px; margin: 10px 0; border-radius: 8px; }
            </style>
        </head>
        <body>
            <div class="header"><h1>Community Magnet Impact Report</h1><p>Member: ${userData.username}</p></div>
            <h2>Saved Favorites (${favoriteIds.length})</h2>
            ${favoriteIds.map(id => {
                const biz = businessData.find(b => b.id === id);
                return biz ? `<div class="biz-item"><strong>${biz.name}</strong> - ${biz.type}<br>${biz.address}</div>` : '';
            }).join('')}
            <script>window.onload = function() { window.print(); window.close(); };<\/script>
        </body>
        </html>`;
    
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
}

// Start the dashboard
document.addEventListener('DOMContentLoaded', initDashboard);