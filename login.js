// --- MOCK AUTHENTICATION LOGIC ---

function toggleAuth(type) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        loginTab.classList.remove('active');
        signupTab.classList.add('active');
    }
}

// Make globally accessible for the onclick attributes
window.toggleAuth = toggleAuth;

document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Honeypot check
        const honeypot = document.getElementById('user_middle_name')?.value || document.getElementById('user_alt_email')?.value;
        if (honeypot) return;

        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;
        const isSignUp = form.id === 'signup-form';
        
        // Get name if signing up, otherwise use email prefix
        const fullName = isSignUp ? form.querySelector('input[type="text"]').value : email.split('@')[0];

        // --- SIMULATED LOGIN PROCESS ---
        const userData = {
            username: fullName,
            email: email,
            isLoggedIn: true,
            favorites: ["blue-01", "vinyl-01"] // Default mock favorites
        };

        // Save to LocalStorage
        localStorage.setItem('cm_user', JSON.stringify(userData));

        alert(isSignUp ? "Account Created!" : "Welcome Back!");
        window.location.href = 'index.html';
    });
});