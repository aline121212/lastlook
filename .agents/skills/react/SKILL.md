---
name: react
description: >
  React development standards for this project. Enforces component architecture,
  service/hook/store pattern, design system rules, and aesthetic direction.
  Use when building new components, views, services, hooks, or any UI work.
  Triggers on: "create component", "add feature", "build UI", "new page", "new view", /react.
---

## Always

- Use reusable components. Never repeat component code more than once.
- Use user-friendly language.
- Use attractive, professional fonts (serious + modern).
- Use attractive color palettes.

## Project Structure

```
src/components/ui/file.tsx           - Primitive components (input, button, dropdown, tabs, modal)
src/components/navigation/file.tsx   - Navigation (sidebar, navbar, header, footer)
src/components/forms/file.tsx        - Specific forms
src/components/cards/file.tsx        - Info display cards
src/components/modals/file.tsx       - Composite/reusable modals
src/components/<feature>/file.tsx    - Feature-specific components
src/layouts/file.tsx                 - Layouts wrapping multiple children (router outlet, sidebars, global components)
src/services/file.ts                 - Backend services (mocked by default unless requested)
src/stores/file.store.ts             - App state storage
src/hooks/useHook.ts                 - React hooks
src/lib/...                          - Shared: http clients, types/, utils/
src/views/parent/child.tsx           - Routes: views/view-name.tsx or views/parent/child.tsx
src/router.tsx                       - React Router: routes + layouts
```

## Service / Hook / Store Pattern

- Services connect to backend (or mock). Accept DTOs as args. Return strongly-typed data. Use shared client. Client handles auth.
- Stores maintain app state + server objects in memory. Feature-scoped — no monolithic global store. Cross-feature state through shared root store.
- All async calls handle loading/success/error. Hooks expose: `...data`, `isLoading`, `error`, `refetch()`.
- Components/views consume hooks only — never services or stores directly.
- Hook calls service → updates store → returns reactive store state.
- Hooks initialize store state once on mount; refresh only when needed.

## Component Architecture

### Layer order
Primitive → Composite UI → Feature component → View. Never mix layers.

- **Primitive**: Pure visual logic + state styling. No business logic.
- **Composite UI**: Composed of primitives. No business logic.
- **Feature component**: Connects to hooks.
- **View**: Connects features + layout.

### Primitives must support
- Variants (visual style)
- Sizes
- States: default, disabled, loading (if actionable), error (if input), success (when relevant)

### Variants — use CVA or equivalent
```tsx
// WRONG
className={isPrimary ? "bg-black" : "bg-gray"}

// RIGHT — centralized, typed CVA variant
```
Variants define: visual intent (primary/secondary/destructive/etc.), size, state modifiers. No inline conditionals for styling. No duplicated class logic.

### Loading state rules
- Disables interaction
- Shows visual feedback
- Preserves layout width (no shift)
- Never remove button content — prefer inline spinner + label

### Async interaction
- Component accepts `loading` and `disabled` props
- Never manages API logic internally
- Async state lives in hooks/store — UI is dumb

### Loading UI
- Never render empty space while loading
- Skeletons for structural loading; spinner for small inline actions
- Skeletons: approximate final layout, no layout shift, neutral bg, reusable

### Composition
- Composable, don't assume layout context, don't hardcode external margins
- Button defines padding. Card defines padding. Layout defines margin.

### Accessibility
- Correct semantic HTML
- Respect disabled state
- Keyboard navigation
- aria attributes when needed
- Visible focus styles — never remove outlines without replacing them

### Design consistency
- Consistent border-radius, spacing, typography, transition timing scales
- Never invent inline spacing values — all tokens from design system scale

### Other
- Inputs: support controlled and uncontrolled, never mix both
- Reusable components support `as`/`asChild` polymorphic pattern
- Animations: purposeful, non-distracting, respect `prefers-reduced-motion`
- Pattern appears 2+ times → must become component
- If component grows complex or repeats structural logic → refactor before continuing

## Design Strategy

### Before writing code — define design thesis

**Purpose:** What problem? Who is user? What emotional response? Efficient / inspiring / authoritative / playful / calm / intense?

**Context:** Dashboard / SaaS / landing page / internal tool? Bold or restrained? Consumer or enterprise? Experimental or structured?

**Constraints:** Stack, performance, accessibility, maintainability.

### Aesthetic direction — pick one, commit
Brutally minimal · Editorial · Industrial/utilitarian · Luxury/refined · Playful · Retro-futuristic · Organic · Art deco/geometric · Brutalist/raw · Soft/pastel · Controlled maximalism

Clarity of identity > visual intensity. Bold maximalism and refined minimalism equally valid — precision and internal consistency matter most.

### Differentiation
Every design needs one defining visual idea. Typography? Spatial structure? Color contrast? Motion? Compositional tension? Must feel intentional, not templated.

### Typography
- Distinctive, context-appropriate typefaces
- Strong display + refined readable body pairing
- Clear hierarchy, rhythm, spacing, alignment discipline

### Color
- Coherent system using CSS variables
- Dominant tones + controlled accents
- Light and dark themes feel intentional — not inverted defaults
- Avoid generic SaaS gradients and cliché AI color schemes

### Motion
- Purposeful and restrained
- Reinforce hierarchy and feedback
- One orchestrated entrance > scattered micro-interactions
- Respect `prefers-reduced-motion`

### Spatial composition
- Use asymmetry intentionally
- Explore density vs negative space
- Break grids carefully and with purpose
- Maintain structural clarity even in experimental layouts

### Avoid
- Predictable purple SaaS gradients
- Generic dashboards
- Overused font pairings
- Cookie-cutter layouts
- Contextless glassmorphism
- Design patterns without conceptual grounding

### Complexity alignment
- Minimalist → restraint + typographic precision
- Maximalist → deliberate structure + controlled intensity
- Elegance from disciplined execution, not visual excess
