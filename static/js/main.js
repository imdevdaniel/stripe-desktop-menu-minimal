window.onload = () => {

    const menuDimensions = {
        prods: { height:  0, width: 0, },
        cases: { height:  0, width: 0, },
        devs: { height:  0, width: 0, },
        company: { height:  0, width: 0, }
    }

    const menuOptions = document.querySelectorAll('[data-menu-opt]');
    const menuSections = document.querySelectorAll('[data-section]');
    const menuContainer = document.querySelector('.desktop-menu');
    const menuPointer = document.querySelector('.menu-pointer');
    const headerContainer = document.querySelector('.header');
    const optionsBar = document.querySelector('.desktop-nav__options');

    menuContainer.classList.add('desktop-menu--rotate');

    for (section of menuSections) {
        const sectionName = section.dataset.section;
        menuDimensions[sectionName] = {
            height: Math.ceil(section.getBoundingClientRect().height),
            width: Math.ceil(section.getBoundingClientRect().width)
        }
    }

    for (element of menuOptions) {

        const targetSection = element.dataset.menuOpt;
        const containerLeftEdge = optionsBar.getBoundingClientRect().x;
        const sourceElRect = element.getBoundingClientRect();
        const sourceCenter = Math.round(sourceElRect.x + (sourceElRect.width / 2));

        element.addEventListener('mouseenter', (e) => {

            const targetElement = document.querySelector(`.section-${targetSection}`);

            for (section of menuSections) {
                section.classList.remove('desktop-menu__section--visible');
            }

            menuContainer.setAttribute(
                'style',
                `height: ${menuDimensions[targetSection].height}px; width: ${menuDimensions[targetSection].width}px;`
            );

            if (menuPointer.classList.contains('menu-pointer--visible')) {
                menuPointer.setAttribute(
                    'style',
                    `transform: translateY(-6px) translateX(${Math.floor(sourceCenter - containerLeftEdge - 8)}px) rotate(45deg)`
                );
            } else {
                menuPointer.setAttribute(
                    'style',
                    `transform: translateX(${Math.floor(sourceCenter - containerLeftEdge - 8)}px) rotate(45deg)`
                );
            }

            menuContainer.classList.add('desktop-menu--visible');
            targetElement.classList.add('desktop-menu__section--visible');
            menuContainer.addEventListener('transitionend', addResizeAnim);
            menuContainer.addEventListener('transitionend', positionArrow);
        });
    }

    const clearAfterLeaving = () => {
        menuContainer.classList.remove('desktop-menu--anim-resize');
        menuPointer.classList.remove('menu-pointer--anim-transform');
        menuPointer.classList.remove('menu-pointer--visible');
        menuPointer.removeAttribute('style');
        for (section of menuSections) {
            section.removeAttribute('style');
        }
        menuContainer.removeEventListener('transitionstart', clearAfterLeaving);
    };

    const positionArrow = () => {
        if (!menuPointer.classList.contains('menu-pointer--visible')) {
            const styles = menuPointer.getAttribute('style');
            if (styles && menuContainer.classList.contains('desktop-menu--visible')) {
                const newStyles = styles.replace('transform: ', '');
                menuPointer.setAttribute('style', `transform: translateY(-6px) ${newStyles}`);
                menuPointer.classList.add('menu-pointer--visible');
                menuPointer.classList.add('menu-pointer--anim-transform');
            }
        }
        menuContainer.removeEventListener('transitionend', positionArrow);
    };

    const addResizeAnim = () => {
        if (!menuContainer.classList.contains('desktop-menu--anim-resize')) {
            menuContainer.classList.add('desktop-menu--anim-resize');
            for (section of menuSections) {
                section.setAttribute('style', 'transition-duration: 0.25s');
            }
        }
        menuContainer.removeEventListener('transitionend', addResizeAnim);
    };

    headerContainer.addEventListener('mouseleave', () => {
        menuContainer.addEventListener('transitionstart', clearAfterLeaving);
        menuContainer.classList.remove('desktop-menu--visible');
    });

};