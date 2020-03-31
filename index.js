// global variables
let root = document.documentElement,
    isFinished = true; // prevent user to get new quote before finished
const divQuoteBox = root.querySelector('.qbox'),
      buttonNewQuote = divQuoteBox.querySelector('.toggle'),
      textQuote = divQuoteBox.querySelector('.quote'),
      completeQuote = textQuote.parentNode,
      textAuthor = divQuoteBox.querySelector('.author'),
      // colors pool
      colors = ["#bebb9a", "#472e32", "#fa6964", "#78b1aa", "#9a59b5", "#73a856", "#2d3e50", "#f39c11"];

// business function
function fadeOut() {
    if (!isFinished) {
        return;
    }
    isFinished = false;

    let themeColor = getNewColor();
    root.style.setProperty('--color', themeColor);
    completeQuote.classList.add('fade-out');
    textAuthor.classList.add('fade-out');
    fadeIn(themeColor);
}

function getNewColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

async function fadeIn(themeColor) {
    try {
        let result = await fetch("https://v1.hitokoto.cn/");
        let data = await result.json();
        setTimeout(() => {
            textQuote.textContent = data.hitokoto;
            textAuthor.textContent = '- ' + data.from;

            completeQuote.classList.remove('fade-out');
            textAuthor.classList.remove('fade-out');
            completeQuote.style.color = themeColor;
            textAuthor.style.color = themeColor;

            isFinished = true;
        }, 1000);
    } catch(err) {
        alert('API出了问题');
        isFinished = true;
    }
}

// element listener
buttonNewQuote.addEventListener('click', fadeOut);

window.onload = fadeOut;
