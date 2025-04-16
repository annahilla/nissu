import { Habit } from '@/types/habits';

export const isCompletedToday = (lastCompleted: Date) => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const formatedLastCompletedDate = lastCompleted
    ? new Date(lastCompleted).toISOString().split('T')[0]
    : 'N/A';
  return formattedDate === formatedLastCompletedDate;
};

export const wasCompletedYesterday = (lastCompleted: Date | string) => {
  const completedDate = new Date(lastCompleted);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formattedCompleted = completedDate.toISOString().split('T')[0];
  const formattedYesterday = yesterday.toISOString().split('T')[0];

  return formattedCompleted === formattedYesterday;
};

export const isStreakLost = (habit: Habit) => {
  const isStreakCurrent = habit.lastCompleted
    ? wasCompletedYesterday(habit.lastCompleted) ||
      isCompletedToday(habit.lastCompleted)
    : false;

  return !isStreakCurrent && habit.streak > 0 ? true : false;
};
