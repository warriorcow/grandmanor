function initCatalogFilter() {
    const categories = document.querySelectorAll('.catalog-filter__item');
    if (!categories.length) return;

    categories.forEach(category => {
        const btn = category.querySelector('.catalog-filter__item-header');
        const sub = category.querySelector('.catalog-filter__item-content');

        // Если нет кнопки или контента - пропускаем этот элемент
        if (!btn || !sub) return;

        // Изначально скрываем
        sub.style.height = '0px';
        sub.style.overflow = 'hidden';
        sub.style.transition = 'height .3s ease';

        btn.addEventListener('click', () => {
            const isOpen = category.classList.contains('open');

            // Убрали логику закрытия других аккордеонов
            // Теперь каждый работает независимо

            if (isOpen) {
                // Закрываем текущую
                category.classList.remove('open');
                sub.style.height = '0px';
            } else {
                // Открываем текущую
                category.classList.add('open');
                sub.style.height = sub.scrollHeight + 'px';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCatalogFilter();
});