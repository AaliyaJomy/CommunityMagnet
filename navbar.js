import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const authLink = document.getElementById('auth-nav-link');

onAuthStateChanged(auth, (user) => {
    if (user) {
        // USER IS SIGNED IN
        authLink.innerText = "My Profile";
        authLink.href = "dashboard.html"; // Redirect to their dashboard
        authLink.classList.add('profile-mode'); // Optional: style it differently
        
        // Add a logout button if it doesn't exist yet
        if (!document.getElementById('logout-btn')) {
            const logoutLi = document.createElement('li');
            logoutLi.innerHTML = `<a href="#" id="logout-btn" class="logout-btn">Log Out</a>`;
            document.querySelector('.nav-links').appendChild(logoutLi);
            
            // Set up the Logout Button Click
            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                handleLogout();
            });
        }
    } else {
        // USER IS SIGNED OUT
        authLink.innerText = "Log in";
        authLink.href = "login.html";
        
        // Remove logout button if it exists
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) logoutBtn.parentElement.remove();
    }
});

// 2. THE LOGOUT FUNCTION
async function handleLogout() {
    try {
        await signOut(auth);
        alert("You have been logged out.");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Logout Error:", error);
    }
}