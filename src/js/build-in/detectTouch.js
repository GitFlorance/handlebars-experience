/* ######
Как пользоваться:
Пример:
###### */

import { primaryInput } from 'detect-it';

export default function() {
    
    // Определение тач устройств

    if (primaryInput === 'touch') {
        document.body.classList.remove('no-touch');
        document.body.classList.add('touch');

        function appendStyle(styles) {
            var css = document.createElement('style');
            css.type = 'text/css';

            if (css.styleSheet) css.styleSheet.cssText = styles;
            else css.appendChild(document.createTextNode(styles));

            document.getElementsByTagName('head')[0].appendChild(css);
        }

        var styles = '* {cursor: pointer; }';

        window.onload = function() {
            appendStyle(styles);
        };
    }
}