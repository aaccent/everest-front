import type { Config } from 'tailwindcss'
import { filters, miscUtilities, pseudoUtilities, scrollbarUtilities } from './tailwind/utils'
// noinspection ES6PreferShortImport
import { ICONS, ICONS_NAME } from './src/globals/icons'

export function adaptiveFz(value: number, min = 1, max = 20, mod = 10) {
  return `clamp(${min}rem, calc(${value} * ${mod} * var(--screen-delta) + ${value}rem), ${max}rem)`
}

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontSize: {
      'header-100_desktop': [
        adaptiveFz(9),
        {
          lineHeight: '100%',
          letterSpacing: '3px',
        },
      ],
      'header-100_mobile': [
        adaptiveFz(5.4),
        {
          lineHeight: '100%',
          letterSpacing: '2px',
        },
      ],

      'header-200_desktop': [
        adaptiveFz(6.2),
        {
          lineHeight: '100%',
          letterSpacing: '3px',
        },
      ],
      'header-200_mobile': [
        adaptiveFz(4),
        {
          lineHeight: '100%',
          letterSpacing: '1.5px',
        },
      ],

      'header-300_desktop': [
        adaptiveFz(5),
        {
          lineHeight: '100%',
          letterSpacing: '.01em',
        },
      ],
      'header-300_mobile': [
        adaptiveFz(3.2),
        {
          lineHeight: '90%',
          letterSpacing: '1px',
        },
      ],

      'header-400_desktop': [
        adaptiveFz(3.8),
        {
          lineHeight: '100%',
        },
      ],
      'header-400_mobile': [
        adaptiveFz(2.6),
        {
          lineHeight: '100%',
        },
      ],

      'header-500_desktop': [
        adaptiveFz(3),
        {
          lineHeight: '100%',
        },
      ],
      'header-500_mobile': [
        adaptiveFz(2.2),
        {
          lineHeight: '100%',
        },
      ],

      'base-100-reg-100_desktop': [
        adaptiveFz(2.2),
        {
          lineHeight: '115%',
          letterSpacing: '.01em',
        },
      ],
      'base-100-reg-100_mobile': [
        adaptiveFz(1.8),
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
        },
      ],

      'base-100-lg-100_desktop': [
        adaptiveFz(2.2),
        {
          lineHeight: '115%',
          letterSpacing: '1px',
          fontWeight: 300,
        },
      ],
      'base-100-lg-100_mobile': [
        adaptiveFz(1.8),
        {
          lineHeight: '120%',
          letterSpacing: '1px',
          fontWeight: 300,
        },
      ],

      'base-200-med-100_desktop': [
        '1.8rem',
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
          fontWeight: 500,
        },
      ],
      'base-200-med-100_mobile': [
        adaptiveFz(1.6),
        {
          lineHeight: '130%',
          letterSpacing: '.01em',
          fontWeight: 500,
        },
      ],

      'base-200-lg-100_desktop': [
        adaptiveFz(1.8),
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
          fontWeight: 300,
        },
      ],
      'base-200-lg-100_mobile': [
        adaptiveFz(1.6),
        {
          lineHeight: '130%',
          letterSpacing: '.01em',
          fontWeight: 300,
        },
      ],

      'base-300-reg-100-upper_desktop': [
        adaptiveFz(1.6),
        {
          lineHeight: '130%',
          letterSpacing: '.01em',
        },
      ],
      'base-300-reg-100-upper_mobile': [
        adaptiveFz(1.4),
        {
          lineHeight: '130%',
          letterSpacing: '.01em',
        },
      ],

      'base-300-reg-200_desktop': [
        adaptiveFz(1.6),
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
        },
      ],
      'base-300-reg-200_mobile': [
        adaptiveFz(1.4),
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
        },
      ],

      'base-300-lg-100_desktop': [
        adaptiveFz(1.6),
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
          fontWeight: 300,
        },
      ],
      'base-300-lg-100_mobile': [
        adaptiveFz(1.4),
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
          fontWeight: 300,
        },
      ],

      'base-400-reg-100_desktop': [
        adaptiveFz(1.4),
        {
          lineHeight: '130%',
          letterSpacing: '.01em',
        },
      ],
      'base-400-reg-100_mobile': [
        adaptiveFz(1.2),
        {
          lineHeight: '130%',
          letterSpacing: '.01em',
        },
      ],

      'base-400-lg-100_desktop': [
        adaptiveFz(1.4),
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
          fontWeight: 300,
        },
      ],
      'base-400-lg-100_mobile': [
        adaptiveFz(1.2),
        {
          lineHeight: '120%',
          letterSpacing: '.01em',
          fontWeight: 300,
        },
      ],

      'base-500-reg-100-upper_desktop': [
        adaptiveFz(1.2),
        {
          lineHeight: '140%',
          letterSpacing: '.01em',
        },
      ],
      'base-500-reg-100-upper_mobile': [
        adaptiveFz(1),
        {
          lineHeight: '140%',
          letterSpacing: '.01em',
        },
      ],

      'base-500-reg-200_desktop': [
        adaptiveFz(1.2),
        {
          lineHeight: '130%',
          letterSpacing: '.01em',
        },
      ],
      'base-500-reg-200_mobile': [
        adaptiveFz(1),
        {
          lineHeight: '130%',
          letterSpacing: '.01em',
        },
      ],
    },
    colors: {
      base: {
        100: 'hsl(0, 0%, 100%)',
        115: 'hsla(0, 0%, 100%, 0.15)',
        150: 'hsla(0, 0%, 100%, 0.5)',
        200: 'hsl(0, 0%, 96%)',
        300: 'hsl(0, 0%, 95%)',
        400: 'hsl(0, 0%, 89%)',
        500: 'hsl(0, 0%, 74%)',
        600: 'hsl(0, 0%, 17%)',
        650: 'hsla(0, 0%, 17%, 0.5)',
      },
      primary: 'hsl(173, 31%, 35%)',
      primaryHover: 'hsla(173, 40%, 27%, 1)',
      system: {
        red: 'hsl(0, 72%, 39%)',
        green: 'hsl(137, 71%, 31%)',
        disabled: 'hsla(173, 66%, 45%, 1)',
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
  plugins: [filters, scrollbarUtilities, pseudoUtilities, miscUtilities],
  safelist: [
    {
      pattern: /bg-icon-\w+/,
      variants: ['after', 'before'],
    },
  ],
}
export default config
