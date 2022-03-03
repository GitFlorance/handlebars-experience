/**
 * Оборачивает пользовательские таблицы и айфреймы в адаптивные контейнеры
 */
 function editableTextContainer() {
    const containers = Array.from(document.querySelectorAll('.editable-text-container'));
    if (containers) {
      containers.forEach(container => {
        const tables = Array.from(container.getElementsByTagName('table'));
        const iframes = Array.from(container.getElementsByTagName('iframe'));
  
        createWrapper(tables, 'js-table-wrapper');
        createWrapper(iframes, 'js-iframe-wrapper');
      })
    }
  }
  
  /**
   * 
   * @param {Array} elements - элементы, которые нужно обернуть
   * @param {String} wrapperClass - CSS-класс обёртки
   * @param {Function} callback - коллбек
   */
  function createWrapper(elements, wrapperClass) {
    elements.forEach(element => {
      const wrapper = document.createElement('div');
      wrapper.classList.add(wrapperClass);
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);
    })
  }
  
  export default editableTextContainer;