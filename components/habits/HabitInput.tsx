import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import X from '@/assets/icons/X.svg';
import { useHabits } from '@/context/HabitsContext';
import { memo, useState } from 'react';
import { buttonSize, checkSize } from '@/consts/sizes';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const HabitInput = () => {
  const { addHabit, setIsAddingNewHabit } = useHabits();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  const onCancel = () => {
    setInputValue('');
    setIsAddingNewHabit(false);
  };

  const handleAdd = () => {
    if (inputValue.trim() !== '') {
      if (inputValue.length > 10) {
        setError(true);
      } else {
        addHabit(inputValue);
        setInputValue('');
        setIsAddingNewHabit(false);
      }
    }
  };

  return (
    <>
      <View
        style={{ height: buttonSize }}
        className="flex w-full flex-row items-center justify-between rounded-full border border-2 border-green">
        <View className="flex-1 flex-row items-center gap-2">
          <TouchableOpacity
            style={{ height: checkSize, width: checkSize }}
            onPress={handleAdd}
            className="m-1 flex items-center justify-center rounded-full border border-2 border-green text-white">
            <Text className="text-xl text-green">+</Text>
          </TouchableOpacity>
          <TextInput
            className="w-44 text-lg placeholder:opacity-60"
            placeholder="Enter habit"
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleAdd}
            scrollEnabled={false}
            numberOfLines={1}
            multiline={false}
          />
        </View>
        <TouchableOpacity
          style={{ height: checkSize, width: checkSize }}
          onPress={onCancel}
          className="flex h-12 w-12 items-center justify-center">
          <X width={10} />
        </TouchableOpacity>
      </View>
      <Modal visible={error} setVisible={setError}>
        <Text className="mt-2 text-center text-xl font-bold">
          Uh oh! Something went wrong
        </Text>
        <Text className="text-center text-lg">
          Habit name should be less than 10 characters. Please try again.
        </Text>
        <Button onPress={() => setError(false)}>Ok</Button>
      </Modal>
    </>
  );
};

export default memo(HabitInput);
