export interface Book {
    id: number;
    author: string;
    title: string;
    description: string;
    image: string;
    is_available: boolean;
    created_at: string;
    is_borrowed_by_me: string;
}