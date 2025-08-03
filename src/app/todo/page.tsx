import TodoForm from './todo-form';
import TodoList from './todo-list';
import { fetchTodos } from '../lib/data';

export default async function TodoPage() {
    const todos = await fetchTodos();
    return (
        <>
            <TodoForm onTodoAdded={fetchTodos}/>
            <TodoList todos={todos} fetchTodos={fetchTodos} />
        </>
    );
}