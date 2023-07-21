'use strict';

// Implement transparency for the background of navbar when it is at the top of the page
const navbar = document.querySelector('#navbar');
const navbarItems = document.querySelectorAll('.navbar_menu_item');
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarLogo = document.querySelector('.navbar__logo');
const workBtnContainer = document.querySelector('.work_categories');
const workProjectContainer = document.querySelector('.work_projects');
const projects = document.querySelectorAll('.project');

document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
    navbarLogo.classList.add('visible');
    navbarItems.forEach((el) => el.classList.add('item--light'));
  } else {
    navbar.classList.remove('navbar--dark');
    navbarLogo.classList.remove('visible');
    navbarItems.forEach((el) => el.classList.remove('item--light'));
  }
});

// Implement scrolling behavior when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar_menu');
navbarMenu.addEventListener('click', (event) => {
  const targetSection = event.target.dataset.link;
  if (targetSection == null) {
    return;
  }
  // Close the navigation box for small screens when clicked.
  navbarMenu.classList.remove('open');

  // Scroll to the clicked section on the page.
  scrollInto(targetSection);
});

// Navbar toggle button for small screens: Responsive model.
const navbarToggle = document.querySelector('.navbar_toggle-btn');
navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.add('open');
});

// Implement a gradual fade effect for the home section as the page scrolls down.
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Scroll the page to the top when the arrow up button is pressed.
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

arrowUp.addEventListener('click', () => {
  scrollInto('#home');
});

// Enable project filtering based on categories.
workBtnContainer.addEventListener('click', (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;

  if (filter == null) {
    return;
  }

  // Deselect the previous item and select the new item.
  const active = document.querySelector('.category_btn.selected');
  active.classList.remove('selected');

  const selected =
    event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;

  selected.classList.add('selected');
  workProjectContainer.classList.add('anim-out');

  setTimeout(() => {
    projects.forEach((project) => {
      if (
        filter === '*' ||
        filter === project.dataset.type ||
        filter === project.dataset.filter
      ) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    workProjectContainer.classList.remove('anim-out');
  }, 300);
});

// selector = #id
//move to selected section by scrollIntoView & activate the same nav menu
function scrollInto(selectorId) {
  document.querySelector(selectorId).scrollIntoView({ behavior: 'smooth' });
}
