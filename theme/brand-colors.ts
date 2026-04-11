/**
 * Boutique pastel palette — airy linen neutrals + dusty mauve accent.
 * Canonical hex values; app/globals.css maps matching HSL tokens for Tailwind.
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

