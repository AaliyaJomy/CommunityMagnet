// Run this on every page load
document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('cm_user'));
    const authLink = document.getElementById('auth-nav-link');

    if (userData && userData.isLoggedIn) {
        // 1. Change Login button to Username + Dropdown
        if (authLink) {
            authLink.innerHTML = `<i class="fas fa-user-circle"></i> ${userData.username}`;
            authLink.classList.add('user-active');
            authLink.href = "dashboard.html"; // Redirect to dashboard
        }

        // 2. Add a logout button to the nav if it doesn't exist
        const navLinks = document.querySelector('.nav-links');
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `<a href="#" onclick="logoutUser()" style="color: var(--highlight)">Logout</a>`;
        navLinks.appendChild(logoutLi);
    }
});

function logoutUser() {
    localStorage.removeItem('cm_user');
    window.location.href = 'index.html';
}

window.logoutUser = logoutUser;