import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Инициализация слайдера
function initSlider() {
  const sliderElement = document.querySelector('.slider__swiper');
  
  if (!sliderElement) {
    return;
  }

  new Swiper(sliderElement, {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800,
    navigation: {
      nextEl: '.slider__button-next',
      prevEl: '.slider__button-prev',
    },
    pagination: {
      el: '.slider__pagination',
      clickable: true,
      type: 'bullets',
    },
    effect: 'slide',
    slidesPerView: 1,
    spaceBetween: 0,
  });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
});

export default initSlider;

