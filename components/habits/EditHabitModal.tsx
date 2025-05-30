import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';
import { Habit } from '@/types/habits';
import Button from '../ui/Button';
import CustomModal from '../ui/Modal';
import { useHabits } from '@/context/HabitsContext';

interface EditHabitModalProps {
  habit: Habit;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  updatedHabit: string;
  setUpdatedHabit: (value: string) => void;
}

const EditHabitModal = ({
  habit,
  isModalOpen,
  setIsModalOpen,
  updatedHabit,
  setUpdatedHabit,
}: EditHabitModalProps) => {
  const { updateHabit, deleteHabit } = useHabits();
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const saveUpdatedHabit = () => {
    const newHabit = {
      ...habit,
      name: updatedHabit,
    };

    updateHabit(habit.$id, newHabit);
    setIsModalOpen(false);
  };

  return (
    <>
      <CustomModal visible={isModalOpen} setVisible={setIsModalOpen}>
        <Text className="text-2xl">Edit habit</Text>
        <TextInput
          className="rounded-full border-2 border-brown px-5 py-3 text-lg"
          value={updatedHabit}
          onChangeText={(text) => setUpdatedHabit(text)}
          onSubmitEditing={saveUpdatedHabit}
        />
        <View className="flex flex-row justify-center gap-4">
          <Button
            className="flex-1"
            variant="outline"
            onPress={() => setIsConfirmDeleteModalOpen(true)}>
            Delete
          </Button>
          <Button className="flex-1" onPress={saveUpdatedHabit}>
            Save
          </Button>
        </View>
      </CustomModal>
      <CustomModal
        visible={isConfirmDeleteModalOpen}
        setVisible={setIsConfirmDeleteModalOpen}>
        <Text className="mt-5 text-center text-lg">
          Are you sure you want to delete this habit?
        </Text>
        <View className="flex flex-row gap-4">
          <Button
            className="flex-1"
            variant="outline"
            onPress={() => setIsConfirmDeleteModalOpen(false)}>
            No
          </Button>
          <Button className="flex-1" onPress={() => deleteHabit(habit.$id)}>
            Yes
          </Button>
        </View>
      </CustomModal>
    </>
  );
};

export default EditHabitModal;
