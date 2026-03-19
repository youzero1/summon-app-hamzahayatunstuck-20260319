import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { getTodos } from './actions';

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
}
