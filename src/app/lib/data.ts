'use server';
import { neon } from '@neondatabase/serverless';
import { Todo } from './definition';

const sql = neon(`${process.env.DATABASE_URL}`);

export async function fetchTodos({
  completed,
  page = 1,
  pageSize = 5,
}: { completed?: boolean; page?: number; pageSize?: number } = {}): Promise<Todo[]> {
  const offset = (page - 1) * pageSize;
  let query = 'SELECT * FROM todos';
  const params: (boolean | number | string)[] = [];
  if (typeof completed === 'boolean') {
    query += ' WHERE completed = $1';
    params.push(completed);
  }
  query += ' ORDER BY created_at DESC LIMIT $2 OFFSET $3';
  params.push(pageSize, offset);

  let result;
  if (typeof completed === 'boolean') {
    result = await sql`
      SELECT * FROM todos
      WHERE completed = ${completed}
      ORDER BY created_at DESC
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
  } else {
    result = await sql`
      SELECT * FROM todos
      ORDER BY created_at DESC
      LIMIT ${pageSize}
      OFFSET ${offset}
    `;
  }
  return result as Todo[];
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

export async function updateTodos(formData:FormData) {
	const id_str = formData.get('id') as string;
	const id = parseInt(id_str);
	const title = formData.get('title') as string;
    const deadline = formData.get('deadline') as string;
    const notes = formData.get('notes') as string;

	if(!title.trim()) return;

	await sql`
	UPDATE todos
	SET title = ${title}, deadline = ${deadline}, notes = ${notes}
	WHERE id = ${id}
	`
}

export async function deleteTodos(id: number) {
	await sql`
	DELETE FROM todos WHERE id = ${id}
	`
}

export async function completeTodos(id: number, isCompleted: boolean) {
  await sql`
  UPDATE todos
  SET completed = ${isCompleted ? 'TRUE' : 'FALSE'}
  WHERE id = ${id}
  `
}

export async function fetchEvents() {
  
}