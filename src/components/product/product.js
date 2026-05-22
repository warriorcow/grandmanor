import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

function initProductPage() {
  // Инициализация только на странице товара
  if (!document.querySelector('.product')) return;

  initPhotoGallery();
  initCollectionSlider();
  initSizeSelector();
}

// --- Галерея фотографий товара ---
function initPhotoGallery() {
  const el = document.querySelector('.product__swiper');
  if (!el) return;

  new Swiper(el, {
    modules: [Navigation, Pagination],
    loop: true,
    navigation: {
      nextEl: '.product__gallery-next',
      prevEl: '.product__gallery-prev',
    },
    pagination: {
      el: '.product__pagination',
      clickable: true,
      type: 'bullets',
    },
    slidesPerView: 1,
    spaceBetween: 0,
  });
}

// --- Слайдер «Также из коллекции» ---
function initCollectionSlider() {
  const el = document.querySelector('.product__col-swiper');
  if (!el) return;

  new Swiper(el, {
    modules: [Navigation],
    navigation: {
      nextEl: '.product__col-next',
      prevEl: '.product__col-prev',
    },
    slidesPerView: 4,
    spaceBetween: 0,
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1281: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    },
  });
}

// --- Выбор размера ---
function initSizeSelector() {
  const sizes = document.querySelectorAll('.product__size');
  if (!sizes.length) return;

  sizes.forEach(btn => {
    btn.addEventListener('click', () => {
      sizes.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initProductPage();
});

export default initProductPage;
