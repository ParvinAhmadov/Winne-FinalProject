import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/featured/**/*.{js,ts,jsx,tsx,mdx}",
    
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        backColor: "#2A3042",
        Textcolor: "#E9ECEF",  
        ItemColor: '#2A3042',
        Fotterbg: "#262B3C",
        Tablebg: "#222736",
        Listtextcolor: "#A6B0CF",
        Listbordercolor: "#32394E",
      },
      fontWeight: {
        'extra-light': '200',
        'extra-bold': '550', 
        'customWeight': '400', 
      },
      keyframes: {
        ringing: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '20%': { transform: 'scale(1) rotate(15deg)' },
          '40%': { transform: 'scale(1) rotate(-17deg)' },
          '60%': { transform: 'scale(1) rotate(15deg)' },
          '80%': { transform: 'scale(1) rotate(-17deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        ringing: 'ringing 0.7s ease-in-out infinite',
        spin: 'spin 2s linear infinite',
      },
      transitionProperty: {
        'transform': 'transform',
      },
      transitionDuration: {
        'default': '500ms',
      },
      transitionTimingFunction: {
        'default': 'ease-in-out',
      },
    },
    animation: {
      'move-stripes': 'move-stripes 2s linear infinite',
    },
  },
  plugins: [],
};
export default config;
