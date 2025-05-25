function splitTextWithPreservedSpans(element) {
   const chars = [];

   // Сохраняем оригинальные дочерние узлы
   const originalChildren = Array.from(element.childNodes);

   // Очищаем только СОДЕРЖИМОЕ, но не сам элемент
   element.textContent = '';
   element.style.position = 'relative';

   function processNode(node, container) {
      if (node.nodeType === Node.TEXT_NODE) {
         const words = node.textContent.split(/\s+/);

         words.forEach((word, index) => {
         const wordContainer = document.createElement('div');
         wordContainer.classList.add('word');
         wordContainer.style.display = 'inline-block';
         wordContainer.style.position = 'relative';
         wordContainer.style.whiteSpace = 'nowrap';

         word.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.opacity = 0;
            span.style.transform = 'translateY(80px)';
            wordContainer.appendChild(span);
            chars.push(span);
         });

         container.appendChild(wordContainer);

         if (index < words.length - 1) {
            container.appendChild(document.createTextNode(' '));
         }
         });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
         // Клонируем обертку, например <span class="lg-color">
         const newElem = document.createElement(node.tagName);
         for (const attr of node.attributes) {
         newElem.setAttribute(attr.name, attr.value);
         }
         container.appendChild(newElem);

         node.childNodes.forEach(child => processNode(child, newElem));
      }
   }

   // Обрабатываем скопированные дочерние элементы
   originalChildren.forEach(child => processNode(child, element));

   return chars;
}
function splitTextWithWordGrouping(element) {
   const text = element.textContent.trim();
   element.textContent = ''; // очищаем

   const words = text.split(/\s+/);
   const chars = [];

   words.forEach((word, wordIndex) => {
      const wordContainer = document.createElement('div');
      wordContainer.classList.add('word');

      word.split('').forEach(char => {
         const span = document.createElement('span');
         span.textContent = char;
         wordContainer.appendChild(span);
         chars.push(span);
      });

      element.appendChild(wordContainer);

      // Добавим пробел после слова, кроме последнего
      if (wordIndex < words.length - 1) {
         element.appendChild(document.createTextNode(' '));
      }
   });

  return chars;
}
function isInViewport(elem, offsetFactor = 0.25) {
   const rect = elem.getBoundingClientRect();
   const triggerPoint = window.innerHeight * offsetFactor;
   return (
      rect.top < window.innerHeight - triggerPoint &&
      rect.bottom > 0
   );
}
function setupSplitAnimation(selector) {
   const elements = document.querySelectorAll(selector);

   elements.forEach(element => {
      const chars = splitTextWithPreservedSpans(element);
      element._chars = chars;
      element._animated = false; // каждый элемент отслеживается отдельно
   });

   function checkAnimations() {
      elements.forEach(element => {
         if (element._animated) return;
         if (isInViewport(element, 0.25)) { // здесь 0.25 — означает 1/4 от низа окна
            element._animated = true;

            gsap.to(element._chars, {
               duration: 0.4,
               ease: "circ.out",
               y: 0,
               opacity: 1,
               stagger: 0.04
            });
         }
      });
   }

   // запуск при загрузке и при скролле
   checkAnimations();
   window.addEventListener('scroll', checkAnimations);
}
setupSplitAnimation('.quote');