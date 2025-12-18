// Additional animations and interactions
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  // Observe all sections and boxes
  document.querySelectorAll('.section, .box').forEach(el => {
    observer.observe(el);
  });

  // Parallax effect for hero section
  let ticking = false;
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBody = document.querySelector('.hero-body');

    if (hero && heroBody) {
      heroBody.style.transform = `translateY(${scrolled * 0.5}px)`;
      hero.style.opacity = 1 - (scrolled * 0.002);
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  let lastScrollY = 0;
  window.addEventListener('scroll', function() {
    lastScrollY = window.pageYOffset;
    requestTick();
  });

  // Text reveal animation
  class TextReveal {
    constructor(element) {
      this.element = element;
      this.text = element.textContent;
      element.textContent = '';
      this.words = this.text.split(' ');
      this.spans = [];

      this.words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(20px)';
        span.style.transition = 'all 0.3s ease';
        span.style.transitionDelay = `${index * 0.05}s`;

        element.appendChild(span);
        if (index < this.words.length - 1) {
          element.appendChild(document.createTextNode(' '));
        }
        this.spans.push(span);
      });
    }

    reveal() {
      this.spans.forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    }

    hide() {
      this.spans.forEach(span => {
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
      });
    }
  }

  // Initialize text reveal for main titles
  const mainTitle = document.querySelector('.hero .title');
  if (mainTitle) {
    const textReveal = new TextReveal(mainTitle);
    setTimeout(() => textReveal.reveal(), 500);
  }

  const subtitle = document.querySelector('.hero .subtitle');
  if (subtitle) {
    const textReveal = new TextReveal(subtitle);
    setTimeout(() => textReveal.reveal(), 700);
  }

  // Floating animation for buttons
  const floatingElements = document.querySelectorAll('.button, .video');
  floatingElements.forEach(el => {
    el.style.animation = 'floating 3s ease-in-out infinite';
    el.style.animationDelay = `${Math.random() * 2}s`;
  });

  // Add floating animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floating {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }

    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .section {
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.6s ease-out;
    }

    .box {
      opacity: 0;
      transform: scale(0.9);
      transition: all 0.4s ease-out;
    }

    .box.is-visible {
      transform: scale(1);
    }
  `;
  document.head.appendChild(style);

  // Counter animation for statistics (if added later)
  function animateCounter(element, target, duration = 2000) {
    let startTime = null;
    const startValue = 0;

    function animate(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const currentValue = Math.floor(progress * target);

      element.textContent = currentValue + (element.dataset.suffix || '');

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  // Video hover effects
  document.querySelectorAll('video').forEach(video => {
    video.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
    });

    video.addEventListener('mouseleave', function() {
      this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    });
  });

  // Typing effect for contact section
  const contactText = document.querySelector('#contact strong');
  if (contactText) {
    const originalText = contactText.textContent;
    contactText.textContent = '';
    let i = 0;

    const typeWriter = () => {
      if (i < originalText.length) {
        contactText.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50 + Math.random() * 50);
      }
    };

    // Start typing when contact section is visible
    const contactObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter();
          contactObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    contactObserver.observe(document.querySelector('#contact'));
  }

  // Shimmer effect for method image
  const methodImage = document.querySelector('.box img[src="static/images/method.png"]');
  if (methodImage) {
    methodImage.addEventListener('load', function() {
      this.parentElement.classList.add('loaded');
    });
  }
});