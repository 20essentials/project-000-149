const d = document;
const $ = el => d.querySelector(el);
const $container = $('.container-cube');
const GROW = 5;
const ROTATE = {
  X: 0,
  Y: 0
};

const start = e => {
  let firstdeltaHorizontalX = e.clientX ?? e.touches[0].clientX;
  let firstdeltatVerticalY = e.clientY ?? e.touches[0].clientY;

  const move = e => {
    let currentHorizontalX = e.clientX ?? e.touches[0].clientX;
    let currentVerticalY = e.clientY ?? e.touches[0].clientY;

    let differenceX = currentHorizontalX - firstdeltaHorizontalX;
    let differenceY = currentVerticalY - firstdeltatVerticalY;

    differenceX > 0 ? (ROTATE.Y += GROW) : (ROTATE.Y -= GROW);
    differenceY > 0 ? (ROTATE.X += GROW) : (ROTATE.X -= GROW);

    $container.style.transform = `translate(${differenceX}px, ${differenceY}px) rotateY(${ROTATE.Y}deg) rotateX(${ROTATE.X}deg) `;
    d.addEventListener('touchend', end);
    d.addEventListener('mouseup', end);
  };

  const end = e => {
    $container.style.transform = `rotateY(30deg) rotateX(30deg) `;
    d.removeEventListener('mousemove', move);
    d.removeEventListener('touchmove', move);
    d.removeEventListener('touchend', end);
    d.removeEventListener('mouseup', end);
  };

  d.addEventListener('mousemove', move, { passive: true });
  d.addEventListener('touchmove', move, { passive: true });
};

d.addEventListener('mousedown', start, { passive: true });
d.addEventListener('touchstart', start, { passive: true });
