const buttons = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

const container = document.getElementById('tab-content-container');


function getYear() {
    return new Date().getFullYear();
}
function calculateExperience(startYear, endYear = getYear()) {
    return endYear - startYear;
}

function setExperience() {
    document.getElementById("lua-experience").textContent = calculateExperience(2016, 2018);
    document.getElementById("cpp-experience").textContent = calculateExperience(2017);
    document.getElementById("godot-experience").textContent = calculateExperience(2019);
    document.getElementById("unreal-experience").textContent = calculateExperience(2022);
};


function loadTab(tabName) {
    const fileToOpen = './tabs/' + tabName + '.html';
    console.info('Opening file: ' + fileToOpen);

    const contentContainer = document.querySelector('.tab-content-container');
    contentContainer.classList.remove('show');

    const frame = document.querySelector('.content-frame');

    setTimeout(() => {
        fetch(fileToOpen)
        .then(res => res.text())
        .then(html => {
            contentContainer.innerHTML = html;

            frame.style.transition = 'none';
            frame.style.height = `0px`;
            void frame.offsetHeight;
            frame.style.transition = '';
            contentContainer.classList.add('show');

            if (tabName === 'about-me') {
                setExperience();
            }

            setTimeout(() => {
                frame.style.height = `${frame.scrollHeight}px`;
            }, 100);
        })
        .catch(err => {
            contentContainer.innerHTML = `<p style="color:red;">Failed to load ${tabName}</p>`;
            contentContainer.classList.add('show');
            console.error(err);
        });
    }, 150);
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    // Update active button
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    loadTab(target);
  });
});

loadTab('about-me');
