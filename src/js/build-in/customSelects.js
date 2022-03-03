/* ######
Как пользоваться:
Добавить CSS-класс .js-custom-select select'у.
Пример:
<select class="js-custom-select">
  <option>Пункт 1</option>
  <option>Пункт 2</option>
</select>
###### */

import Choices from 'choices.js';

export default function customSelects() {
    const customSelects = Array.from(document.querySelectorAll('.js-custom-select'));

    customSelects.forEach((select) => {
        new Choices(select, {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
        });
    });
}