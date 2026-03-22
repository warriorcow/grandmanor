function initCatalogViews() {
    const viewItems = document.querySelectorAll('.catalog-views__item');
    if (!viewItems.length) return;

    const COOKIE_NAME = 'catalogView';
    const MOBILE_BREAKPOINT = 1280; // px

    const getViewFromCookie = () => {
        const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    };

    const setViewToCookie = (viewType) => {
        document.cookie = `${COOKIE_NAME}=${encodeURIComponent(viewType)}; path=/; max-age=31536000`;
    };

    const activateView = (viewType) => {
        viewItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-view') === viewType);
        });
    };

    const applyViewClass = (viewType) => {
        const container = document.querySelector('.catalog-list');
        if (!container) return;

        // если текущий вид row и экран < 1280, принудительно grid
        const finalView = (viewType === 'row' && window.innerWidth < MOBILE_BREAKPOINT) ? 'grid' : viewType;

        container.classList.toggle('catalog-list--row', finalView === 'row');
        container.classList.toggle('catalog-list--grid', finalView === 'grid');
    };

    // Инициализация: берем вид из куки или первый по умолчанию
    let currentView = getViewFromCookie();
    if (!currentView) {
        currentView = viewItems[0].getAttribute('data-view');
        setViewToCookie(currentView);
    }

    activateView(currentView);
    applyViewClass(currentView);

    // клики по элементам
    viewItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewType = item.getAttribute('data-view');
            currentView = viewType; // обновляем текущий вид
            setViewToCookie(viewType);
            activateView(viewType);
            applyViewClass(viewType);
        });
    });

    // ресайз: проверяем актуальный вид из currentView
    window.addEventListener('resize', () => {
        applyViewClass(currentView);
    });
}

document.addEventListener('DOMContentLoaded', initCatalogViews);