declare module "@mui/material/styles" {
    interface Palette {
        bgcolor: {
            main: string,
            secondary: string,
            contrastText: string
        },
        accent: {
            main: string,
            contrastText: string
        },
        neutral: {
            main: string,
            light: string
        },
        border: {
            main: string
        }
    }
    interface PaletteOptions {
        bgcolor?: {
            main: string,
            secondary: string,
            contrastText: string
        },
        accent?: {
            main: string,
            contrastText: string
        },
        neutral?: {
            main: string,
            light: string
        },
        border?: {
            main: string
        }
    }
}

import "@mui/material/Button";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

import "@mui/material/IconButton";

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    neutral: true;
    accent: true
  }
}

import "@mui/material/Chip";

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    accent: true;
  }
}

import "@mui/material/Typography"

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        span: true
    }
}

import "@mui/material/SvgIcon"

declare module "@mui/material/SvgIcon" {
    interface SvgIconPropsColorOverrides {
        accent: true,
        neutral: true
    }
}