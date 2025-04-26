document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease-in-out';
        });

        button.addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.2s ease-in-out';
        });
    });
});
function signUp() {
    document.body.classList.add('page-transition');
    setTimeout(function () {
        window.location.href = 'signup.html';
    }, 500);
    }
    
function logIn() {
    document.body.classList.add('page-transition');
    setTimeout(function () {
    window.location.href = 'login.html';
    }, 500);
}