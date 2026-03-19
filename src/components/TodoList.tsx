"use client";

import { Todo } from '../entity/Todo';
import { updateTodo, deleteTodo } from '../app/actions';

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  const handleToggle = async (id: number, completed: boolean) => {
    await updateTodo(id, !completed);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await deleteTodo(id);
    }
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Todos</h2>
      <ul className="divide-y divide-gray-200">
        {todos.map((todo) => (
          <li key={todo.id} className="py-4 flex items-center justify-between hover:bg-gray-50 px-2 rounded">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id, todo.completed)}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {todo.title}
                </span>
                <p className="text-sm text-gray-500">
                  Created: {new Date(todo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-500 mt-4">
        Total todos: {todos.length}
      </p>
    </div>
  );
}
