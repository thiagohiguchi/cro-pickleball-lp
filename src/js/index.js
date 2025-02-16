document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel__list");
  const cards = document.querySelectorAll(".card");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const dots = document.querySelectorAll(".carousel__navigation-item");
  let index = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  if (!track || cards.length === 0) {
    console.error("Carousel elements not found.");
    return;
  }

  const totalCards = cards.length;
  const cardWidth = cards[0].offsetWidth;

  // function updateCarousel() {
  //   const offset = -index * (cardWidth + 32);
  //   track.style.transform = `translateX(${offset}px)`;
  //   dots.forEach((dot, dotIndex) => {
  //     dot.classList.toggle("carousel__navigation-item--active", dotIndex === index);
  //   });
  // }
  function updateCarousel() {
    let numVisibleCards = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    let offset = -index * (cardWidth * numVisibleCards);
    track.style.transform = `translateX(${offset}px)`;
    
    dots.forEach((dot, dotIndex) => {
        if (dotIndex >= index && dotIndex < index + numVisibleCards) {
            dot.classList.add("cards-navigation__item--active");
        } else {
            dot.classList.remove("cards-navigation__item--active");
        }
    });
}

  function moveNext() {
    index = (index + 1) % totalCards;
    updateCarousel();
  }

  function movePrev() {
    index = (index - 1 + totalCards) % totalCards;
    updateCarousel();
  }

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 50) {
      movePrev();
    } else if (swipeDistance < -50) {
      moveNext();
    }
  }

  prevButton?.addEventListener("click", movePrev);
  nextButton?.addEventListener("click", moveNext);
  track.addEventListener("touchstart", handleTouchStart);
  track.addEventListener("touchend", handleTouchEnd);

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      index = dotIndex;
      updateCarousel();
    });
  });
});
