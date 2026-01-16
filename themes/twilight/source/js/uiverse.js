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
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
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

  if (!prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ui-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.ui-card, .post-card').forEach(card => {
      observer.observe(card);
    });
  }



  // Input focus effects
  document.querySelectorAll('.ui-input, input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement?.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement?.classList.remove('focused');
    });
  });

  if (!prefersReducedMotion) {
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
  }

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
        if (!prefersReducedMotion) {
          img.style.transition = 'opacity 0.3s ease';
          setTimeout(() => {
            img.style.opacity = '1';
          }, 100);
        } else {
          img.style.opacity = '1';
        }
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
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  // Add parallax effect to banner
  const banner = document.querySelector('.banner');
  if (banner && !prefersReducedMotion) {
    let rafId = null;
    let latestScrollY = 0;
    const onScroll = () => {
      latestScrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const bannerHeight = banner.offsetHeight;
        if (latestScrollY < bannerHeight) {
          banner.style.transform = `translateY(${latestScrollY * 0.5}px)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
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
    copyBtn.style.top = '10px';
    copyBtn.style.right = '10px';
    copyBtn.style.padding = '6px 12px';
    copyBtn.style.fontSize = '12px';
    copyBtn.style.zIndex = '10';
    
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
