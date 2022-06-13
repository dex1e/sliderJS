const slider = document.querySelector(".slider");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const dots = slider.querySelector(".dots");
const images = slider.querySelectorAll(".img");
let currImg = 0;
let prevImg = images.length - 1;

for (let i = 0; i < images.length; ++i) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dots.appendChild(dot);
    dot.addEventListener("click", onDotClick.bind(null, i), false);
}

const allDots = dots.querySelectorAll(".dot");
allDots[0].classList.add("active-dot");
images[0].style.left = "0";

function animateSlider(nextImg, right) {
    if (!nextImg && right) {
        nextImg = currImg === 0
            ? images.length
            : currImg;
    }
    if (!nextImg && !right) {
        nextImg = currImg + 1 < images.length
            ? currImg + 2
            : 1;
    }
    --nextImg;
    images[prevImg].style.animationName = "";

    if (!right) {
        images[nextImg].style.animationName = "leftNext";
        images[currImg].style.animationName = "leftCurr";
    }
    else {
        images[nextImg].style.animationName = "rightNext";
        images[currImg].style.animationName = "rightCurr";
    }

    prevImg = currImg;
    currImg = nextImg;
    currDot = allDots[currImg];
    currDot.classList.add("active-dot");
    prevDot = allDots[prevImg];
    prevDot.classList.remove("active-dot");
}

function onDotClick(num) {
    if (num == currImg)
        return false;
    if (num > currImg)
        animateSlider(num + 1);
    else
        animateSlider(num + 1, true);
}

const onPrevHandler = () => {
    animateSlider(null, true);
};

const onNextHandler = () => {
    animateSlider(null, false);
}

btnPrev.addEventListener("click", onPrevHandler);
btnNext.addEventListener("click", onNextHandler);

