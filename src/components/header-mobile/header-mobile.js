function initMobileHeader() {
  const menuBtn = document.querySelector('.header-mobile__menu-button');
  const menuWrapper = document.querySelector('.header-mobile__menu');
  const headerWrapper = document.querySelector('.header-mobile');
  const categories = document.querySelectorAll('.header-mobile__menu-category');

  menuWrapper.style.transition = ".3s ease";

  menuBtn.addEventListener('click', () => {
    const isOpen = headerWrapper.classList.contains('open');

    if (isOpen) {
      // Убираем блокировку скролла
      document.body.style.overflow = '';

      // Скролим меню в начало
      menuWrapper.scrollTo({ top: 0, behavior: 'smooth' });

      // Закрываем сам меню
      headerWrapper.classList.remove('open');

      // Закрываем все категории
      categories.forEach(category => {
        category.classList.remove('open');
        const sub = category.querySelector('.header-mobile__menu-subcategory');
        sub.style.height = '0px';
      });
    } else {
      // Открываем меню и блокируем скролл
      document.body.style.overflow = 'hidden';
      headerWrapper.classList.add('open');
    }
  });

  categories.forEach(category => {
    const btn = category.querySelector('.header-mobile__menu-category-button');
    const sub = category.querySelector('.header-mobile__menu-subcategory');

    // Изначально скрываем
    sub.style.height = '0px';
    sub.style.overflow = 'hidden';
    sub.style.transition = 'height .3s ease';

    btn.addEventListener('click', () => {
      const isOpen = category.classList.contains('open');

      // Закрываем все остальные категории
      categories.forEach(other => {
        if (other !== category) {
          other.classList.remove('open');
          const otherSub = other.querySelector('.header-mobile__menu-subcategory');
          otherSub.style.height = '0px';
        }
      });

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
  initMobileHeader();
});

export default initMobileHeader;
