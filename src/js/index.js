// LOGOS INFINITE SLIDER
document.addEventListener("DOMContentLoaded", () => {
  const slideContainer = document.querySelector(".infinite-slide");
  const slideContent = slideContainer.innerHTML;
  slideContainer.innerHTML += slideContent; // Duplicate content for smooth looping

  let position = 0;
  const speed = 0.8; 

  function animate() {
    position -= speed;
    if (position <= -slideContainer.scrollWidth / 2) {
      position = 0;
    }
    slideContainer.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }
  animate();
});


// CAROUSEL
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel__list");
  const cards = document.querySelectorAll(".card");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const navContainer = document.querySelector(".carousel__navigation");
  let index = 0;
  let numVisibleCards = getVisibleCards();
  let touchStartX = 0;
  let touchEndX = 0;
  
  if (!track || cards.length === 0) {
    console.error("Carousel elements not found.");
    return;
  }

  function getVisibleCards() {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateNavigation() {
    numVisibleCards = getVisibleCards();
    const totalMovements = Math.ceil(cards.length / numVisibleCards);
    navContainer.innerHTML = "";

    for (let i = 0; i < totalMovements; i++) {
      const dot = document.createElement("div");
      dot.classList.add("carousel__navigation-item");
      if (i === index) dot.classList.add("carousel__navigation-item--active");
      dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
      });
      navContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    numVisibleCards = getVisibleCards();
    const totalCards = cards.length;
    const maxIndex = Math.ceil(cards.length / numVisibleCards) - 1;
    const trackWidth = track.getBoundingClientRect().width;
    index = Math.min(index, maxIndex);
    
    let offset = -index * ((cards[0].offsetWidth * numVisibleCards) + 32);
    
    if(numVisibleCards > 1 && offset != 0){
      offset = -index * (cards[0].offsetWidth - 50 - 32);
    }

    
    track.style.transform = `translateX(${offset}px)`;
    updateNavigation();
  }

  function moveNext() {
    const maxIndex = Math.ceil(cards.length / numVisibleCards) - 1;
    if (index < maxIndex) {
      index++;
      updateCarousel();
    }
  }

  function movePrev() {
    if (index > 0) {
      index--;
      updateCarousel();
    }
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

  function handleResize() {
    updateCarousel();
  }

  prevButton?.addEventListener("click", movePrev);
  nextButton?.addEventListener("click", moveNext);
  track.addEventListener("touchstart", handleTouchStart);
  track.addEventListener("touchend", handleTouchEnd);
  window.addEventListener("resize", handleResize);

  updateCarousel();
});
