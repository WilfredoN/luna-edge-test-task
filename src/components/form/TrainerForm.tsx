import { motion } from 'framer-motion'
import { Controller, useForm } from 'react-hook-form'
import { usePokemonList } from '../../hooks/usePokemonList'
import { usePokemonSelection } from '../../hooks/usePokemonSelection'
import { Pokemon, SelectOption } from '../../types'
import InputField from '../ui/InputField'
import { Select } from '../ui/Select'

interface TrainerFormProps {
  onFormSubmit: (data: { firstName: string; lastName: string; team: Pokemon[] }) => void
}

interface FormValues {
  firstName: string
  lastName: string
  pokemonTeam: SelectOption[]
}

export const TrainerForm = ({ onFormSubmit }: TrainerFormProps) => {
  const { pokemonOptions, loading, loadMorePokemon, searchPokemon } = usePokemonList()

  const { selectedPokemon, handlePokemonSelection } = usePokemonSelection()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      pokemonTeam: [],
    },
  })

  const onSubmit = (data: FormValues) => {
    onFormSubmit({
      firstName: data.firstName,
      lastName: data.lastName,
      team: selectedPokemon,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl rounded-lg bg-gray-800 p-6 shadow-lg"
    >
      <h2 className="mb-6 text-2xl font-bold text-white">Register for Battle Tower</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            label="First Name"
            placeholder="Enter your first name"
            error={errors.firstName?.message}
            {...register('firstName', {
              required: 'First name is required',
              minLength: { value: 2, message: 'Minimum 2 characters' },
              maxLength: { value: 12, message: 'Maximum 12 characters' },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Only letters are allowed',
              },
            })}
          />

          <InputField
            label="Last Name"
            placeholder="Enter your last name"
            error={errors.lastName?.message}
            {...register('lastName', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Minimum 2 characters' },
              maxLength: { value: 12, message: 'Maximum 12 characters' },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Only letters are allowed',
              },
            })}
          />
        </div>

        <div className="mt-4">
          <Controller
            control={control}
            name="pokemonTeam"
            rules={{
              validate: (value) => value.length === 4 || 'You must select exactly 4 Pokémon',
            }}
            render={({ field }) => (
              <Select
                label="Select your Pokémon team"
                options={pokemonOptions}
                value={field.value}
                onChange={(selected) => {
                  field.onChange(selected)
                  handlePokemonSelection(selected)
                }}
                onSearch={searchPokemon}
                maxSelections={4}
                placeholder="Choose 4 Pokémon"
                error={errors.pokemonTeam?.message}
                loading={loading}
                name="pokemonTeam"
                onPaginationEnd={loadMorePokemon}
              />
            )}
          />
        </div>

        <motion.button
          type="submit"
          className="mt-6 w-full rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View My Team
        </motion.button>
      </form>
    </motion.div>
  )
}
