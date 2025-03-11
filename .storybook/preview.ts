import type { Preview } from '@storybook/react'
import { create } from '@storybook/theming/create'
import LunaEdgeLogo from '../src/assets/logos/LunaEdgeLogo.svg'
import '../src/index.css'

const theme = create({
  base: 'dark',
  brandTitle: 'Luna Edge',
  brandUrl: '.',
  brandImage: LunaEdgeLogo,
  brandTarget: '_self',
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: theme,
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1f2937' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'fullscreen',
  },
}

export default preview
