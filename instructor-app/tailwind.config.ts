import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  safelist: [
    {
      pattern: /grid-cols-./,

    },
    {
      pattern: /grid-rows-./,
    }
  ],
  darkMode: 'media',
  theme: {

  },

    daisyui: {
      themes:[
        {
          mytheme:{
            "primary": "#8781AD", //violet 400
            "secondary": "#F0C4B2", //orange 200
            "accent": "#687AB3",  //update
            "base-100": "#27272a", //neutral 800
            "neutral": "#18181b", //neutral 900
            "info": "#21d7ff",    //update
            "success": "#00b690", //update
            "warning": "#de7200", //update
            "error": "#FE9A9C", //rose 300
          },
        },
      ],
    },

  plugins: [require("daisyui")],
}
export default config
