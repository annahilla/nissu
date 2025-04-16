import { Habit } from '@/types/habits';
import { createContext, useContext, useState, ReactNode } from 'react';

interface HabitContextInterface {
  habit: Habit | null;
  setHabit: (value: Habit | null) => void;
  isLosingStreak: boolean;
  setIsLosingStreak: (value: boolean) => void;
  isLostStreak: boolean;
  setIsLostStreak: (value: boolean) => void;
  streak: number;
  setStreak: (value: number) => void;
}

interface HabitProviderInterface {
  children: ReactNode;
}

const HabitContext = createContext<HabitContextInterface>({
  habit: null,
  setHabit: () => {},
  isLosingStreak: false,
  setIsLosingStreak: () => {},
  isLostStreak: false,
  setIsLostStreak: () => {},
  streak: 0,
  setStreak: () => {},
});

export const HabitProvider = ({ children }: HabitProviderInterface) => {
  const [habit, setHabit] = useState<Habit | null>(null);
  const [isLosingStreak, setIsLosingStreak] = useState(false);
  const [isLostStreak, setIsLostStreak] = useState(false);
  const [streak, setStreak] = useState(habit?.streak || 0);

  return (
    <HabitContext.Provider
      value={{
        habit,
        setHabit,
        isLosingStreak,
        setIsLosingStreak,
        isLostStreak,
        setIsLostStreak,
        streak,
        setStreak,
      }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabit = () => useContext(HabitContext);
