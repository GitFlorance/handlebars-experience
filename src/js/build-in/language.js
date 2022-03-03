export  default function select() {
    let selectHeader = document.querySelectorAll('.language__header');
    let selectItem = document.querySelectorAll('.language__item');

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    })

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    })

    function selectToggle() {
        this.parentElement.classList.toggle('language--active');
    }

    function selectChoose() {
        let text = this.innerText;
        let language = this.closest('.language');
        let currentText = language.querySelector('.language__current');

        currentText.innerText = text;
        language.classList.remove('language--active')
    }
}