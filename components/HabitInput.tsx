import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import X from '@/assets/X.svg';

interface HabitInputProps {
  onCancel: () => void;
  newHabit: string;
  setNewHabit: (item: string) => void;
  addHabit: () => void;
}

const HabitInput = ({
  onCancel,
  newHabit,
  setNewHabit,
  addHabit,
}: HabitInputProps) => {
  return (
    <View className="flex h-[3.8rem] flex-row items-center justify-between rounded-full border border-2 border-green/60">
      <View className="flex flex-row items-center gap-2">
        <View className="m-1 flex h-12 w-12 items-center justify-center rounded-full border border-2 border-green/60 text-white"></View>
        <TextInput
          className="flex max-w-36 flex-wrap text-lg placeholder:opacity-60"
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
