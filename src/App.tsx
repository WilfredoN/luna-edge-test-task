import { motion } from 'framer-motion';
import { useState } from 'react';
import { TrainerForm } from './components/form/TrainerForm';
import { PokemonTeamModal } from './components/pokemon/PokemonTeamModal';
import { Pokemon } from './types';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<{ firstName: string; lastName: string; team: Pokemon[] }>({
    firstName: '',
    lastName: '',
    team: []
  });

  const handleFormSubmit = (data: { firstName: string; lastName: string; team: Pokemon[] }) => {
    setFormData(data);
    setShowModal(true);
  };

  return (
    <main className="bg-gradient-to-b from-gray-800 to-gray-900 w-screen h-screen p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div 
          className="flex flex-col items-center justify-center py-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Pokémon Trainer Registration</h1>
          <p className="text-gray-300 mb-8">Register yourself and build your team for the Battle Tower</p>
          
          <TrainerForm onFormSubmit={handleFormSubmit} />
          
          {showModal && (
            <PokemonTeamModal 
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              trainerName={`${formData.firstName} ${formData.lastName}`}
              pokemonTeam={formData.team}
            />
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}

export default App;
