/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-tertiary": "#ffffff",
        "tertiary": "#000000",
        "surface-container-high": "#eae7e9",
        "on-tertiary-fixed-variant": "#2f2ebe",
        "on-secondary-fixed-variant": "#38485d",
        "on-primary-fixed-variant": "#3f465c",
        "surface-container-low": "#f6f3f5",
        "secondary": "#505f76",
        "surface-container-lowest": "#ffffff",
        "on-primary": "#ffffff",
        "inverse-on-surface": "#f3f0f2",
        "on-background": "#1b1b1d",
        "error-container": "#ffdad6",
        "surface-container": "#f0edef",
        "background": "#fcf8fa",
        "secondary-fixed": "#d3e4fe",
        "secondary-container": "#d0e1fb",
        "on-error": "#ffffff",
        "tertiary-fixed-dim": "#c0c1ff",
        "secondary-fixed-dim": "#b7c8e1",
        "on-error-container": "#93000a",
        "on-secondary-fixed": "#0b1c30",
        "outline": "#76777d",
        "primary-fixed-dim": "#bec6e0",
        "surface-tint": "#565e74",
        "surface-variant": "#e4e2e4",
        "on-secondary-container": "#54647a",
        "inverse-primary": "#bec6e0",
        "surface-container-highest": "#e4e2e4",
        "on-surface-variant": "#45464d",
        "on-primary-container": "#7c839b",
        "on-secondary": "#ffffff",
        "on-tertiary-container": "#7073ff",
        "primary-container": "#131b2e",
        "inverse-surface": "#303032",
        "on-primary-fixed": "#131b2e",
        "on-surface": "#1b1b1d",
        "outline-variant": "#c6c6cd",
        "on-tertiary-fixed": "#07006c",
        "tertiary-fixed": "#e1e0ff",
        "primary-fixed": "#dbe2f9",
        "primary": "#000000",
        "surface-bright": "#fcf8fa"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "sm": "1rem",
        "xl": "4rem",
        "base": "4px",
        "sidebar-width": "280px",
        "gutter": "24px",
        "xs": "0.5rem",
        "md": "1.5rem",
        "lg": "2.5rem"
      },
      fontFamily: {
        "headline-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "headline-xl": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"]
      },
      fontSize: {
        "headline-lg": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
        "headline-md": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
        "headline-xl": ["36px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-md": ["14px", {"lineHeight": "1.5", "fontWeight": "400"}],
        "label-md": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "body-lg": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
