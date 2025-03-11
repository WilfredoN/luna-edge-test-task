import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'
import LunaEdgeLogo from '../src/assets/logos/LunaEdgeLogo.svg'

const theme = create({
  base: 'dark',
  brandTitle: 'Luna Edge',
  brandUrl: '.',
  brandImage: LunaEdgeLogo,
  brandTarget: '_self',
})

addons.setConfig({
  theme,
})
