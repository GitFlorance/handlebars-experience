function alignHeights(parentSelector, imgSelector, contentSelector) {
    const container = document.querySelector(parentSelector);
    if (!container) return;
  
    const imgElements = container.querySelectorAll(`li:not(:first-child) ${imgSelector}`);
    const contentElement = container.querySelector(contentSelector);
    let contentElementHeight = contentElement.clientHeight;
  
    if (imgElements.length === 0) return;
  
    const setMaxHeight = () => {
      let height = 0;
  
      //Определяем максимальную высоту блока
      for(let i = 0; i < imgElements.length; i++ ){
        // Обнуляем height, иначе при ресайзе будет баг
        imgElements[i].style.height = 'auto';
  
        let currentHeight = imgElements[i].clientHeight;
        if(currentHeight > height) {
          height = currentHeight;
        }
      }
  
      height < contentElementHeight ? height = contentElementHeight : contentElementHeight = height + 'px';
      contentElement.style.height = contentElementHeight;
  
      //Задаем максимальную высоту блока всем элементам
      for( let i = 0; i < imgElements.length; i++ ){
        imgElements[i].style.height = height + 'px';
      }
    }
  
    setMaxHeight();
  
    window.addEventListener('resize', setMaxHeight);
  }
  
  export default alignHeights;