import "core-js/stable";
import "regenerator-runtime/runtime";
import smoothscroll from 'smoothscroll-polyfill';
import 'custom-event-polyfill';
import 'classlist-polyfill';

smoothscroll.polyfill();

export default function() {
    // Полифилл .contains для IE 11

    if (!SVGElement.prototype.contains) {
        SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
    }

    // Полифилл для метода element.matches();

    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
    }

    // Полифилл метода element.closest();

    (function(ELEMENT) {
        ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
        ELEMENT.closest =
            ELEMENT.closest ||
            function closest(selector) {
                if (!this) return null;
                if (this.matches(selector)) return this;
                if (!this.parentElement) {
                    return null;
                } else return this.parentElement.closest(selector);
            };
    })(Element.prototype);

    // Полифилл для кастомных событий

    if (typeof window.CustomEvent === 'function') return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    window.CustomEvent = CustomEvent;

    // Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
    (function(arr) {
        arr.forEach(function(item) {
            if (item.hasOwnProperty('append')) {
                return;
            }
            Object.defineProperty(item, 'append', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function append() {
                    var argArr = Array.prototype.slice.call(arguments),
                        docFrag = document.createDocumentFragment();

                    argArr.forEach(function(argItem) {
                        var isNode = argItem instanceof Node;
                        docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                    });

                    this.appendChild(docFrag);
                }
            });
        });
    })([Element.prototype, Document.prototype, DocumentFragment.prototype]);
}