export interface Habit {
  $id: string;
  name: string;
  streak: number;
  lastCompleted?: Date | null;
  Created: Date;
}

export interface User {
  $id: string;
  email: string;
}
