const buttons = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');

const container = document.getElementById('tab-content-container');

const title = document.getElementById('tab-title');
const titleFrame = document.querySelector('.title-frame');


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


function loadTab(tabName, loadInto = '.tab-content-container') {
    const fileToOpen = tabName + '.html';
    console.info('Opening file: ' + fileToOpen);

    const contentContainer = document.querySelector(loadInto);
    contentContainer.classList.remove('show');

    const frame = document.querySelector('.content-frame');

    setTimeout(() => {
        fetch(fileToOpen)
        .then(res => res.text())
        .then(html => {
            frame.style.transition = 'none';
            frame.style.height = `0px`;
            void frame.offsetHeight;
            frame.style.transition = '';

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const oldScript = document.getElementById('dummy-script');
            if (oldScript !== null) {
                console.info('Removing Old Scripts');
                oldScript.remove();
            }
            contentContainer.innerHTML = tempDiv.innerHTML;

            tempDiv.querySelectorAll('script').forEach(script => {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                newScript.id = "dummy-script";
                document.body.appendChild(newScript);
            });

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

function updateTitle(newText) {
    titleFrame.style.transition = 'transform 0.3s ease';
    titleFrame.style.transform = 'translateY(-100%)';

    setTimeout(() => {
        title.textContent = newText;

        // Wait a bit then bring it back down
        void titleFrame.offsetHeight; // force reflow
        titleFrame.style.transition = 'transform 0.3s ease';
        titleFrame.style.transform = 'translateY(0)';
    }, 300);
}


buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    // Update active button
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    updateTitle(btn.textContent.trim());
    loadTab(target);
  });
});

updateTitle('About Me');
loadTab('./tabs/about-me');
