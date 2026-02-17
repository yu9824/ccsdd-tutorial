# Research & Design Decisions Template

---
**Purpose**: Capture discovery findings, architectural investigations, and rationale that inform the technical design.

**Usage**:
- Log research activities and outcomes during the discovery phase.
- Document design decision trade-offs that are too detailed for `design.md`.
- Provide references and evidence for future audits or reuse.
---

## Summary
- **Feature**: `blog-styling`
- **Discovery Scope**: Simple Addition (UI/Styling enhancement)
- **Key Findings**:
  - Existing Eleventy setup with public directory passthrough configured
  - No CSS/JS files currently exist; clean slate for styling implementation
  - Templates use semantic HTML structure suitable for styling
  - Pure static files approach (no build tools needed for CSS/JS)

## Research Log

### Eleventy Template Integration
- **Context**: Need to understand how to integrate CSS/JS files into Eleventy templates
- **Sources Consulted**: 
  - Existing `eleventy.config.js` configuration
  - Existing template structure (`base.njk`, `post.njk`, `index.njk`)
- **Findings**: 
  - Eleventy already configured with `addPassthroughCopy("public")` for static assets
  - Templates use Nunjucks syntax for includes and variables
  - `base.njk` is the root layout template that wraps all pages
  - Asset paths should use absolute paths from site root (e.g., `/css/style.css`)
- **Implications**: 
  - CSS/JS files can be placed in `public/css/` and `public/js/` directories
  - References added to `base.njk` will apply to all pages
  - No additional Eleventy configuration needed

### CSS Architecture Approach
- **Context**: Decide between single CSS file vs. modular CSS structure
- **Sources Consulted**: 
  - Gap analysis recommendations
  - Common CSS organization patterns for small-to-medium projects
- **Findings**: 
  - Single file approach is simpler for initial implementation
  - Can be refactored to modules later if complexity grows
  - For blog styling, single file is manageable and reduces HTTP requests
- **Implications**: 
  - Start with single `public/css/style.css` file
  - Organize CSS with clear sections (variables, base, layout, components, responsive)
  - Document refactoring path if modular structure becomes necessary

### Responsive Design Strategy
- **Context**: Define breakpoints and mobile-first approach
- **Sources Consulted**: 
  - Common responsive breakpoint standards
  - Requirements specify: mobile <768px, tablet 768-1024px, desktop >1024px
- **Findings**: 
  - Mobile-first CSS approach is standard practice
  - Breakpoints align with common device sizes
  - Media queries should enhance base mobile styles for larger screens
- **Implications**: 
  - Base styles target mobile devices
  - Tablet and desktop styles added via media queries
  - Ensure touch targets are appropriately sized for mobile

### JavaScript Enhancement Strategy
- **Context**: Determine which interactive features to implement
- **Sources Consulted**: 
  - Requirements specify optional JavaScript enhancements
  - Gap analysis recommends vanilla JavaScript (no dependencies)
- **Findings**: 
  - Smooth scrolling is simple enhancement
  - Menu toggle not needed initially (no navigation menu)
  - Theme switching can be deferred to future enhancement
  - Graceful degradation important (site should work without JS)
- **Implications**: 
  - Start with minimal JavaScript (smooth scrolling if needed)
  - Use vanilla JavaScript, no external libraries
  - Ensure all functionality works without JavaScript enabled

### Accessibility Considerations
- **Context**: Ensure styling meets accessibility standards
- **Sources Consulted**: 
  - WCAG contrast ratio requirements
  - Semantic HTML already in place
- **Findings**: 
  - Color contrast ratios must meet WCAG AA standards (4.5:1 for normal text)
  - Focus states must be visible for keyboard navigation
  - Semantic HTML structure already supports accessibility
- **Implications**: 
  - Color scheme must be tested for contrast ratios
  - Focus styles required for all interactive elements
  - Maintain semantic HTML structure in templates

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Single CSS File | All styles in one `style.css` file | Simple, fewer HTTP requests, easy to maintain initially | Can become large, harder to navigate as it grows | Recommended for initial implementation |
| Modular CSS | Separate files for base, layout, components, responsive | Better organization, easier to find specific styles | More HTTP requests, more complex initial setup | Can refactor to this later if needed |
| CSS Framework | Use external framework (Bootstrap, Tailwind) | Fast implementation, consistent design | Adds dependency, may be overkill for simple blog | Not recommended for this simple blog |

## Design Decisions

### Decision: Single CSS File Architecture
- **Context**: Need to organize CSS styles for maintainability while keeping initial implementation simple
- **Alternatives Considered**:
  1. Modular CSS files (base.css, layout.css, components.css, responsive.css) — better organization but more complex
  2. CSS Framework (Bootstrap, Tailwind) — fast but adds dependency
- **Selected Approach**: Single `public/css/style.css` file organized with clear sections
- **Rationale**: 
  - Simplest implementation path
  - Reduces HTTP requests (single file)
  - Easy to refactor to modules later if complexity grows
  - Aligns with gap analysis recommendation
- **Trade-offs**: 
  - ✅ Simple initial setup
  - ✅ Fewer HTTP requests
  - ❌ May become harder to navigate as file grows
  - ✅ Can refactor later if needed
- **Follow-up**: Monitor file size; consider modular structure if CSS exceeds ~500 lines

### Decision: Vanilla JavaScript
- **Context**: Need to add optional interactive enhancements without adding dependencies
- **Alternatives Considered**:
  1. JavaScript framework/library (jQuery, Alpine.js) — easier DOM manipulation but adds dependency
  2. TypeScript — type safety but requires build step
- **Selected Approach**: Vanilla JavaScript in single `public/js/main.js` file
- **Rationale**: 
  - No build tools needed
  - No external dependencies
  - Simple enhancements don't require framework
  - Graceful degradation easier with vanilla JS
- **Trade-offs**: 
  - ✅ No dependencies
  - ✅ Simple implementation
  - ❌ More verbose DOM manipulation
  - ✅ Works without build step
- **Follow-up**: Consider adding framework if JavaScript complexity grows significantly

### Decision: Mobile-First Responsive Design
- **Context**: Need responsive design that works across device sizes
- **Alternatives Considered**:
  1. Desktop-first approach — start with desktop styles, scale down
  2. Mobile-first approach — start with mobile styles, enhance for larger screens
- **Selected Approach**: Mobile-first CSS with media queries for tablet and desktop
- **Rationale**: 
  - Standard best practice
  - Better performance (mobile devices load fewer styles initially)
  - Easier to progressively enhance
  - Aligns with modern web development practices
- **Trade-offs**: 
  - ✅ Better mobile performance
  - ✅ Progressive enhancement pattern
  - ✅ Standard industry practice
  - ❌ Requires thinking mobile-first (not a significant downside)
- **Follow-up**: Test on actual mobile devices to verify responsive behavior

## Risks & Mitigations
- **Risk**: CSS file becomes too large and hard to maintain — **Mitigation**: Document refactoring path to modular structure; monitor file size
- **Risk**: Color contrast doesn't meet accessibility standards — **Mitigation**: Test color combinations with contrast checker tools before implementation
- **Risk**: Responsive breakpoints don't work well on all devices — **Mitigation**: Test on multiple device sizes; use flexible units (rem, em, %) instead of fixed pixels
- **Risk**: JavaScript breaks site functionality if disabled — **Mitigation**: Ensure all core functionality works without JavaScript; JS only enhances experience

## References
- [Eleventy Documentation](https://www.11ty.dev/docs/) — Static site generator documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) — Accessibility standards for color contrast and focus states
- [MDN CSS Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries) — Responsive design reference
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) — CSS variables for theming
