// К тегу нужно добавить класс animation чтобы при прокрудке к нему добавлялся классу animation-active
// Соединяем класс animation-active с тегом в css и приминяем любую трансформацию которух хотим.
// Если анимацию не нужно выполнять повторно нужно к классу animation добавить animation-not-repeat

const animItems = document.querySelectorAll('.animation');

if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
   function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
         const animItem = animItems[index];
         const animItemHeight = animItem.offsetHeight;
         const animItemOffset = offset(animItem).top;
         const animStart = 4;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add('animation-active');
         } else {
            if (!animItem.classList.contains('animation-not-repeat')) {
               animItem.classList.remove('animation-active');
            }
         }
      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollTop }
   }

   //animOnScroll();

   setTimeout(() => {
      animOnScroll();
   }, 300);
}