import type { Config } from 'tailwindcss'
import { filters, scrollbarUtilities } from './tailwind/utils'
// noinspection ES6PreferShortImport
import { ICONS, ICONS_NAME } from './src/globals/icons'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontSize: {
      'header-100': [
        '9rem',
        {
          lineHeight: '100%',
          letterSpacing: '3px',
        },
      ],
      'header-200': [
        '6.2rem',
        {
          lineHeight: '100%',
          letterSpacing: '3px',
        },
      ],

      'header-300': [
        '5rem',
        {
          lineHeight: '100%',
          letterSpacing: '.01em',
        },
      ],

      'header-400': [
        '3.8rem',
        {
          lineHeight: '100%',
        },
      ],

      'header-500': [
        '3rem',
        {
          lineHeight: '100%',
        },
      ],
      'base-100-reg-100': [
        '2.2rem',
        {
          lineHeight: '115%',
          letterSpacing: '.01em',
        },
      ],
      'base-100-lg-100': [
        '2.2rem',
        {
          lineHeight: '115%',
          letterSpacing: '.01em',
          fontWeight: 300,
        },
      ],
      'base-200-med-100': [
        '1.8rem',
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
          fontWeight: 500,
        },
      ],
      'base-200-lg-100': [
        '1.8rem',
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
          fontWeight: 300,
        },
      ],
      'base-300-reg-100-upper': [
        '1.6rem',
        {
          lineHeight: '130%',
          letterSpacing: '.01em',
        },
      ],
      'base-300-reg-200': [
        '1.6rem',
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
        },
      ],
      'base-300-lg-100': [
        '1.6rem',
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
          fontWeight: 300,
        },
      ],
      'base-400-reg-100': [
        '1.4rem',
        {
          lineHeight: '130%',
          letterSpacing: '.01em',
        },
      ],
      'base-400-lg-100': [
        '1.4rem',
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
          fontWeight: 300,
        },
      ],
      'base-500-reg-100-upper': [
        '1.2rem',
        {
          lineHeight: '140%',
          letterSpacing: '.01em',
        },
      ],
      'base-500-reg-200': [
        '1.2rem',
        {
          lineHeight: '130%',
          letterSpacing: '.01em',
        },
      ],
    },

    colors: {
      base: {
        100: 'hsl(0 0 100)',
        115: 'hsla(0 0 100 / 0.15)',
        150: 'hsla(0 0 100 / 0.5)',
        200: 'hsl(0 0 96)',
        300: 'hsl(0 0 95)',
        400: 'hsl(0 0 89)',
        500: 'hsl(0 0 74)',
        600: 'hsl(0 0 17)',
        650: 'hsla(0 0 17 / 0.5)',
      },
      primary: 'hsl(173 31 35)',
      system: {
        red: 'hsl(0 72 39)',
        green: 'hsl(137 71 31)',
      },
    },

    extend: {
      backgroundImage: {
        [ICONS_NAME.LOCATION]: ICONS.LOCATION,
        [ICONS_NAME.PLUS]: ICONS.PLUS,
        [ICONS_NAME.PHONE]: ICONS.PHONE,
        [ICONS_NAME.CATALOG_BTN]: ICONS.CATALOG_BTN,
        [ICONS_NAME.SEARCH]: ICONS.SEARCH,
        [ICONS_NAME.HEART]: ICONS.HEART,
        [ICONS_NAME.SCALE]: ICONS.SCALE,
        [ICONS_NAME.CLOSE]: ICONS.CLOSE,
        [ICONS_NAME.GARAGE]: ICONS.GARAGE,
        [ICONS_NAME.COMMERCE]: ICONS.COMMERCE,
        [ICONS_NAME.TREE]: ICONS.TREE,
        [ICONS_NAME.HOUSE]: ICONS.HOUSE,
        [ICONS_NAME.CLOCK]: ICONS.CLOCK,
        [ICONS_NAME.NEW_HOUSE]: ICONS.NEW_HOUSE,
        [ICONS_NAME.SECONDARY_HOUSE]: ICONS.SECONDARY_HOUSE,
        [ICONS_NAME.ARROW]: ICONS.ARROW,
        [ICONS_NAME.ADDRESS]: ICONS.ADDRESS,
        [ICONS_NAME.LOADING]: ICONS.LOADING,
      },
      fontFamily: {
        geologica: ['var(--font-geologica)'],
        coolvetica: ['var(--font-coolvetica)'],
      },
      transitionProperty: {
        visibility: 'visibility, opacity',
      },
    },
  },
  plugins: [filters, scrollbarUtilities],
  safelist: [
    {
      pattern: /bg-icon-location/,
      variants: ['after', 'before'],
    },
  ],
}
export default config
