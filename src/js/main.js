import './build-in/lazyload';
import detectTouch from './build-in/detectTouch';
import setScrollbarWidth from './build-in/setScrollbarWidth';
import anchorLinks from './build-in/anchorLinks';
import select from  './build-in/language';
import unhideTags from  './build-in/tags';
import initSliders from "./custom/initSliders";
import alignHeights from "./custom/alignHeights";
import accordions from "./build-in/accordions";
import navigationTabs from "./build-in/navigationTabs";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import editableTextContainer from './custom/editableTextContainer';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
    detectTouch();
    setScrollbarWidth();
    anchorLinks();
    select();
    unhideTags();
    

    // custom
    navigationTabs()
    accordions();
    initSliders();
    alignHeights('.news__list', '.news__item-img', 'li:first-child .news__item-content');
    editableTextContainer();
});

document.addEventListener('lazyloaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('l=oad', function () {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
    setTimeout(() => document.body.classList.add('animatable'), 300);
});