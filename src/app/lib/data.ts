import { neon } from '@neondatabase/serverless';
import { Todo } from './definition';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function fetchTodos(): Promise<Todo[]> {
    try {
        const result = await sql`SELECT * FROM todos`;
        return result as Todo[];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to fetch todo data.');
    }
}

export async function postTodos(formData: FormData) {
    const title = formData.get('title') as string;
    const deadline = formData.get('deadline') as string;
    const notes = formData.get('notes') as string;

    if (!title.trim()) return;

    await sql`
      INSERT INTO todos (title, completed, deadline, created_at, notes)
      VALUES (${title.trim()}, false, ${deadline ? new Date(deadline).toISOString() : null}, ${new Date().toISOString()}, ${notes || null})
    `;
}