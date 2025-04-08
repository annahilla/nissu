export interface Habit {
  $id: string;
  name: string;
  streak: number;
  lastCompleted?: Date | null;
}

export interface User {
  $id: string;
  email: string;
}
