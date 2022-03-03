export default function navigationTabs() {
    const menuItems = document.querySelectorAll('.header__menu-item');
    const navigation = document.querySelector('.navigation');
    const navigationItems = document.querySelectorAll('.navigation > li');
    const scroll = document.querySelector('.header__menu-scroll');

    const fadeEffect = function (item, opacity, visibility, navItems = null) {
        if (navItems !== null) {
            navItems.forEach(navItem => {
                if (navItem !== item) {
                    navItem.style.opacity = 0;
                    navItem.style.visibility = "hidden";
                }
            })
        }

        item.style.opacity = opacity;
        item.style.visibility = visibility;
        navigation.style.background = 'rgba(32, 34, 38, .7)';
    }

    const menuScrolling = function (item) {
        const width = item.clientWidth;
        const link = item.querySelector('a');
        const paddingRight = window.getComputedStyle(link, null).getPropertyValue("padding-right").slice(0, -2);
        const scrollWidth = width - paddingRight + 'px';

        let leftScroll = 0;

        Array.from(menuItems).reduce((sum, menuItem) => {
            if (item === menuItem) {
                leftScroll = sum + 'px';
            } else {
                return sum + menuItem.clientWidth;
            }
        }, 0);

        scroll.style.width = scrollWidth;
        scroll.style.left =  leftScroll;
    }

    menuItems.forEach((menuItem, index) => {
        const navigationItem = navigationItems[index];

        menuItem.addEventListener('mouseover',  () => {
            fadeEffect(navigationItem, 1, 'visible', navigationItems);
            menuScrolling(menuItem);

            menuItems.forEach(item => {
                if (item !== menuItem) {
                    item.style.color = '#DBDEE5';
                } else {
                    item.style.color = '#202226'
                }
            })
        })

        navigationItem.addEventListener('mouseleave',  () => {
            fadeEffect(navigationItem, 0, 'hidden');
            navigation.style.background = 'transparent';

            menuItems.forEach(item => {
                item.style.color = '#202226'
            })
        })
    })
}