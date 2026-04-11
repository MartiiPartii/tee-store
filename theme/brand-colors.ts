/**
 * Boutique pastel palette — airy linen neutrals + dusty mauve accent.
 * Single source of truth; synced to :root in layout via cssVariablesBlock.
 */
export const brandPalette = {
    /** Page canvas — warm off-white */
    background: "#F6F4F0",
    /** Cards, sections, elevated surfaces */
    foreground: "#EDE8E2",
    /** Buttons, links, highlights */
    accent: "#9B8AB8",
    /** Hover / pressed for accent UI */
    accentHover: "#8272A3",
    /** Primary text — warm charcoal for strong contrast on pastels */
    text: "#2C2825",
} as const

/** Subtle borders and dividers (theme only; hover uses accentHover) */
export const brandBorder = "#D9D2C9"

/** Injected into layout — the four canonical tokens */
export const cssVariablesBlock = `:root {
  --background: ${brandPalette.background};
  --foreground: ${brandPalette.foreground};
  --accent: ${brandPalette.accent};
  --text: ${brandPalette.text};
}`
