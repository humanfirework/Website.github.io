// Helper functions
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Uiverse UI Elements JavaScript

(function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ui-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with ui-card class
  document.querySelectorAll('.ui-card, .post-card').forEach(card => {
    observer.observe(card);
  });

  // Add hover effects to buttons
  document.querySelectorAll('.ui-btn, button, a').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple effect styles
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
      z-index: 0;
    }
    
    [data-theme="dark"] .ripple {
      background: rgba(0, 0, 0, 0.4);
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  // Input focus effects
  document.querySelectorAll('.ui-input, input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement?.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement?.classList.remove('focused');
    });
  });

  // Dark mode transition effects
  document.addEventListener('dark-theme-set', function() {
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  });

  document.addEventListener('light-theme-set', function() {
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  });

  // Add loading animation for images
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
      const placeholder = document.createElement('div');
      placeholder.className = 'ui-spinner';
      placeholder.style.position = 'absolute';
      placeholder.style.top = '50%';
      placeholder.style.left = '50%';
      placeholder.style.transform = 'translate(-50%, -50%)';
      
      img.parentElement.style.position = 'relative';
      img.parentElement.appendChild(placeholder);
      
      img.addEventListener('load', function() {
        placeholder.remove();
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          img.style.opacity = '1';
        }, 100);
      });
    }
  });

  // Smooth scroll to top button enhancement
  const topBtn = document.querySelector('.top');
  if (topBtn) {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          if (scrollTop > 300) {
            topBtn.style.opacity = '1';
            topBtn.style.pointerEvents = 'auto';
          } else {
            topBtn.style.opacity = '0';
            topBtn.style.pointerEvents = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
    
    topBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Add parallax effect to banner
  const banner = document.querySelector('.banner');
  if (banner) {
    window.addEventListener('scroll', throttle(function() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const bannerHeight = banner.offsetHeight;
      if (scrollY < bannerHeight) {
        const parallax = scrollY * 0.5;
        banner.style.transform = `translateY(${parallax}px)`;
      }
    }, 16));
  }

  // Tooltip functionality
  const tooltips = document.querySelectorAll('[data-tooltip]');
  tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', function() {
      const tooltipText = this.getAttribute('data-tooltip');
      const tooltipElement = document.createElement('div');
      tooltipElement.className = 'ui-tooltip';
      tooltipElement.textContent = tooltipText;
      tooltipElement.style.position = 'absolute';
      tooltipElement.style.background = 'rgba(0, 0, 0, 0.8)';
      tooltipElement.style.color = 'white';
      tooltipElement.style.padding = '8px 12px';
      tooltipElement.style.borderRadius = '8px';
      tooltipElement.style.fontSize = '14px';
      tooltipElement.style.zIndex = '10000';
      tooltipElement.style.pointerEvents = 'none';
      tooltipElement.style.transition = 'opacity 0.2s ease';
      tooltipElement.style.opacity = '0';
      
      document.body.appendChild(tooltipElement);
      
      const rect = this.getBoundingClientRect();
      const tooltipRect = tooltipElement.getBoundingClientRect();
      
      tooltipElement.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
      tooltipElement.style.top = `${rect.top - tooltipRect.height - 10}px`;
      
      setTimeout(() => {
        tooltipElement.style.opacity = '1';
      }, 100);
      
      this._tooltip = tooltipElement;
    });
    
    tooltip.addEventListener('mouseleave', function() {
      if (this._tooltip) {
        this._tooltip.remove();
        delete this._tooltip;
      }
    });
  });

  // Countdown functionality
  const countdowns = document.querySelectorAll('[data-countdown]');
  countdowns.forEach(countdown => {
    const targetDate = new Date(countdown.getAttribute('data-countdown'));
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;
      
      if (diff <= 0) {
        countdown.textContent = 'Countdown ended';
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });

  // Add click effects to cards
  document.querySelectorAll('.ui-card, .post-card').forEach(card => {
    card.addEventListener('click', function(e) {
      // If clicked on a link, don't add effect
      if (e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // Form validation enhancement
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredInputs = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('invalid');
          input.addEventListener('input', function() {
            this.classList.remove('invalid');
          }, { once: true });
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        this.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add custom scrollbar to sidebar and content areas
  document.querySelectorAll('.sidebar, .content, .post-content').forEach(area => {
    area.classList.add('ui-custom-scrollbar');
  });

  // Responsive menu toggle enhancement
  const mobileMenuBtn = document.querySelector('.mobile-nav-btn');
  const mobileMenu = document.querySelector('.mobile-nav');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      this.classList.toggle('active');
      document.body.classList.toggle('mobile-nav-on');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.remove('open');
      mobileMenuBtn?.classList.remove('active');
      document.body.classList.remove('mobile-nav-on');
    }
  });

  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.search-input, input[type="search"]');
      if (searchInput) {
        searchInput.focus();
      }
    }
    
    // Escape to close modals and menus
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal, .mobile-nav').forEach(modal => {
        modal.classList.remove('open');
      });
      document.body.classList.remove('mobile-nav-on');
      document.querySelector('.mobile-nav-btn')?.classList.remove('active');
    }
  });

  // Add copy-to-clipboard functionality to code blocks
  document.querySelectorAll('pre code').forEach(codeBlock => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'ui-btn ui-btn-primary copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.style.position = 'absolute';
    top: '10px';
    right: '10px';
    padding: '6px 12px';
    font-size: '12px';
    z-index: 10;
    
    const pre = codeBlock.parentElement;
    pre.style.position = 'relative';
    pre.appendChild(copyBtn);
    
    copyBtn.addEventListener('click', function() {
      const text = codeBlock.textContent;
      navigator.clipboard.writeText(text).then(() => {
        this.textContent = 'Copied!';
        this.style.background = '#4CAF50';
        setTimeout(() => {
          this.textContent = 'Copy';
          this.style.background = '';
        }, 2000);
      });
    });
  });
})();