/* ######
Как пользоваться:
.js-accordion - CSS-класс контейнера для элемента аккордиона
.js-accordion-btn - CSS-класс кнопки открытия контента аккордиона
.js-accordion-content - CSS-класс для скрытого контента
data-close-other - data-атрибут, который прописывается для элемента аккордиона
active - CSS-класс, который навешивается на открытый элемент аккордиона
Пример:
<div class="js-accordion" data-close-other>
    <button class="js-accordion-btn">Открыть</button>
    <div class="js-accordion-content">
        Скрытый текст
    </div>
</div>
###### */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { divide } from 'lodash';

gsap.registerPlugin(ScrollTrigger);

export default function accordions() {
    const SPEED = 0.3;

    const openAccordion = (element) => {
        gsap.to(element, {
            height: 'auto',
            duration: SPEED,
            onComplete: () => ScrollTrigger.refresh(),
        });
    };
    const closeAccordion = (element) => {
        gsap.to(element, {
            height: 0,
            duration: SPEED,
            onComplete: () => ScrollTrigger.refresh(),
        });
    };

    document.addEventListener('click', (event) => {
        if (event.target.matches('.js-accordion-btn') || event.target.closest('.js-accordion-btn')) {
            const btn = event.target.matches('.js-accordion-btn') ? event.target : event.target.closest('.js-accordion-btn');
            const element = btn.closest('.js-accordion');
            const content = element.querySelector('.js-accordion-content');
            const elements = Array.from(document.querySelectorAll('.js-accordion'));

            event.preventDefault();

            if (element.classList.contains('js-accordion-tablet') && window.screen.width > 780) return

            if (element.hasAttribute('data-close-other')) {
                elements.forEach((otherElement) => {
                    if (otherElement !== element) {
                        if (otherElement.classList.contains('active')) {
                            const content = otherElement.querySelector('.js-accordion-content');
                            closeAccordion(content);
                            otherElement.classList.remove('active');
                        }
                    }
                });
            }

            if (element.classList.contains('active')) {
                closeAccordion(content);
            } else {
                openAccordion(content);
            }
            element.classList.toggle('active');
        }
    });
}