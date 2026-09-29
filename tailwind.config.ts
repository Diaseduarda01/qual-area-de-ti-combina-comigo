import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        border: "hsl(var(--border))",
        // limite de componente clicável: 3:1, exigência da WCAG 1.4.11
        "border-strong": "hsl(var(--border-strong))",
        muted: "hsl(var(--muted-foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          ink: "hsl(var(--primary-ink))",
          display: "hsl(var(--primary-display))",
        },
        ink: {
          DEFAULT: "hsl(var(--ink))",
          foreground: "hsl(var(--ink-foreground))",
          muted: "hsl(var(--ink-muted))",
          border: "hsl(var(--ink-border))",
        },
      },
      fontSize: {
        // mesma escala editorial do portfolio: cresce com a viewport sem media query
        display: ["clamp(2.5rem, 9vw, 5rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        title: ["clamp(1.75rem, 5vw, 2.75rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        subtitle: ["clamp(1.35rem, 3.6vw, 1.9rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        lede: ["clamp(1rem, 1.8vw, 1.15rem)", { lineHeight: "1.55", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.25rem",
      },
      maxWidth: {
        quiz: "44rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
