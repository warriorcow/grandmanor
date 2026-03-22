function initMobileHeader() {
  const menuBtn = document.querySelector('.header-mobile__menu-button');
  const menuWrapper = document.querySelector('.header-mobile__menu');
  const headerWrapper = document.querySelector('.header-mobile');
  const categories = document.querySelectorAll('.header-mobile__menu-category');

  if (!menuBtn || !menuWrapper || !headerWrapper || !categories.length) return;

  menuWrapper.style.transition = ".3s ease";

  menuBtn.addEventListener('click', () => {
    const isOpen = headerWrapper.classList.contains('open');

    if (isOpen) {
      document.documentElement.style.overflow = '';

      menuWrapper.scrollTo({ top: 0, behavior: 'smooth' });

      headerWrapper.classList.remove('open');

      categories.forEach(category => {
        category.classList.remove('open');

        const sub = category.querySelector('.header-mobile__menu-subcategory');
        if (sub) {
          sub.style.height = '0px';
        }
      });
    } else {
      document.documentElement.style.overflow = 'hidden';
      headerWrapper.classList.add('open');
    }
  });

  categories.forEach(category => {
    const btn = category.querySelector('.header-mobile__menu-category-button');
    const sub = category.querySelector('.header-mobile__menu-subcategory');

    // Если нет подменю — просто выходим
    if (!btn || !sub) return;

    // Инициализация
    sub.style.height = '0px';
    sub.style.overflow = 'hidden';
    sub.style.transition = 'height .3s ease';

    btn.addEventListener('click', () => {
      const isOpen = category.classList.contains('open');

      // Закрываем остальные
      categories.forEach(other => {
        if (other === category) return;

        other.classList.remove('open');

        const otherSub = other.querySelector('.header-mobile__menu-subcategory');
        if (otherSub) {
          otherSub.style.height = '0px';
        }
      });

      if (isOpen) {
        category.classList.remove('open');
        sub.style.height = '0px';
      } else {
        category.classList.add('open');
        sub.style.height = sub.scrollHeight + 'px';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileHeader();
});

export default initMobileHeader;