const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.site-header');
const form = document.querySelector('#contactForm');
const formStatus = document.querySelector('.form-status');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));

    navToggle.querySelectorAll('span').forEach((line, index) => {
      if (isOpen) {
        line.style.transform = index === 0 ? 'translateY(7px) rotate(45deg)' :
          index === 1 ? 'opacity: 0' : 'translateY(-7px) rotate(-45deg)';
      } else {
        line.style.transform = 'none';
        line.style.opacity = '1';
      }
    });
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.querySelectorAll('span').forEach((line) => {
        line.style.transform = 'none';
        line.style.opacity = '1';
      });
    });
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields before sending.';
      formStatus.style.color = '#f8c98b';
      return;
    }

    formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
    formStatus.style.color = '#8ef0b5';
    form.reset();
  });
}
