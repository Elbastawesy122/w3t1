document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        localStorage.setItem('user', email);
        window.location.href = 'home.html';
    }
});

window.onload = function() {
    if (localStorage.getItem('user')) {
        window.location.href = 'home.html';
    }
};
