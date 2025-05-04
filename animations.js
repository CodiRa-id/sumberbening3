// animations.js - Fade in animations with Framer Motion
document.addEventListener('DOMContentLoaded', () => {
  // Elements to animate
  const elementsToAnimate = [
    { selector: 'header article', direction: 'left' },
    { selector: '.loader-container', direction: 'normal' },
    { selector: 'section:nth-of-type(1)', direction: 'normal' },
    { selector: '#about article', direction: 'right' },
    { selector: '#about img', direction: 'left' },
    { selector: '#product h2', direction: 'normal' },
    { selector: '#product .rounded-xl', direction: 'up' },
    { selector: '#contact h2, #contact p', direction: 'normal' },
    { selector: '#contact .rounded', direction: 'up' },
    { selector: 'footer > div', direction: 'up' }
  ];

  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class based on direction
        const direction = entry.target.dataset.animDirection;
        entry.target.classList.add('animate-in', `fade-in-${direction}`);
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of element is visible

  // Set up elements with animation classes and observe them
  elementsToAnimate.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach(element => {
      // Add initial state classes
      element.classList.add('opacity-0');
      element.dataset.animDirection = item.direction;
      
      // Observe element
      observer.observe(element);
    });
  });
});

// Animation CSS classes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .animate-in {
    animation-duration: 0.8s;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
  }
  
  .fade-in-normal {
    animation-name: fadeIn;
  }
  
  .fade-in-left {
    animation-name: fadeInLeft;
  }
  
  .fade-in-right {
    animation-name: fadeInRight;
  }
  
  .fade-in-up {
    animation-name: fadeInUp;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);