import { defineConfig } from 'windicss/helpers'
// import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  extract: {
    exclude: ['node_modules', '.git'],
  },
  darkMode: 'class',
  safelist: 'p-3 p-4 p-5',
  attributify: {
    prefix: 'w:',
  },
  alias: {
    'hstack': 'flex items-center',
    'vstack': 'flex flex-col',
    'icon': 'w-6 h-6 fill-current',
    'app': 'text-red',
    'app-border': 'border-gray-200 dark:border-dark-300',
  },
  theme: {
    extend: {
      colors: {
        teal: {
          100: '#096',
        },
      },
    },
  },
  // plugins: [formsPlugin],
})