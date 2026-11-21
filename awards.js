const track = document.querySelector('.awards-grid');
const controls = document.querySelector('.award-controls');
const toggle = document.querySelector('#toggle-awards');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let playing = !reducedMotion.matches;

function updateControl() {
  toggle.textContent = playing ? 'Pause' : 'Play';
  toggle.setAttribute('aria-label', playing ? 'Pause automatic scrolling' : 'Play automatic scrolling');
}

function advance(direction) {
  const end = track.scrollWidth - track.clientWidth;
  const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
  let left = track.scrollLeft + direction * step;
  if (direction > 0 && track.scrollLeft >= end - 2) left = 0;
  if (direction < 0 && track.scrollLeft <= 2) left = end;
  track.scrollTo({ left, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
}

controls.hidden = false;
updateControl();
toggle.addEventListener('click', () => {
  playing = !playing;
  updateControl();
});
for (const [id, direction] of [['previous-award', -1], ['next-award', 1]]) {
  document.getElementById(id).addEventListener('click', () => {
    advance(direction);
  });
}
reducedMotion.addEventListener('change', () => {
  playing = !reducedMotion.matches;
  updateControl();
});
setInterval(() => {
  if (playing && !document.hidden && !track.matches(':focus-within')) advance(1);
}, 4000);
