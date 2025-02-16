document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.navbar__hamburguer');
  const menuItems = document.querySelectorAll('.navbar__menu-item');

  hamburger.addEventListener('click', function() {
    document.body.classList.toggle('navbar-active');
  });

  menuItems.forEach(item => item.addEventListener('click', function() {
    document.body.classList.remove('navbar-active');
  }));

  
  // Add event listener for resize to remove the active class
  window.addEventListener('resize', document.body.classList.remove('navbar-active'));
});
