function initCatalogViews() {
    const viewItems = document.querySelectorAll('.catalog-views__item');
    if (!viewItems.length) return;

    // Вспомогательные функции
    const getViewFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('view');
    };

    const setViewInUrl = (viewType) => {
        const url = new URL(window.location);
        url.searchParams.set('view', viewType);
        window.history.replaceState({}, '', url);
    };

    const activateView = (viewType) => {
        viewItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-view') === viewType);
        });
    };

    // Инициализация: если нет view в URL - ставим первый
    let currentView = getViewFromUrl();
    if (!currentView) {
        const defaultView = viewItems[0].getAttribute('data-view');
        setViewInUrl(defaultView);
        currentView = defaultView;
    }

    activateView(currentView);

    // Клики по элементам
    viewItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewType = item.getAttribute('data-view');
            setViewInUrl(viewType);
            activateView(viewType);
        });
    });
}

document.addEventListener('DOMContentLoaded', initCatalogViews);