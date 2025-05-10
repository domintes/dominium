# React + Vite
# NOT USE TypeScript, not .tsx.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Styling Guide

The project uses SCSS for styling with the following conventions:

### File Structure
- All component-specific styles are in `.scss` files next to their components
- Global styles are in `src/styles/`
- Common/shared styles are in `src/styles/components.scss`

### Naming Conventions
We use BEM (Block Element Modifier) methodology:

```scss
.block {
  // Block styles

  &__element {
    // Element styles
  }

  &--modifier {
    // Modifier styles
  }
}
```

Example:
```scss
.tags {
  &__list { /* Styles for list */ }
  &__tag { 
    /* Base tag styles */
    &--selected { /* Selected state */ }
  }
}
```

### Colors
The project uses a consistent color palette defined in variables:
- Primary: #00f3ff (Cyan)
- Background: #0a0f2c (Dark Blue)
- Text: #ffffff (White)
- Accents: Various shades of blue (#2563eb, #3b82f6, etc.)

### Component Structure
Each component should have:
1. Its own SCSS file using BEM notation
2. Styles scoped to the component's root class
3. Responsive design considerations
4. State-based styles (hover, active, disabled, etc.)

### Best Practices
- Use SCSS nesting for better organization
- Keep selectors shallow (max 3 levels)
- Use variables for repeated values
- Write responsive styles using mixins
- Avoid !important
- Use relative units (rem, em) over pixels when possible

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
