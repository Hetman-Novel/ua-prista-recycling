document.addEventListener('DOMContentLoaded', function () {

   // Calculate form
   const calculateForm = document.querySelector('.calculate-block__form');
   if (calculateForm) {
      const validateFields = () => {
         let isValid = true;

         // === Валидация селектов ===
         document.querySelectorAll('.select[data-required="true"]').forEach(select => {
            const header = select.querySelector('.select__header');
            const current = select.querySelector('.select__current');
            const placeholder = current.dataset.placeholder?.trim() || '';

            if (current.innerText.trim() === placeholder || current.innerText.trim() === '') {
               header.classList.add('not-selected');
               isValid = false;
            } else {
               header.classList.remove('not-selected');
            }
         });

         // === Валидация полей ===
         const fields = calculateForm.querySelectorAll('input[data-required="true"]');

         fields.forEach(field => {
            const wrap = field.closest('.wrap-field');
            const value = field.value.trim();

            let fieldValid = true;

            if (field.classList.contains('js-pip')) {
               const nameRegex = /^[А-Яа-яA-Za-zЇїІіЄєҐґ]{3,}\s[А-Яа-яA-Za-zЇїІіЄєҐґ]{3,}\s[А-Яа-яA-Za-zЇїІіЄєҐґ]{3,}$/;
               fieldValid = nameRegex.test(value);
            } else if (field.classList.contains('js-email')) {
               const emailRegex = /^[a-zA-Z0-9._%+-]+@/;
               fieldValid = emailRegex.test(value);
            } else if (field.classList.contains('js-phone')) {
               const phoneRegex = /^\+?\d{4,}$/;
               fieldValid = phoneRegex.test(value);
            }

            if (!fieldValid) {
               wrap.classList.add('not-filled');
               isValid = false;
            } else {
               wrap.classList.remove('not-filled');
            }
         });

         return isValid;
      };

      // === Живая валидация при вводе ===
      calculateForm.querySelectorAll('input[data-required="true"]').forEach(field => {
         field.addEventListener('input', () => {
            const wrap = field.closest('.wrap-field');
            const value = field.value.trim();

            let fieldValid = true;

            if (field.classList.contains('js-pip')) {
               const nameRegex = /^[А-Яа-яA-Za-zЇїІіЄєҐґ]{3,}\s[А-Яа-яA-Za-zЇїІіЄєҐґ]{3,}\s[А-Яа-яA-Za-zЇїІіЄєҐґ]{3,}$/;
               fieldValid = nameRegex.test(value);
            } else if (field.classList.contains('js-email')) {
               const emailRegex = /^[a-zA-Z0-9._%+-]+@/;
               fieldValid = emailRegex.test(value);
            } else if (field.classList.contains('js-phone')) {
               const phoneRegex = /^\+?\d{4,}$/;
               fieldValid = phoneRegex.test(value);
            }

            if (fieldValid) {
               wrap.classList.remove('not-filled');
            }
         });
      });

      calculateForm.addEventListener('submit', function (e) {
         e.preventDefault();

         const isValid = validateFields();

         if (isValid) {
            calculateForm.querySelector('[type=submit]').classList.add('success');

            // Показ результата
            const resultBlock = document.querySelector('.result-of-count');
            if (resultBlock) {
               resultBlock.classList.add('show');
               setTimeout(() => {
                  resultBlock.classList.remove('show');
               }, 5000);
            }

            // Сброс селектов
            document.querySelectorAll('.select').forEach(select => {
               const header = select.querySelector('.select__header');
               const current = select.querySelector('.select__current');
               const items = select.querySelectorAll('.select__item');
               const placeholder = current.dataset.placeholder?.trim() || '';

               current.innerText = placeholder;
               select.classList.remove('selected', 'is-active');
               header.classList.remove('not-selected');
               items.forEach(item => item.classList.remove('current-value'));
            });

            // Сброс input'ов
            calculateForm.querySelectorAll('input[data-required="true"]').forEach(field => {
               const wrap = field.closest('.wrap-field');
               field.value = '';
               wrap.classList.remove('not-filled');
            });
         }
      });
   }

   // Section with form
   const form = document.querySelector('.section-with-form__form');
   const successMessage = document.querySelector('.form-success-message');

   if (!form || !successMessage) return;

   const validateField = (input) => {
      const wrapper = input.closest('.validation');
      if (wrapper) {
         const isValid = input.value.trim().length >= 3;
         wrapper.classList.toggle('no-valid', !isValid);
      }
   };

   // Живая валидация
   form.querySelectorAll('.validation input, .validation textarea').forEach(input => {
      input.addEventListener('input', () => validateField(input));
   });

   form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Проверяем все обязательные поля
      form.querySelectorAll('.validation input, .validation textarea').forEach(input => {
         validateField(input);
      });

      // Если есть невалидные поля — убираем сообщение и отменяем отправку
      if (form.querySelector('.validation.no-valid')) {
         successMessage.classList.remove('show');
         return;
      }

      // Если всё валидно — сбрасываем форму и показываем сообщение
      form.reset();
      successMessage.classList.add('show');

      setTimeout(() => {
         successMessage.classList.remove('show');
      }, 5000);
   });
});