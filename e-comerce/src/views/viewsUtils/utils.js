document.addEventListener('DOMContentLoaded', function() {
    if (window.isAuthenticated) {
        document.getElementById('login-nav-item').style.display = 'none';
        document.getElementById('register-nav-item').style.display = 'none';
    }
});

document.getElementById('search-form').addEventListener('submit', function(event) {
    const search = document.getElementById('search').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const errorMessage = document.getElementById('error-message');

    if (!search && !minPrice && !maxPrice) {
        event.preventDefault();
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
    }
});