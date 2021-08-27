window.onload = () => {

    const mainMenuSizes = {
        prods: { height:  0, width: 0},
        cases: { height:  0, width: 0},
        devs: { height:  0, width: 0},
        company: { height:  0, width: 0}
    }

    const menuOptions = document.querySelectorAll('[data-menu-opt]');
    const menuSections = document.querySelectorAll('[data-section]');
    const menuContainer = document.querySelector('.desktop-menu');
    const headerContainer = document.querySelector('.header');

    menuContainer.classList.add('desktop-menu--rotate');

    for (section of menuSections) {
        const sectionName = section.dataset.section;
        mainMenuSizes[sectionName] = {
            height: Math.ceil(section.getBoundingClientRect().height),
            width: Math.ceil(section.getBoundingClientRect().width)
        }
    }

    for (element of menuOptions) {
        element.addEventListener('mouseenter', (e) => {
            const targetSection = e.target.dataset.menuOpt;
            const targetElement = document.querySelector(`.section-${targetSection}`);
            for (section of menuSections) {
                section.classList.remove('desktop-menu__section--visible');
            }
            menuContainer.setAttribute(
                'style',
                `height: ${mainMenuSizes[targetSection].height}px; width: ${mainMenuSizes[targetSection].width}px;`
            );
            menuContainer.classList.add('desktop-menu--visible');
            targetElement.classList.add('desktop-menu__section--visible');
            menuContainer.addEventListener('transitionend', addResizeAnim);
        });
    }

    const addResizeAnim = (e) => {
        if (!menuContainer.classList.contains('desktop-menu--anim-resize')) {
            menuContainer.classList.add('desktop-menu--anim-resize');
            for (section of menuSections) {
                section.setAttribute('style', 'transition-duration: 0.25s');
            }
        }
        menuContainer.removeEventListener('transitionend', addResizeAnim);
    };

    headerContainer.addEventListener('mouseleave', () => {
        menuContainer.classList.remove('desktop-menu--visible');
        menuContainer.classList.remove('desktop-menu--anim-resize');
        for (section of menuSections) {
            section.removeAttribute('style');
        }
    });

    console.log('New values for mainmenusizes:', mainMenuSizes);

    // menuContainer.setAttribute('style', `height: ${mainMenuSizes.prods.height}px; width: ${mainMenuSizes.prods.width}px;`);

};