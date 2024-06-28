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
  })
})

export const scrollbarUtilities = plugin(function ({ addUtilities }) {
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
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgb(211, 211, 211) transparent',
      '&::-webkit-scrollbar': {
        width: '2px',
        height: '2px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgb(211, 211, 211)',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
    },
  })
})
