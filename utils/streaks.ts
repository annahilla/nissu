import { Habit } from '@/types/habits';

const today = new Date();

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const beforeYesterday = new Date(today);
beforeYesterday.setDate(today.getDate() - 2);

export const isCompletedToday = (lastCompleted: Date) => {
  const formattedDate = today.toISOString().split('T')[0];
  const formatedLastCompletedDate = lastCompleted
    ? new Date(lastCompleted).toISOString().split('T')[0]
    : 'N/A';
  return formattedDate === formatedLastCompletedDate;
};

export const wasCompletedYesterday = (lastCompleted: Date | string) => {
  const completedDate = new Date(lastCompleted);
  const formattedCompleted = completedDate.toISOString().split('T')[0];
  const formattedYesterday = yesterday.toISOString().split('T')[0];

  return formattedCompleted === formattedYesterday;
};

export const wasCompletedBeforeBeforeYesterday = (
  lastCompleted: Date | string
) => {
  const completedDate = new Date(lastCompleted);
  const formattedCompleted = completedDate.toISOString().split('T')[0];
  const formattedBeforeYesterday = beforeYesterday.toISOString().split('T')[0];

  return formattedCompleted < formattedBeforeYesterday;
};

export const isStreakLost = (habit: Habit) => {
  const isStreakCurrent = habit.lastCompleted
    ? wasCompletedYesterday(habit.lastCompleted) ||
      isCompletedToday(habit.lastCompleted)
    : false;

  return !isStreakCurrent && habit.streak > 0 ? true : false;
};

export const streakHasToBeReseted = (habit: Habit) => {
  const streakLost = isStreakLost(habit);

  if (streakLost && habit.lastCompleted) {
    return wasCompletedBeforeBeforeYesterday(habit.lastCompleted);
  } else {
    return false;
  }
};
