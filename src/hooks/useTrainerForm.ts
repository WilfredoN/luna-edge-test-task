import { useState } from 'react';
import { Pokemon } from '../types';

interface TrainerFormData {
  firstName: string;
  lastName: string;
  team: Pokemon[];
}

export const useTrainerForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<TrainerFormData>({
    firstName: '',
    lastName: '',
    team: []
  });

  const handleFormSubmit = (data: TrainerFormData) => {
    setFormData(data);
    setShowModal(true);
  };

  return {
    showModal,
    setShowModal,
    formData,
    handleFormSubmit
  };
};
