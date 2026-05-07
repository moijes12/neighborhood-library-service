export interface Borrowing {
  id: number;
  book: number;
  book_title: string;
  is_overdue: boolean;
  borrowed_date: string;
}

export interface UserProfile {
  username: string;
  active_borrowings: Borrowing[];
}