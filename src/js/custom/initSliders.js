import {Swiper, Navigation, EffectFade, Autoplay, Pagination, HashNavigation} from "swiper";

Swiper.use([Navigation, EffectFade, Autoplay, Pagination, HashNavigation]);

export default function initSliders() {
    const sliders = Array.from(document.querySelectorAll('.js-init-slider'));

    sliders.forEach((slider, i) => {
        const fadeEffect = slider.dataset.fade ? {effect: 'fade', fadeEffect: {crossFade: true}} : {};
        const autoplay = slider.dataset.delay ? {autoplay:{delay: Number(slider.dataset.delay), disableOnInteraction: true}} : {};
        const slidesPerView = slider.dataset.slides ? Number(slider.dataset.slides) || 'auto' : 1;
        const spaceBetween = slider.dataset.space ? Number(slider.dataset.space) : 0;
        const loop = !!slider.dataset.loop;
        const hashNavigation = !!slider.dataset.hash;
        const allowTouchMove = !slider.dataset.noTouch;


        let navigation = slider.querySelector('.js-slider-navigation');
        if (navigation) {
            navigation = {navigation: {
                    nextEl: navigation.querySelector('.js-next-slide'),
                    prevEl: navigation.querySelector('.js-prev-slide'),
                }}
        }

        let breakpoints = slider.dataset.breakpoints;
        if (breakpoints) {
            const widths = breakpoints.match(/[0-9]{3,4}:/g).map(i => i.slice(0, -1));
            const perviewCounts = breakpoints.match(/:[0-9]{1}/g).map(i => i.slice(1));

            breakpoints =
                {
                    breakpoints: {

                    }
                }

            for(let i = 0; i < widths.length; i++) {
                const width = Number(widths[i])
                const perviewCount = Number(perviewCounts[i])

                breakpoints.breakpoints[width] = {
                    slidesPerView: perviewCount,
                };
            }
        }

        const swiper = new Swiper(slider, {
            slidesPerView,
            spaceBetween,
            ...navigation,
            hashNavigation,
            allowTouchMove,
            disableOnInteraction: true,
            ...autoplay,
            loop,
            ...fadeEffect,
            pagination: {
                el: slider.querySelector('.swiper-pagination'),
                clickable: true,
                bulletElement: 'button',
                bulletClass: 'promotion__slider-bullets',
                bulletActiveClass: 'promotion__slider-bullets--active',
            },
            ...breakpoints,
        })
    })

    /* BulletClass и BulletActiveClass исправлю */

}