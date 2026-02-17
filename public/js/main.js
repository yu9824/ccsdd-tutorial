/**
 * Blog Styling - JavaScript Enhancements
 * 
 * Provides optional interactive behaviors to enhance user experience.
 * All functionality degrades gracefully when JavaScript is disabled.
 */

(function() {
  'use strict';

  /**
   * Feature Detection
   * Check for required browser APIs before executing enhancements
   */
  function hasRequiredFeatures() {
    return (
      typeof document !== 'undefined' &&
      typeof window !== 'undefined' &&
      'querySelector' in document &&
      'addEventListener' in window
    );
  }

  /**
   * Initialize all enhancements
   * Only runs if required browser features are available
   */
  function init() {
    if (!hasRequiredFeatures()) {
      return; // Graceful degradation - site works without JavaScript
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runEnhancements);
    } else {
      runEnhancements();
    }
  }

  /**
   * Run all enhancement functions
   */
  function runEnhancements() {
    try {
      initSmoothScrolling();
      initLinkEnhancements();
      initFocusManagement();
    } catch (error) {
      // Silently fail - site should work without JavaScript
      console.error('JavaScript enhancements failed:', error);
    }
  }

  /**
   * Smooth Scrolling Enhancement
   * Adds smooth scrolling behavior to anchor links
   * Requirements: 6.1
   */
  function initSmoothScrolling() {
    // Check if smooth scrolling is supported
    if (!('scrollBehavior' in document.documentElement.style)) {
      return; // Browser doesn't support CSS scroll-behavior
    }

    // Find all anchor links that point to elements on the same page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip empty hash or just "#"
        if (!href || href === '#') {
          return;
        }

        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          // Use smooth scroll if supported
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  /**
   * Link Enhancement
   * Adds visual feedback classes to links for enhanced styling
   * Requirements: 6.4
   */
  function initLinkEnhancements() {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(function(link) {
      // Add 'js-link' class for CSS targeting if needed
      link.classList.add('js-link');
      
      // Track external links
      try {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
          const linkHost = new URL(href).hostname;
          const currentHost = window.location.hostname;
          
          if (linkHost !== currentHost) {
            link.classList.add('js-external-link');
          }
        }
      } catch (e) {
        // Silently ignore URL parsing errors
        // Link will still work, just without external link class
      }
    });
  }

  /**
   * Focus Management
   * Enhances keyboard navigation and focus visibility
   * Requirements: 6.1, 8.3
   */
  function initFocusManagement() {
    // Add class to body when user is navigating with keyboard
    let isKeyboardNavigation = false;
    
    document.addEventListener('keydown', function(e) {
      // Detect Tab key for keyboard navigation
      if (e.key === 'Tab' || e.keyCode === 9) {
        isKeyboardNavigation = true;
        document.body.classList.add('js-keyboard-nav');
      }
    });
    
    document.addEventListener('mousedown', function() {
      // Remove keyboard navigation class when mouse is used
      isKeyboardNavigation = false;
      document.body.classList.remove('js-keyboard-nav');
    });
    
    // Enhance focus visibility for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    interactiveElements.forEach(function(element) {
      element.addEventListener('focus', function() {
        if (isKeyboardNavigation) {
          this.classList.add('js-focused');
          // Ensure focus is visible by scrolling element into view if needed
          if (typeof this.scrollIntoView === 'function') {
            this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      });
      
      element.addEventListener('blur', function() {
        this.classList.remove('js-focused');
      });
      
      // Add keyboard navigation indicator for better accessibility
      element.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          // Ensure Enter and Space key interactions work properly
          if (this.tagName === 'A' && e.key === ' ') {
            e.preventDefault();
            this.click();
          }
        }
      });
    });
    
    // Enhance skip link functionality if present
    const skipLinks = document.querySelectorAll('a[href^="#"]');
    skipLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          e.preventDefault();
          target.setAttribute('tabindex', '-1');
          target.focus();
          
          // Remove tabindex after focus to restore natural tab order
          target.addEventListener('blur', function() {
            target.removeAttribute('tabindex');
          }, { once: true });
        }
      });
    });
  }

  // Initialize enhancements
  init();

})();
