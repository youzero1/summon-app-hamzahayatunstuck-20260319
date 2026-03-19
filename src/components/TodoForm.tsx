"use client";

import { useState } from 'react';
import { createTodo } from '../app/actions';

export default function TodoForm() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setMessage(null);

    const result = await createTodo(title);
    
    setMessage({
      type: result.success ? 'success' : 'error',
      text: result.message,
    });
    
    if (result.success) {
      setTitle('');
    }
    
    setLoading(false);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={255}
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
      
      {message && (
        <div className={`mt-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      <p className="text-sm text-gray-500 mt-2">
        Enter a task title (max 255 characters).
      </p>
    </div>
  );
}
