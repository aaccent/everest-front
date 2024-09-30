import plugin from 'tailwindcss/plugin'

export const filters = plugin(function ({ addUtilities }) {
  addUtilities({
    '.filter-primary': {
      filter:
        'brightness(0) saturate(100%) invert(39%) sepia(61%) saturate(313%) hue-rotate(124deg) brightness(89%) contrast(83%)',
    },
    '.filter-base-600': {
      filter:
        'brightness(0) saturate(100%) invert(16%) sepia(17%) saturate(0%) hue-rotate(174deg) brightness(75%) contrast(86%)',
    },
    '.filter-base-100': {
      filter:
        'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(169deg) brightness(107%) contrast(103%)',
    },
    '.filter-base-500': {
      filter:
        'brightness(0) saturate(100%) invert(79%) sepia(0%) saturate(0%) hue-rotate(233deg) brightness(96%) contrast(94%)',
    },
    '.filter-system-disabled': {
      filter:
        'brightness(0) saturate(100%) invert(63%) sepia(12%) saturate(2257%) hue-rotate(124deg) brightness(97%) contrast(93%)',
    },
    '.filter-base-650': {
      filter:
        'brightness(0) saturate(100%) invert(100%) sepia(4%) saturate(119%) hue-rotate(329deg) brightness(116%) contrast(93%)',
    },
  })
})

export const scrollbarUtilities = plugin(function ({ addUtilities, theme }) {
  addUtilities({
    '.scrollbar-transparent': {
      scrollbarWidth: 'none',

      '&::-webkit-scrollbar': {
        width: '0',
        height: '0',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
    },
    '.scrollbar-custom': {
      '&::-webkit-scrollbar': {
        width: '2px',
        height: '2px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme('colors.base.500'),
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: theme('colors.base.400'),
      },
    },
    '.scrollbar-custom-wide': {
      '&::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme('colors.base.500'),
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: theme('colors.base.400'),
      },
    },
  })
})
export const inputRangeTrackUtilities = plugin(function ({ addUtilities }) {
  addUtilities({
    '.track-transparent': {
      position: 'absolute',
      pointerEvents: 'none',
      appearance: 'none',
      width: '100%',
      opacity: '0',
      zIndex: '3',
      padding: '0',
      top: '0',
      bottom: '0',

      '&::-ms-track': {
        appearance: 'none',
        background: 'transparent',
        border: 'transparent',
      },
      '&::-moz-range-track': {
        appearance: 'none',
        background: 'transparent',
        border: 'transparent',
      },
      '&:focus::-webkit-slider-runnable-track': {
        appearance: 'none',
        background: 'transparent',
        border: 'transparent',
      },
      '&::-ms-thumb': {
        appearance: 'none',
        pointerEvents: 'all',
        borderRadius: '0px',
        border: '0 none',
        cursor: 'pointer',
        zIndex: '5',
        width: '12px',
        height: '12px',
      },
      '&::-moz-range-thumb': {
        appearance: 'none',
        pointerEvents: 'all',
        borderRadius: '0px',
        border: '0 none',
        cursor: 'pointer',
        zIndex: '5',
        width: '12px',
        height: '12px',
      },
      '&::-webkit-slider-thumb': {
        appearance: 'none',
        pointerEvents: 'all',
        borderRadius: '0px',
        border: '0 none',
        cursor: 'pointer',
        zIndex: '5',
        width: '12px',
        height: '12px',
      },
    },
  })
})

export const customVariants = plugin(function ({ addVariant, matchVariant }) {
  addVariant('pseudo', ['&::before', '&::after'])
  matchVariant('group-peer', function (value, { modifier }) {
    return modifier ? `${value} ~ :merge(.group\\/${modifier}) &` : `${value} ~ :merge(.group) &`
  })
  matchVariant('peer-any-parent', function (value, { modifier }) {
    return modifier ? `:merge(.peer\\/${modifier})${value} ~ * &` : `:merge(.peer)${value} ~ * &`
  })
  matchVariant('previous-has', function (value, { modifier }) {
    return modifier ? `:merge(.peer\\/${modifier})${value} + &` : `:merge(.peer)${value} + &`
  })
  addVariant('scroll-btn-yt', ['&::-webkit-scrollbar-button:single-button:vertical:decrement'])
  addVariant('scroll-btn-yb', ['&::-webkit-scrollbar-button:single-button:vertical:increment'])
})

export const miscUtilities = plugin(function ({ matchUtilities, theme }) {
  matchUtilities({
    circle: (value) => ({
      width: value,
      height: value,
      'border-radius': '50%',
      overflow: 'hidden',
    }),
  })
  matchUtilities(
    {
      'bg-default': (value) => ({
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-size': value,
      }),
    },
    { values: theme('bg-size') },
  )
  matchUtilities({
    thumb: () => ({
      appearance: 'none',
      pointerEvents: 'all',
      borderRadius: '0px',
      border: '0 none',
      cursor: 'grab',
      zIndex: '5',
      width: '12px',
      height: '12px',
    }),
  })
})
