/**
 * Virat Furniture - Core Application JS
 * Author: Shubham Sahani
 * Location: Surat, Gujarat
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('show');
      const isExpanded = navMenu.classList.contains('show');
      menuToggle.setAttribute('aria-expanded', isExpanded.toString());
      menuToggle.innerHTML = isExpanded ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('show') && !navMenu.contains(e.target) && e.target !== menuToggle) {
        navMenu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '☰';
      }
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '☰';
      });
    });
  }

  // Sticky Header on Scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('sticky');
        header.style.boxShadow = '0 4px 15px rgba(92, 64, 51, 0.15)';
      } else {
        header.classList.remove('sticky');
        header.style.boxShadow = 'var(--shadow-sm)';
      }
    });
  }

  // Back to Top button auto-fade and scroll
  const backTopBtn = document.getElementById('back-top');
  if (backTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backTopBtn.style.display = 'flex';
        backTopBtn.style.opacity = '1';
      } else {
        backTopBtn.style.opacity = '0';
        setTimeout(() => {
          if (parseFloat(backTopBtn.style.opacity) === 0) {
            backTopBtn.style.display = 'none';
          }
        }, 300);
      }
    });

    backTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Dynamic Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  // Lazy loading image handler for performance
  const images = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => imgObserver.observe(img));
  } else {
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  // Add scroll-active tracking for nav links
  const sections = document.querySelectorAll('section[id]');
  const mainNavLinks = document.querySelectorAll('.nav-menu .nav-link');
  if (sections.length && mainNavLinks.length) {
    window.addEventListener('scroll', () => {
      let currentSection = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) {
          currentSection = sec.getAttribute('id') || '';
        }
      });

      mainNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').endsWith(`#${currentSection}`)) {
          link.classList.add('active');
        }
      });
    });
  }
});

// Common Quote Form Handler - Formulates WhatsApp API message structure
function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const name = form.querySelector('[name="name"]').value.trim();
  const phone = form.querySelector('[name="phone"]').value.trim();
  const serviceElement = form.querySelector('[name="service"]');
  const service = serviceElement ? serviceElement.value : '';
  const message = form.querySelector('[name="message"]').value.trim();
  
  if (!name || !phone) {
    alert('Please enter your Name and Phone Number to request a free quote.');
    return false;
  }
  
  // Create beautiful message string
  let waText = `Hello Virat Furniture,\n\nI would like to request a Free Quote.\n\n`;
  waText += `*Name:* ${name}\n`;
  waText += `*Phone:* ${phone}\n`;
  if (service) {
    waText += `*Requirement:* ${service}\n`;
  }
  if (message) {
    waText += `*Details:* ${message}\n`;
  }
  
  waText += `\nSent via website website callback request. Please coordinate a free site visit.`;
  
  const encodedText = encodeURIComponent(waText);
  // Using official phone 09725713944
  const waUrl = `https://wa.me/919725713944?text=${encodedText}`;
  
  // Track conversion in sessional storage and redirect to thank-you.html
  sessionStorage.setItem('enquiry_sent', 'true');
  sessionStorage.setItem('enquiry_name', name);
  
  window.open(waUrl, '_blank');
  
  // Redirect to thank-you.html
  window.location.href = 'thank-you.html';
  
  return false;
}
