{
    const sliders = document.querySelectorAll(".slider");
    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector(".btn-next");


    for (let i = 0; i < sliders.length; ++i) {
        const slider = sliders[i];
        const dots = slider.querySelector(".dots");
        const sliderImgs = slider.querySelectorAll(".img");

        let currImg = 0;
        let prevImg = sliderImgs.length - 1;

        // Creates dots and add listeners to them
        for (let i = 0; i < sliderImgs.length; ++i) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dots.appendChild(dot);
            dot.addEventListener("click", dotClick.bind(null, i), false);
        }

        const allDots = dots.querySelectorAll(".dot");
        allDots[0].classList.add("active-dot");

        sliderImgs[0].style.left = "0";

        /**
         * Animates images
         * @param {number} [nextImg] - index of next image to show
         * @param {boolean} [right = false] - animate to right
         */

        function animateSlider(nextImg, right) {
            if(!nextImg && right){
                nextImg = currImg === 0 
                ? sliderImgs.length
                : currImg ;
            }
            if (!nextImg && !right)
                nextImg = currImg + 1 < sliderImgs.length 
                ? currImg + 2 
                : 1;
            --nextImg;
            sliderImgs[prevImg].style.animationName = "";

            if (!right) {
                sliderImgs[nextImg].style.animationName = "leftNext";
                sliderImgs[currImg].style.animationName = "leftCurr";
            }
            else {
                sliderImgs[nextImg].style.animationName = "rightNext";
                sliderImgs[currImg].style.animationName = "rightCurr";
            }

            prevImg = currImg;
            currImg = nextImg;
            currDot = allDots[currImg];
            currDot.classList.add("active-dot");
            prevDot = allDots[prevImg];
            prevDot.classList.remove("active-dot");
        }

       

        /**
         * Decides if animate to left or right and highlights clicked dot
         * @param {number} num - index of clicked dot
         */
        function dotClick(num) {
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
    }

}


