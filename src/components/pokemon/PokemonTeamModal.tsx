import { XMarkIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { Pokemon } from '../../types'

interface PokemonTeamModalProps {
  isOpen: boolean
  onClose: () => void
  trainerName: string
  pokemonTeam: Pokemon[]
}

export const PokemonTeamModal = ({
  isOpen,
  onClose,
  trainerName,
  pokemonTeam,
}: PokemonTeamModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-opacity-70 fixed inset-0 z-40 flex items-center justify-center bg-black p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-2xl rounded-lg bg-gray-800 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white">Trainer {trainerName}'s Team</h2>
                <p className="mt-1 text-gray-300">Ready for the Battle Tower!</p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {pokemonTeam.map((pokemon) => (
                  <motion.div
                    key={pokemon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center rounded-lg bg-gray-700 p-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="h-24 w-24 object-contain"
                      />
                    </motion.div>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </h3>
                    <div className="mt-1 flex gap-2">
                      {pokemon.types.map((type) => (
                        <span
                          key={type}
                          className="rounded bg-blue-600 px-2 py-1 text-xs text-white"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mx-auto mt-6 block rounded bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
                onClick={onClose}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
