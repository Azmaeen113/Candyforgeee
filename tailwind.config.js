/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        fredoka: ["Fredoka", "sans-serif"],
        baloo: ["Baloo 2", "cursive"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      },
      colors: {
        // Candy Forge Primary Colors
        candy: {
          cyan: "#00F5FF",
          pink: "#FF10F0",
          purple: "#B026FF",
          blue: "#0099FF",
          yellow: "#FFE500",
          mint: "#00FFB3"
        },
        // Background Colors
        forge: {
          deep: "#1A0B2E",
          royal: "#2D1B4E",
          navy: "#0A0E27",
          midnight: "#16213E"
        },
        // Candy-specific colors
        cotton: {
          light: "#FFB3E6",
          DEFAULT: "#FF69EB"
        },
        blueberry: {
          light: "#00D9FF",
          DEFAULT: "#0099FF"
        },
        lemon: {
          light: "#FFED4E",
          DEFAULT: "#FFC600"
        },
        grape: {
          light: "#D896FF",
          DEFAULT: "#B026FF"
        },
        orange: {
          light: "#FFB366",
          DEFAULT: "#FF8C00"
        }
      },
      backgroundImage: {
        'candy-gradient': 'linear-gradient(135deg, #00F5FF 0%, #FF10F0 50%, #B026FF 100%)',
        'candy-button': 'linear-gradient(180deg, #FF10F0 0%, #B026FF 100%)',
        'forge-gradient': 'linear-gradient(160deg, #1A0B2E 0%, #2D1B4E 40%, #0A0E27 100%)',
        'reward-glow': 'radial-gradient(circle, #FFE500 0%, #FF10F0 50%, transparent 70%)',
        'card-gradient': 'linear-gradient(145deg, rgba(0,245,255,0.1) 0%, rgba(255,16,240,0.1) 100%)',
        'glass-candy': 'linear-gradient(145deg, rgba(0,245,255,0.1), rgba(255,16,240,0.1))'
      },
      boxShadow: {
        'candy-glow': '0 0 20px rgba(0,245,255,0.4), 0 0 40px rgba(0,245,255,0.2), 0 0 80px rgba(0,245,255,0.1)',
        'pink-glow': '0 0 20px rgba(255,16,240,0.4), 0 0 40px rgba(255,16,240,0.2)',
        'mint-glow': '0 0 24px rgba(0,255,179,0.5), 0 0 48px rgba(0,255,179,0.3)',
        'candy-button': '0 8px 24px rgba(255,16,240,0.4)',
        'candy-card': '0 8px 32px rgba(0,0,0,0.3)'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'rainbow-border': 'rainbowBorder 6s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-out forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        rainbowBorder: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' }
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        sparkle: {
          '0%': { opacity: '1', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)' },
          '100%': { opacity: '0', transform: 'scale(0.5) rotate(360deg)' }
        }
      }
    }
  },
  plugins: []
};
