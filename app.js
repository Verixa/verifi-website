const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

function closeMenu() {
  mainNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  mainNav.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mainNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

// Keep navigation in sync with the section visible below the sticky header.
const sectionLinks = [...document.querySelectorAll('#main-nav a, .section-dots a')];
const sections = [...document.querySelectorAll('main > section[id]')];
let scrollQueued = false;
function updateNavigation() {
  const headerOffset = document.querySelector('.site-header').offsetHeight + 100;
  let current = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= headerOffset) current = section.id;
  }
  for (const link of sectionLinks) {
    if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
updateNavigation();

const backgroundVideo = document.querySelector('.hero-video');
const motionToggle = document.querySelector('.motion-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = false;
function updateMotionControl() {
  const paused = backgroundVideo.paused;
  motionToggle.textContent = paused ? 'Play background' : 'Pause background';
  motionToggle.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
  motionToggle.setAttribute('aria-pressed', String(paused));
}
function applyMotionPreference() {
  motionToggle.hidden = reducedMotion.matches;
  if (reducedMotion.matches || userPaused) backgroundVideo.pause();
  else backgroundVideo.play().catch(updateMotionControl);
}
motionToggle.addEventListener('click', () => {
  userPaused = !backgroundVideo.paused;
  applyMotionPreference();
});
backgroundVideo.addEventListener('play', updateMotionControl);
backgroundVideo.addEventListener('pause', updateMotionControl);
reducedMotion.addEventListener('change', applyMotionPreference);
applyMotionPreference();

// Placeholder only: never transmit, persist, or imply receipt of form data.
// Replace this handler with a real service integration when one is selected.
const demoForm = document.querySelector('#demo-form');
demoForm.querySelector('[type="submit"]').disabled = false;
demoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!demoForm.reportValidity()) return;
  const status = document.querySelector('#form-status');
  status.textContent = 'This is a preview only. Your request has not been sent or saved. Please email info@getverifi.ca to arrange a demo.';
  status.focus();
});
document.querySelector('#year').textContent = new Date().getFullYear();
