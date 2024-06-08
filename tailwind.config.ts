import { Gwendolyn } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        animatetop: {
          '0%': { top: '-300px', opacity: '0' },
          '100%': { top: '0', opacity: '1' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale3d(0.3, 0.3, 0.3)' },
          '50%': { opacity: '1' },
        },
        animate: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1', borderRadius: '0' },
          '100%': { transform: 'translateY(-1000px) rotate(720deg)', opacity: '0', borderRadius: '50%' },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }  
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }  
        }
      },
      animation: {
        animatetop: 'animatetop 1s ease-out',
        zoomIn: 'zoomIn 1s ease-out',
        animate: 'animate 25s linear infinite',
        typing: "typing 3s steps(20) infinite alternate, blink .7s infinite"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Gwendolyn: ["Gwendolyn, sans"]
      }
    },
  },
  plugins: [],
};

export default config;
