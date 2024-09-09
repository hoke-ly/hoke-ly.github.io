window.addEventListener('scroll', function() {
    var infoBox = document.querySelector('.info');
    if (window.scrollY > 0) {
        infoBox.classList.add('scrolled');
    } else {
        infoBox.classList.remove('scrolled');
    }
});

const animatedElements = document.querySelectorAll('.answer-bubble .wrapper .words span');
const replayButton = document.getElementById('replayButtonWords');

replayButton.classList.add('hide');
 // Show the replay button after the animation has finished
 setTimeout(() => {
    replayButton.classList.remove('hide');
}, 6000); // Assuming the animation duration is 6 seconds

replayButton.addEventListener('click', function() {
    // Hide the replay button with a smooth transition
    replayButton.classList.add('hide');

    // Stop the current animation for each animated element
    animatedElements.forEach(element => {
        element.style.animation = 'none';
    });

    // Trigger a reflow to reset the animation for each animated element
    animatedElements.forEach(element => {
        void element.offsetWidth;
    });

    // Restart the animation for each animated element
    animatedElements.forEach(element => {
        element.style.animation = 'spin-words 6s ease-in-out normal';
    });

    // Show the replay button after the animation has finished
    setTimeout(() => {
        replayButton.classList.remove('hide');
    }, 6000); // Assuming the animation duration is 6 seconds
});

// Replace these with your Google Sheet details
const SHEET_ID = '10vWyEKKVEa679J1trW9FEyT-igjvVi1AuUnOluPx_KI';
const SHEET_RANGE = 'Sheet1!A1:B2';

fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`)
    .then(response => response.text())
    .then(data => {
        // Parse the JSON data from the Google Sheet
        const jsonData = JSON.parse(data.substring(47, data.length - 2));
        const rows = jsonData.table.rows;

        // Display the content on the webpage
        const contentDiv = document.getElementById('content');
        rows.forEach(row => {
            const title = row.c[0].v;
            const content = row.c[1].v;
            contentDiv.innerHTML += `<h2>${title}</h2><p>${content}</p>`;
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });