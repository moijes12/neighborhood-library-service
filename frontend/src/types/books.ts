export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    image: string | null;
    is_available: boolean;
    created_date: string;
}