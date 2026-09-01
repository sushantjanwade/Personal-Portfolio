// ==========================================
// 1. MOUSE SPOTLIGHT / GLOW EFFECT
// ==========================================
// Create and append the dynamic glow element
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

// Track cursor movement smoothly
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth 60fps interpolation for glowing follower
function animateGlow() {
  currentX += (mouseX - currentX) * 0.15;
  currentY += (mouseY - currentY) * 0.15;
  cursorGlow.style.left = `${currentX}px`;
  cursorGlow.style.top = `${currentY}px`;
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ==========================================
// 2. SCROLLSPY & ACTIVE NAVBAR HIGHLIGHT
// ==========================================
const sections = document.querySelectorAll('section');
const navBtns = document.querySelectorAll('.nav-btn');

window.addEventListener('scroll', () => {
  let activeSectionId = '';
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      activeSectionId = section.getAttribute('id');
    }
  });

  navBtns.forEach((btn) => {
    btn.classList.remove('active');
    if (btn.getAttribute('href') === `#${activeSectionId}`) {
      btn.classList.add('active');
    }
  });
});

// ==========================================
// CONTACT FORM SUBMISSION (WEB3FORMS)
// ==========================================
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const result = await response.json();
      if (result.success) {
        alert("Thank you, Sushant! Your message has been sent successfully.");
        contactForm.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error sending message. Please check your internet connection.");
    } finally {
      submitBtn.innerText = "Send Message";
      submitBtn.disabled = false;
    }
  });
}