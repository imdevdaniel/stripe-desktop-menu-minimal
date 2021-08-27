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
            console.log('Target section to enable', targetElement);
            for (section of menuSections) {
                section.classList.remove('desktop-menu__section--visible');
            }
            menuContainer.setAttribute(
                'style',
                `height: ${mainMenuSizes[targetSection].height}px; width: ${mainMenuSizes[targetSection].width}px;`
            );
            targetElement.classList.add('desktop-menu__section--visible');
        });
    }

    // console.log('New values for mainmenusizes:', mainMenuSizes);

    // menuContainer.setAttribute('style', `height: ${mainMenuSizes.prods.height}px; width: ${mainMenuSizes.prods.width}px;`);

};