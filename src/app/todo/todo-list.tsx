'use client';
import { Todo } from "../lib/definition";


export default function TodoList({todos} : {todos: Record<string, any>[]}) {
    return (
        <div className='bg-gray-100 mt-10 p-2 border-3 border-gray-300 w-full'>
            <ul className='space-y-2 divide-y-2 divide-gray-300'>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className='flex space-x-20 flex-col'
                    >
                        <h2 className='size-12'>{todo.title}</h2>
                        <div className='ml-auto'>
                            <p>Deadline: {new Date(todo.deadline).toLocaleString(undefined, {
                                hour12: false,
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}