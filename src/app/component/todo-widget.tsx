'use client';

import { useEffect, useState } from "react";
import { Circle, CircleCheckBig, LoaderCircle, RefreshCcw } from "lucide-react";
import { fetchTodos, completeTodos } from "../lib/data";
import { Todo } from "../lib/definition";

export function TodoWidget() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingId, setPendingId] = useState<number | null>(null);

  const loadTodos = async () => {
    setIsLoading(true);
    try {
      const items = await fetchTodos({ completed: false, page: 1, pageSize: 5 });
      setTodos(items);
    } catch (error) {
      console.error('Failed to load todos for widget', error);
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleComplete = async (todoId: number) => {
    setPendingId(todoId);
    try {
      await completeTodos(todoId, true);
      await loadTodos();
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
      <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
        <p className="font-semibold text-sm text-gray-800">Uncompleted Todos</p>
        <button
          type="button"
          onClick={loadTodos}
          className="rounded-full p-1 hover:bg-gray-200 transition"
          aria-label="Refresh todos"
        >
          <RefreshCcw className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoaderCircle className="h-5 w-5 animate-spin text-gray-500" />
          </div>
        ) : todos.length === 0 ? (
          <div className="p-4 text-sm text-gray-600 text-center">All caught up!</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-start gap-3 px-4 py-3">
                <button
                  type="button"
                  onClick={() => handleComplete(todo.id)}
                  disabled={pendingId === todo.id}
                  className="rounded-full p-1 hover:bg-gray-100 transition disabled:opacity-60"
                  aria-label={`Mark ${todo.title} as complete`}
                >
                  {pendingId === todo.id ? (
                    <LoaderCircle className="h-5 w-5 animate-spin text-gray-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-600" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{todo.title}</p>
                  <p className="text-xs text-gray-500">
                    Due {new Date(todo.deadline).toLocaleString(undefined, { hour12: false })}
                  </p>
                </div>
                <CircleCheckBig className="h-4 w-4 text-gray-300" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
