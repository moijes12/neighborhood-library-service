import type { Borrowing } from './borrowing';

export interface UserProfile {
  username: string;
  active_borrowings: Borrowing[];
  total_fines: number;
}
