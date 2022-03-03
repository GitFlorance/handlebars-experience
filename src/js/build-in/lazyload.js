/* ######
Как пользоваться:
Пример:
###### */

import 'lazysizes';
import '../libs/lazysizes.unveilhooks';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';

if (!('object-fit' in document.createElement('a').style)) {
    require('lazysizes/plugins/object-fit/ls.object-fit');
}