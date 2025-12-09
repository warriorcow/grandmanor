function initFilterMobile() {
    const btn = document.querySelector('.filter-mobile__button');
    const filterEl = document.querySelector('.filter-mobile__items');

    if (!btn && !filterEl) return;

    // Функция закрытия фильтра
    const closeFilter = () => {
        filterEl.classList.remove('open');
    };

    // Функция открытия/закрытия фильтра
    const toggleFilter = () => {
        filterEl.classList.toggle('open');
    };

    // Обработчик клика по кнопке
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Предотвращаем всплытие
        toggleFilter();
    });

    // Обработчик клика вне элемента
    document.addEventListener('click', (e) => {
        const isClickInsideFilter = filterEl.contains(e.target);
        const isClickOnButton = btn.contains(e.target);

        if (!isClickInsideFilter && !isClickOnButton && filterEl.classList.contains('open')) {
            closeFilter();
        }
    });

    // Обработчик нажатия клавиши Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && filterEl.classList.contains('open')) {
            closeFilter();
        }
    });

    // Предотвращаем закрытие при клике внутри фильтра
    filterEl.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFilterMobile();
});

export default initFilterMobile;