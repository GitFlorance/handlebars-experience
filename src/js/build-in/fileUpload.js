/* ######
Как пользоваться:
Пример:
###### */

export default function fileUpload() {
    const elements = Array.from(document.querySelectorAll('.js-file-upload'));

    elements.forEach((element) => {
        const input = element.querySelector('input[type="file"]');
        const label = element.querySelector('.js-file-upload-text');

        input.addEventListener('change', () => {
            if (input.files.length) {
                label.textContent = input.files[0].name;
            }
        });
    });
}