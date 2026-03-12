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

        // 1. Honeypot check (Good job keeping this!)
        const honeypot = document.getElementById('user_middle_name')?.value || document.getElementById('user_alt_email')?.value;
        if (honeypot) return;

        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;
        const isSignUp = form.id === 'signup-form';
        
        // --- SYNTACTIC VALIDATION ---
        // Email pattern check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return alert("Please enter a valid email address.");
        }

        // Password length check
        if (password.length < 6) {
            return alert("Password must be at least 6 characters long.");
        }

        // --- SEMANTIC VALIDATION ---
        if (isSignUp) {
            const confirmPassword = form.querySelector('#signup-confirm-password')?.value;
            // Check if passwords match
            if (password !== confirmPassword) {
                return alert("Passwords do not match.");
            }

            // Check if user already exists
            const existingUser = localStorage.getItem('cm_user');
            if (existingUser) {
                const storedData = JSON.parse(existingUser);
                if (storedData.email === email) {
                    return alert("An account with this email already exists.");
                }
            }
        }

        // --- SUCCESS PROCESS ---
        const fullName = isSignUp ? form.querySelector('input[type="text"]').value : email.split('@')[0];
        
        const userData = {
            username: fullName,
            email: email,
            isLoggedIn: true,
            favorites: ["blue-01", "vinyl-01"] 
        };

        localStorage.setItem('cm_user', JSON.stringify(userData));
        alert(isSignUp ? "Account Created!" : "Welcome Back!");
        window.location.href = 'index.html';
    });
});