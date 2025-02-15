document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.navbar__hamburguer');
  const menuItems = document.querySelectorAll('.navbar__menu-item');

  hamburger.addEventListener('click', function() {
    document.body.classList.toggle('navbar-active');
  });

  menuItems.forEach(item => item.addEventListener('click', function() {
    document.body.classList.remove('navbar-active');
  }));

  
  // Function to check viewport size and remove class if necessary
  function handleViewportResize() {
    if (window.innerWidth > 1200) { // Adjust 'window.desktopLgMin' with the actual breakpoint value
      document.body.classList.remove('navbar-active');
    }
  }

  // Add event listener for resize to call handleViewportResize function
  window.addEventListener('resize', handleViewportResize);
});
