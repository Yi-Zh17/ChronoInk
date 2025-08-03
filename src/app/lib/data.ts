import postgres from 'postgres';
import { Todo } from './definition';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

export async function fetchTodos() {
    try{
        const data = await sql<Todo[]>`SELECT * FROM REVENUE`;
        return data;
    } catch(error) {
        console.error('Database error:', error);
        throw new Error('Failed to fetch todo data.');
    }
}