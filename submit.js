document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const form = document.getElementById('submit-spot-form');

    // Handle File Selection
    dropZone.onclick = () => fileInput.click();

    fileInput.onchange = (e) => {
        const preview = document.getElementById('file-preview');
        preview.innerHTML = `<p>${e.target.files.length} file(s) selected</p>`;
    };

    // Handle Submission
    form.onsubmit = (e) => {
        e.preventDefault();
        
        // Anti-Bot Check
        const answer = document.getElementById('captcha-answer').value;
        if (answer !== "22") {
            alert("Incorrect verification answer. Please try again.");
            return;
        }

        alert("Success! Your spot has been submitted to Community Magnet. Our team will verify it within 24 hours.");
        window.location.href = 'index.html';
    };
});