// HERO FADE EFFECT
document.addEventListener("DOMContentLoaded", () => {
  function cycleFadeEffect() {
    const items = document.querySelectorAll(".mosaic__item");
    const numOfItemsToFade = Math.floor(Math.random() * 2) + 1; // Random number between 1 and 2 (less than 3)

    // Ensure previously hidden items are visible again before selecting new ones
    items.forEach((item) => item.classList.remove("mosaic__item--fade"));

    const randomItems = [];

    // Randomly select `numOfItemsToFade` elements to hide
    while (randomItems.length < numOfItemsToFade) {
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomItem = items[randomIndex];

      if (!randomItems.includes(randomItem)) {
        randomItems.push(randomItem);
      }
    }

    // Apply fade-out to the selected items
    randomItems.forEach((item) => {
      item.classList.add("mosaic__item--fade");
    });
  }

  // Trigger the cycle every 3 seconds
  setInterval(cycleFadeEffect, 2500);
});

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

// TOGGLE GROUP PANEL
document.addEventListener("DOMContentLoaded", function () {
  const toggleNavItems = document.querySelectorAll(".toggle-group__nav-item");
  const panels = document.querySelectorAll(".toggle-group__panel-group");

  // Set the initial active panel
  panels[0].classList.add("active");
  toggleNavItems[0].classList.add("toggle-group__nav-item--active");

  toggleNavItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Remove active class from all nav items and panels
      toggleNavItems.forEach((navItem) => {
        navItem.classList.remove("toggle-group__nav-item--active");
      });
      panels.forEach((panel) => {
        panel.classList.remove("active");
      });

      // Add active class to the clicked item and corresponding panel
      item.classList.add("toggle-group__nav-item--active");
      panels[index].classList.add("active");
    });
  });
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

    let offset = -index * (cards[0].offsetWidth * numVisibleCards + 32);

    if (numVisibleCards > 1 && offset != 0) {
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
