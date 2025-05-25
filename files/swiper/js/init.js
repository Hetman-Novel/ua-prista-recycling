const lazyImages = document.querySelectorAll('img[loading="lazy"]'); // Get all images with the loading="lazy" attribute
function addLoadedClass(image) { // Function to add class to image parent after it is loaded
   const parentElement = image.parentElement;
   if (image.complete) { // Check if the image is loaded
      parentElement.classList.add('loaded');
   } else {
      image.addEventListener('load', function() { // Add a load event to add the class after the image has loaded
         parentElement.classList.add('loaded');
      });
   }
}
lazyImages.forEach(addLoadedClass); // Loop through all the images and call the addLoadedClass function for each one

/* === */

/* Within the law slider -> */
let withinTheLawSlider = document.getElementById('within-the-law-slider');
if (withinTheLawSlider) {
   new Swiper(withinTheLawSlider, {
      navigation: {
         prevEl: '#within-the-law-slider-button-prev',
         nextEl: '#within-the-law-slider-button-next',
      },
      autoHeight: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchOverflow: true,
      spaceBetween: 10,
      loop: false,
      /*autoplay: {
         delay: 6000,
         stopOnLastSlide: false,
         disableOnInteraction: false,
      },*/
      speed: 600,
      effect: 'fade',
      fadeEffect: {
         crossFade: true
      },
   });
}
/* <- Within the law slider */



/* Real cases slider -> */
let realCasesSlider = document.getElementById('real-cases-slider');
if (realCasesSlider) {
   new Swiper(realCasesSlider, {
      navigation: {
         prevEl: '#real-cases-slider-button-prev',
         nextEl: '#real-cases-slider-button-next',
      },
      autoHeight: false,
      slidesPerView: 4,
      slidesPerGroup: 1,
      watchOverflow: true,
      spaceBetween: 10,
      loop: false,
      /*autoplay: {
         delay: 6000,
         stopOnLastSlide: false,
         disableOnInteraction: false,
      },*/
      speed: 600,
      effect: 'slide',
      preloadImages: false,
      lazy: {
         loadOnTransitionStart: false,
         loadPrewNext: false,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      breakpoints: {
         0: {
            slidesPerView: 2.1,
         },
         461: {
            slidesPerView: 3.1,
         },
         721: {
            slidesPerView: 4,
         }
      },
   });
}
/* <- Real cases slider */