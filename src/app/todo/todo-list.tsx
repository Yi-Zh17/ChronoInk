'use client';
import { useState, useEffect, Suspense } from 'react';
import TodoItemDialog from "./todo-items";
import { Todo } from '../lib/definition';
import { fetchTodos } from '../lib/data';

export default function TodoList() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted'>('all');
  const [page, setPage] = useState(1);
  const [todos, setTodos] = useState<Todo[]>([]);

  async function getTodoWithFilter({
    filter,
    page,
  }: {
    filter: 'all' | 'completed' | 'uncompleted';
    page: number;
  }) {
    let completed: boolean | undefined;
    if (filter === 'completed') completed = true;
    else if (filter === 'uncompleted') completed = false;
    const todos = await fetchTodos({ completed, page, pageSize: 5 });
    setTodos(todos);
  }

  // Call getTodoWithFilter whenever filter or page changes
  useEffect(() => {
    getTodoWithFilter({ filter, page });
  }, [filter, page]);

  return (
    <div className='bg-gray-100 mt-8 p-2 border-3 border-gray-400 w-full rounded-xl'>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded-md ${filter === 'uncompleted' ? 'bg-gray-500 text-white' : 'bg-white border-2 border-black/40'}`}
          onClick={() => { setFilter('uncompleted'); setPage(1); }}
        >
          Uncompleted
        </button>
        <button
          className={`px-3 py-1 rounded-md ${filter === 'completed' ? 'bg-gray-500 text-white' : 'bg-white border-2 border-black/40'}`}
          onClick={() => { setFilter('completed'); setPage(1); }}
        >
          Completed
        </button>
        <button
          className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-gray-500 text-white' : 'bg-white border-2 border-black/40'}`}
          onClick={() => { setFilter('all'); setPage(1); }}
        >
          All
        </button>
      </div>
        <ul className='space-y-2 divide-y-2 divide-gray-300'>
          {todos.map((todo) => (
            <TodoItemDialog todo={todo} key={todo.id} />
          ))}
        </ul>
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="px-3 py-1">{page}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div >
  );
}