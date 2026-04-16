/* ============================================================
   main.js — Portfolio Interactivity
   ============================================================ */

/* ---- Sticky Navbar ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ---- Mobile Menu (Hamburger) ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

/* ---- Scroll Reveal (IntersectionObserver) ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- Active Nav Link on Scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--neon-blue)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ---- Portfolio Filter ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioCards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;

      if (show) {
        card.style.display = '';
        // Re-trigger reveal animation
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ---- Contact Form ---- */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');
  const form = document.getElementById('contact-form');

  // Simple validation
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    shakeForm(btn);
    return;
  }

  // Simulate send
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Sent!';
    success.style.display = 'block';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      success.style.display = 'none';
    }, 4000);
  }, 1200);
}

function shakeForm(el) {
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shake 0.4s cubic-bezier(0.36,0.07,0.19,0.97)';
}

/* Inject shake keyframes dynamically */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ---- Smooth cursor glow effect on hero orbs (mouse parallax) ---- */
const hero = document.getElementById('hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    const orb1 = hero.querySelector('.orb-1');
    const orb2 = hero.querySelector('.orb-2');
    if (orb1) orb1.style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
    if (orb2) orb2.style.transform = `translate(${-x * 0.6}px, ${-y * 0.6}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    const orb1 = hero.querySelector('.orb-1');
    const orb2 = hero.querySelector('.orb-2');
    if (orb1) orb1.style.transform = '';
    if (orb2) orb2.style.transform = '';
  });
}

/* ---- Number counter animation for stats ---- */
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + '+';
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + '+';
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      const targets = [50, 30, 3];
      nums.forEach((num, i) => animateCounter(num, targets[i]));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);
function handleSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value;

  emailjs.send("service_ag9jyec", "template_0xq5cuc", {
    name: name,
    email: email,
    service: service,
    message: message
  })
    .then(function (response) {
      document.getElementById("form-success").style.display = "block";
      document.getElementById("contact-form").reset();
    })
    .catch(function (error) {
      console.log(error);
      alert("❌ Failed to send message");
    });
}
