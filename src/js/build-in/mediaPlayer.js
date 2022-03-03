/* ######
Как пользоваться:
Пример:
###### */

import Plyr from 'plyr';

export default function mediaPlayer() {
    const elements = Array.from(document.querySelectorAll('.js-media-player'));

    elements.forEach(element => {
        const instance = new Plyr(element);

        const insideModal = element.closest('.js-modal');

        if (insideModal) {
            document.addEventListener('openmodal', () => {
                if (insideModal.classList.contains('active')) {
                    instance.play();
                } else {
                    console.log('Not inside modal', insideModal);
                }
            });
            document.addEventListener('closemodal', () => {
                instance.pause();
            });
        }
    });
}