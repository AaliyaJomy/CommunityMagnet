document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const bizId = params.get('id');
    const biz = businessData.find(b => b.id === (bizId || "blue-01")); 

    if (biz) {
        // Core Info
        document.getElementById('biz-name').innerText = biz.name;
        document.getElementById('biz-cat').innerText = biz.type;
        document.getElementById('biz-address').innerText = biz.address;
        document.getElementById('biz-phone').innerText = biz.phone || "Contact via Website";
        document.getElementById('biz-hours').innerText = biz.hours || "Inquire for hours";
        document.getElementById('biz-price').innerText = biz.price;
        
        // Amenities Logic (Mapped from true/false fields)
        const amenities = [];
        if (biz.wifi) amenities.push("Free Wi-Fi");
        if (biz.accessible) amenities.push("ADA Accessible");
        if (biz.petFriendly) amenities.push("Pet Friendly");
        document.getElementById('biz-service-type').innerText = amenities.length > 0 ? amenities.join(", ") : "Standard Service";

        // Background Image
        document.getElementById('hero-bg').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${biz.image}')`;

        // Deals Logic
        const dealLink = document.getElementById('biz-link');
        if (biz.deal) {
            dealLink.innerText = `CLAIM DEAL: ${biz.deal} (Use Code: ${biz.code || 'None'})`;
            dealLink.style.background = "var(--primary)";
        } else {
            dealLink.href = `https://www.google.com/search?q=${encodeURIComponent(biz.name)}`;
            dealLink.innerText = "Search on Google";
        }
    }
});

// Existing functions
function submitReview() {
    alert("Thank you! Your review has been submitted for verification.");
    document.getElementById('review-text').value = "";
}