import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import X from '@/assets/icons/X.svg';
import { useHabits } from '@/context/HabitsContext';

const HabitInput = () => {
  const { newHabit, setNewHabit, addHabit, setIsAddingNewHabit } = useHabits();

  const onCancel = () => {
    setIsAddingNewHabit(false);
  };

  return (
    <View className="flex h-[3.8rem] w-full flex-row items-center justify-between rounded-full border border-2 border-green">
      <View className="flex flex-row items-center gap-2">
        <TouchableOpacity
          onPress={addHabit}
          className="m-1 flex h-12 w-12 items-center justify-center rounded-full border border-2 border-green text-white">
          <Text className="text-xl text-green">+</Text>
        </TouchableOpacity>
        <TextInput
          className="flex max-w-28 flex-wrap text-lg placeholder:opacity-60"
          placeholder="Enter habit"
          value={newHabit}
          onChangeText={setNewHabit}
          onSubmitEditing={addHabit}
        />
      </View>
      <TouchableOpacity
        onPress={onCancel}
        className="flex h-12 w-12 items-center justify-center">
        <X width={10} />
      </TouchableOpacity>
    </View>
  );
};

export default HabitInput;
