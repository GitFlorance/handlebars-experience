/* ######
Как пользоваться:
Пример:
###### */

export default function setScrollbarWidth() {
    const setWidth = () => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.documentElement.style.setProperty('--sb-width', scrollbarWidth + "px");
    }

    setWidth();

    window.addEventListener('resize', setWidth);
}