'use client';
import { useState, useCallback, useEffect } from 'react';
import TodoForm from '../components/todo-form';
import TodoList from './todo-list';

export type Todo = {
    id: number;
    title: string;
    completed: boolean;
    deadline: string;
    created_at: string;
    notes: string;
};


export default function Todo() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = useCallback(async () => {
        const res = await fetch('/api/todos');
        const data = await res.json();
        if (Array.isArray(data)) {
            setTodos(data);
        } else {
            console.error('Expected array but got: ', data);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <div className='flex flex-col'>
            <TodoForm onTodoAdded={fetchTodos} />
            <TodoList todos={todos} fetchTodos={fetchTodos} />
        </div>
    );
}