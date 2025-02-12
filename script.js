function slideAway() {
    document.querySelector('.left').classList.add('slide-left');
    document.querySelector('.right').classList.add('slide-right');
    document.querySelector('.back-button').classList.add('show');
}

function slideBack() {
    document.querySelector('.left').classList.remove('slide-left');
    document.querySelector('.right').classList.remove('slide-right');
    document.querySelector('.back-button').classList.remove('show');
}

function transitionToPage(url) {
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

function slideInPage(page) {
    slideAway();
    transitionToPage(page);
}
function slideOutOfPage() {
    document.querySelector('.project-body').classList.add('fade-out');
    transitionToPage('index.html');
    document.querySelector('.back-button').classList.remove('show');
}
