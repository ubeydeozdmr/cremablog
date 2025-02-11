const userCircle = document.querySelector('#user-circle');
const userMenu = document.querySelector('#user-menu');
const darkModeInput = document.querySelector('#dark-mode');
const darkModeCircle = document.querySelector('#dark-mode-circle');
const menuOverlay = document.querySelector('#menu-overlay');
const menu = document.querySelector('#menu');
const backButton = document.querySelector('#back-button');

if (userCircle && userMenu) {
  userCircle.addEventListener('click', () => {
    userMenu.classList.toggle('hidden');
  });
}

const isDarkMode =
  localStorage.currentTheme === 'dark' ||
  (!('currentTheme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches);

document.documentElement.classList.toggle('dark', isDarkMode);

if (darkModeInput) {
  darkModeInput.checked = isDarkMode;
}

if (darkModeCircle) {
  darkModeCircle.classList.toggle('translate-x-5', isDarkMode);
}

function toggleDarkMode() {
  const isDarkMode = document.documentElement.classList.toggle('dark');
  localStorage.setItem('currentTheme', isDarkMode ? 'dark' : 'light');

  if (darkModeCircle) {
    darkModeCircle.classList.toggle('translate-x-5', isDarkMode);
  }

  if (darkModeInput) {
    darkModeInput.checked = isDarkMode;
  }
}

function toggleMenu() {
  menu.classList.toggle('hidden');
  menuOverlay.classList.toggle('hidden');
  document.body.classList.toggle('overflow-hidden');
}

if (backButton && history.length === 1) {
  backButton.classList.add('hidden');
}
