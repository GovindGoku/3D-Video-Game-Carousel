//Get elements from DOM
const container = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const arrLeft = document.querySelector('.arrow-left');
const arrRight = document.querySelector('.arrow-right');

//Offset values for the slides container
let offset = 0;
//Slide ID on increment 
let slideIncrement = 0;
//Slide ID decrement
let slideDecrement = slides.length - 1;

//Add click event to right arrow
arrRight.addEventListener('click', () => {
    //Disable right arrow button
    arrRight.disabled = true;
    //Set offset to slide width
    offset = slides[0].offsetWidth;
    //Set container transition
    container.style.transition = "ease-in-out 500ms";
    //Move slides container by negative offset
    container.style.left = -offset + 'px' ;
    //Set a timeout
    setTimeout(() => {

        container.style.transition = 'none';

        slides[slideIncrement].style.order = slides.length - 1;

        container.style.left = 0;

        slideIncrement++;

        slideDecrement = slideIncrement - 1;

        if(slideIncrement === slides.length) {

            slideIncrement = 0;

            slides.forEach(slide => {

                slide.style.order = "initial";
            });
        }
        //Enable Right arrow click
        arrRight.disabled = false;
    }, 500);
});

//Add click event to Left arrow
arrLeft.addEventListener('click', () => {

    arrLeft.disabled = true;

    offset = slides[0].offsetWidth;

    container.style.transition = "none";

    if(slideDecrement < 0) {

        slides.forEach(slide => {

            slide.style.order = "initial";
        });

        slideDecrement = slides.length - 1;
    }

    slides[slideDecrement].style.order = "-1";

    container.style.left = -offset + 'px';

    setTimeout(() => {

        container.style.transition = "ease-in-out 500ms";

        container.style.left = 0;
    }, 10);

    slideDecrement--;

    slideIncrement = slideDecrement + 1;

    arrLeft.disabled = false;
});




slides.forEach(slide => {

    const product = slide.querySelector(".product");

    product.style.transform = "rotateY(-35deg)";

    let prev = 0;

    let calc = 0;

    let x;

    const sensitivity = 3;

    function rotate(e) {

        if(e.type === "touchmove") {
           
            calc = (e.touches[0].clientX - x) / sensitivity;
        } else {
            calc = (e.clientX - x) / sensitivity;
        }

        product.style.transform = `
        rotateY(${calc + prev}deg)`;

        document.body.style.cursor = "grabbing";
    }

    slide.addEventListener("mousedown", e => {

        x = e.clientX;

        slide.addEventListener("mousemove", rotate);

        prev += calc;
    });

    slide.addEventListener("touchstart", e => {

        x = e.touches[0].clientX;

        slide.addEventListener("touchmove", rotate);

        prev += calc;
    });

    /* Remove the event and cursor icon on 
    mouse and touch release */
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);

    function handleDragEnd() {
        slide.removeEventListener("mousemove", rotate);
        slide.removeEventListener("touchmove", rotate);

        document.body.style.cursor = "default";
    }

});
















