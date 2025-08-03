// Define types that will be returned from the database

export type Todo = {
    id: number;
    title: string;
    completed: boolean;
    deadline: string;
    created_at: string;
    notes: string;
};
