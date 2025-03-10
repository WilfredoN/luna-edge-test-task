import { XMarkIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { Pokemon } from '../../types';

interface PokemonTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainerName: string;
  pokemonTeam: Pokemon[];
}

export const PokemonTeamModal = ({ isOpen, onClose, trainerName, pokemonTeam }: PokemonTeamModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Trainer {trainerName}'s Team
                </h2>
                <p className="text-gray-300 mt-1">Ready for the Battle Tower!</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pokemonTeam.map((pokemon) => (
                  <motion.div
                    key={pokemon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center bg-gray-700 p-4 rounded-lg"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img 
                        src={pokemon.image} 
                        alt={pokemon.name} 
                        className="w-24 h-24 object-contain" 
                      />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mt-2">
                      {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      {pokemon.types.map((type) => (
                        <span 
                          key={type} 
                          className="px-2 py-1 bg-blue-600 text-xs text-white rounded"
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
                className="mt-6 mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                onClick={onClose}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
