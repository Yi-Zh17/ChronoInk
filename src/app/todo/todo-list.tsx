'use client';
import { useState, useEffect, useCallback } from "react";
import { fetchTodos } from "../lib/data";
import { Todo } from "../lib/definition";
import TodoItemDialog from "./todo-items";
import { TodoSkeleton } from "../ui/skeleton";

export default function TodoList() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted'>('uncompleted');
  const [page, setPage] = useState(1);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTodoWithFilter = useCallback(
    async ({ filter, page, shouldUpdate }: {
      filter: 'all' | 'completed' | 'uncompleted';
      page: number;
      shouldUpdate?: () => boolean;
    }) => {
      let completed: boolean | undefined;
      if (filter === 'completed') completed = true;
      else if (filter === 'uncompleted') completed = false;

      setIsLoading(true);
      try {
        const todos = await fetchTodos({ completed, page, pageSize: 5 });
        if (!shouldUpdate || shouldUpdate()) {
          setTodos(todos);
        }
      } catch (error) {
        console.error('Failed to fetch todos', error);
        if (!shouldUpdate || shouldUpdate()) {
          setTodos([]);
        }
      } finally {
        if (!shouldUpdate || shouldUpdate()) {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    let isActive = true;

    (async () => {
      await getTodoWithFilter({
        filter,
        page,
        shouldUpdate: () => isActive,
      });
    })();

    return () => {
      isActive = false;
    };
  }, [filter, page, getTodoWithFilter]);

  return (
    <>
    <div className="flex gap-2 mt-5">
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
    <div className="mt-5 w-full">
      {isLoading ? (
        <TodoSkeleton />
      ) : (
        <div className='bg-gray-100 p-2 border-3 border-gray-400 w-full rounded-xl'>
          <ul className='space-y-2 divide-y-2 divide-gray-300'>
            {todos.map((todo) => (
              <TodoItemDialog
                key={todo.id}
                todo={todo}
                refreshTodosAction={() => getTodoWithFilter({ filter, page })}
              />
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
      )}
    </div>
    </>
  );
}
