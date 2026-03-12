let selectedRating = 0;
const params = new URLSearchParams(window.location.search);
const bizId = params.get('id') || "left-01"; // Fallback ID

document.addEventListener('DOMContentLoaded', () => {
    const biz = businessData.find(b => b.id === bizId); 

    if (biz) {
        // ... (Keep your existing Core Info code here) ...
        document.getElementById('biz-name').innerText = biz.name;
        document.getElementById('biz-cat').innerText = biz.type;
        document.getElementById('biz-address').innerText = biz.address;
        document.getElementById('biz-phone').innerText = biz.phone || "Contact via Website";
        document.getElementById('biz-hours').innerText = biz.hours || "Inquire for hours";
        document.getElementById('biz-price').innerText = biz.price;
        document.getElementById('hero-bg').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${biz.image}')`;

        // Amenities & Deals Logic (Keep your existing code)
        
        // Initialize Reviews
        loadReviews();
        setupStarRating();
    }
});

// 1. STAR RATING LOGIC
function setupStarRating() {
    const stars = document.querySelectorAll('#star-input i');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            selectedRating = e.target.getAttribute('data-rating');
            // Update UI: color the stars
            stars.forEach(s => {
                const sRating = s.getAttribute('data-rating');
                if (sRating <= selectedRating) {
                    s.classList.replace('far', 'fas');
                    s.style.color = "#FFD700"; // Gold
                } else {
                    s.classList.replace('fas', 'far');
                    s.style.color = "#ccc";
                }
            });
        });
    });
}

// 2. SUBMIT REVIEW
function submitReview() {
    const text = document.getElementById('review-text').value;
    
    if (selectedRating === 0) return alert("Please select a star rating!");
    if (text.trim() === "") return alert("Please write a comment!");

    const newReview = {
        bizId: bizId,
        rating: selectedRating,
        comment: text,
        date: new Date().toLocaleDateString()
    };

    // Save to LocalStorage
    let reviews = JSON.parse(localStorage.getItem('community_reviews')) || [];
    reviews.push(newReview);
    localStorage.setItem('community_reviews', JSON.stringify(reviews));

    // Clear Form
    document.getElementById('review-text').value = "";
    selectedRating = 0;
    
    // Refresh List
    loadReviews();
    alert("Review posted!");
}

// 3. LOAD REVIEWS
function loadReviews() {
    const list = document.getElementById('reviews-list');
    let allReviews = JSON.parse(localStorage.getItem('community_reviews')) || [];
    
    // Filter reviews only for THIS business
    const filteredReviews = allReviews.filter(r => r.bizId === bizId);

    if (filteredReviews.length === 0) {
        list.innerHTML = "<p style='color: #888;'>No reviews yet. Be the first!</p>";
        return;
    }

    list.innerHTML = filteredReviews.map(rev => `
        <div class="review-item" style="border-bottom: 1px solid #eee; padding: 15px 0;">
            <div style="color: #FFD700; margin-bottom: 5px;">
                ${'<i class="fas fa-star"></i>'.repeat(rev.rating)}
            </div>
            <p style="margin-bottom: 5px;">"${rev.comment}"</p>
            <small style="color: #888;">Posted on ${rev.date}</small>
        </div>
    `).join('');
}