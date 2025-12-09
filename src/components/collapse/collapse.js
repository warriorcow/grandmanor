// js/collapse.js

function initCollapse() {
    const collapses = document.querySelectorAll('[data-collapse-item]');
    if (!collapses.length) return;

    collapses.forEach(collapse => {
        const header = collapse.querySelector('.collapse__header');
        const content = collapse.querySelector('.collapse__content');

        if (!header || !content) return;

        // Инициализация начального состояния
        if (collapse.dataset.collapseItem === 'open') {
            content.style.height = content.scrollHeight + 'px';
        } else {
            content.style.height = '0px';
        }

        content.style.overflow = 'hidden';
        content.style.transition = 'height 200ms ease';

        header.addEventListener('click', () => {
            const isOpen = collapse.dataset.collapseItem === 'open';

            if (isOpen) {
                collapse.dataset.collapseItem = '';
                content.style.height = '0px';
            } else {
                collapse.dataset.collapseItem = 'open';
                content.style.height = content.scrollHeight + 'px';
            }
        });

        // Обработка клавиатуры
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });
}

// Обработка динамического контента
function updateCollapseHeights() {
    const openCollapses = document.querySelectorAll('[data-collapse-item="open"]');

    openCollapses.forEach(collapse => {
        const content = collapse.querySelector('.collapse__content');
        if (content) {
            content.style.height = 'auto';
            const newHeight = content.scrollHeight;
            content.style.height = newHeight + 'px';
        }
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initCollapse);

// Экспорт для обновления при динамическом изменении контента
window.collapseAPI = {
    init: initCollapse,
    updateHeights: updateCollapseHeights
};