import { TrainerForm } from './components/form/TrainerForm'
import { MainLayout } from './components/layout/MainLayout'
import { PageHeader } from './components/layout/PageHeader'
import { PokemonTeamModal } from './components/pokemon/PokemonTeamModal'
import { useTrainerForm } from './hooks/useTrainerForm'

function App() {
  const { showModal, setShowModal, formData, handleFormSubmit } = useTrainerForm()

  return (
    <MainLayout>
      <PageHeader
        title="Pokémon Trainer Registration"
        subtitle="Register yourself and build your team for the Battle Tower"
      />

      <TrainerForm onFormSubmit={handleFormSubmit} />

      {showModal && (
        <PokemonTeamModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          trainerName={`${formData.firstName} ${formData.lastName}`}
          pokemonTeam={formData.team}
        />
      )}
    </MainLayout>
  )
}

export default App
