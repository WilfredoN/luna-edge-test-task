import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from '../components/ui/Select'
import '../index.css'
import { SelectOption } from '../types'
// Mock Pokemon data for examples
const pokemonOptions: SelectOption[] = [
  {
    value: '1',
    label: 'Bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    value: '4',
    label: 'Charmander',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  {
    value: '7',
    label: 'Squirtle',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
  {
    value: '25',
    label: 'Pikachu',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  {
    value: '39',
    label: 'Jigglypuff',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',
  },
  {
    value: '52',
    label: 'Meowth',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png',
  },
  {
    value: '54',
    label: 'Psyduck',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png',
  },
  {
    value: '133',
    label: 'Eevee',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
  },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Select component allows users to select multiple Pokémon with images from a dropdown list.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of options to display in the dropdown',
      control: 'object',
    },
    value: {
      description: 'Currently selected options',
      control: 'object',
    },
    onChange: {
      description: 'Function called when selection changes',
      action: 'selection changed',
    },
    onSearch: {
      description: 'Function called when search input changes',
      action: 'search changed',
    },
    label: {
      description: 'Label text for the select component',
      control: 'text',
    },
    placeholder: {
      description: 'Placeholder text when no option is selected',
      control: 'text',
    },
    error: {
      description: 'Error message to display',
      control: 'text',
    },
    maxSelections: {
      description: 'Maximum number of selectable options',
      control: { type: 'number', min: 1, max: 10 },
    },
    loading: {
      description: 'Whether the component is in loading state',
      control: 'boolean',
    },
    name: {
      description: 'Name attribute for the form element',
      control: 'text',
    },
    onPaginationEnd: {
      description: 'Function called when user scrolls to the bottom of options',
      action: 'reached pagination end',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    options: pokemonOptions,
    value: [],
    label: 'Select Pokémon',
    placeholder: 'Choose your team...',
    name: 'pokemon-select',
    maxSelections: 4,
  },
  render: (args) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])

    return (
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6">
        <Select
          {...args}
          value={selectedOptions}
          onChange={(newValue) => {
            setSelectedOptions(newValue)
          }}
        />
      </div>
    )
  },
}

// Pre-selected options example
export const WithPreselectedOptions: Story = {
  args: {
    options: pokemonOptions,
    label: 'Select Pokémon',
    placeholder: 'Choose your team...',
    name: 'pokemon-select-preselected',
    maxSelections: 4,
  },
  render: (args) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([
      pokemonOptions[0],
      pokemonOptions[3],
    ])

    return (
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6">
        <Select {...args} value={selectedOptions} onChange={setSelectedOptions} />
        <div className="mt-4 text-sm text-gray-300">Bulbasaur and Pikachu are pre-selected</div>
      </div>
    )
  },
}

// Error state example
export const WithError: Story = {
  args: {
    options: pokemonOptions,
    label: 'Select Pokémon',
    placeholder: 'Choose your team...',
    name: 'pokemon-select-error',
    error: 'You must select exactly 4 Pokémon for your team',
    maxSelections: 4,
  },
  render: (args) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([pokemonOptions[0]])

    return (
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6">
        <Select {...args} value={selectedOptions} onChange={setSelectedOptions} />
      </div>
    )
  },
}

// Max selections example
export const MaxSelectionsReached: Story = {
  args: {
    options: pokemonOptions,
    label: 'Select Pokémon',
    placeholder: 'Choose your team...',
    name: 'pokemon-select-max',
    maxSelections: 4,
  },
  render: (args) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([
      pokemonOptions[0],
      pokemonOptions[1],
      pokemonOptions[2],
      pokemonOptions[3],
    ])

    return (
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6">
        <Select {...args} value={selectedOptions} onChange={setSelectedOptions} />
        <div className="mt-4 text-sm text-gray-300">Maximum of 4 Pokémon already selected</div>
      </div>
    )
  },
}

// Loading state example
export const Loading: Story = {
  args: {
    options: [],
    value: [],
    label: 'Select Pokémon',
    placeholder: 'Loading Pokémon...',
    name: 'pokemon-select-loading',
    loading: true,
    maxSelections: 4,
  },
  render: (args) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])

    return (
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6">
        <Select {...args} value={selectedOptions} onChange={setSelectedOptions} />
      </div>
    )
  },
}

// Search functionality example
export const SearchFunctionality: Story = {
  args: {
    options: pokemonOptions,
    label: 'Search Pokémon',
    placeholder: 'Type to search...',
    name: 'pokemon-select-search',
    maxSelections: 4,
  },
  render: (args) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])
    const [filteredOptions, setFilteredOptions] = useState(pokemonOptions)

    const handleSearch = (query: string) => {
      const filtered = pokemonOptions.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredOptions(filtered)
    }

    return (
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6">
        <Select
          {...args}
          options={filteredOptions}
          value={selectedOptions}
          onChange={setSelectedOptions}
          onSearch={handleSearch}
        />
        <div className="mt-4 text-sm text-gray-300">Try typing "chu" to filter for Pikachu</div>
      </div>
    )
  },
}

// Example with pagination simulation
export const WithPagination: Story = {
  args: {
    options: pokemonOptions.slice(0, 3),
    label: 'Paginated Pokémon List',
    placeholder: 'Scroll to load more...',
    name: 'pokemon-select-pagination',
    maxSelections: 4,
  },
  render: (args) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])
    const [options, setOptions] = useState(pokemonOptions.slice(0, 3))
    const [isLoading, setIsLoading] = useState(false)

    const handlePaginationEnd = () => {
      if (options.length < pokemonOptions.length) {
        setIsLoading(true)
        // Simulate API delay
        setTimeout(() => {
          setOptions([...options, ...pokemonOptions.slice(options.length, options.length + 2)])
          setIsLoading(false)
        }, 1000)
      }
    }

    return (
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6">
        <Select
          {...args}
          options={options}
          loading={isLoading}
          value={selectedOptions}
          onChange={setSelectedOptions}
          onPaginationEnd={handlePaginationEnd}
        />
        <div className="mt-4 text-sm text-gray-300">
          Scroll to the bottom of the dropdown to load more Pokémon
        </div>
      </div>
    )
  },
}
