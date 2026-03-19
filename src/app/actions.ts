"use server";

import { revalidatePath } from 'next/cache';
import { Todo } from '../entity/Todo';
import { initializeDataSource } from '../data-source';
import { validate } from 'class-validator';

export async function createTodo(title: string): Promise<{ success: boolean; message: string }> {
  if (!title || title.trim().length === 0) {
    return { success: false, message: 'Title is required' };
  }

  if (title.length > 255) {
    return { success: false, message: 'Title must be less than 255 characters' };
  }

  try {
    const dataSource = await initializeDataSource();
    const todoRepository = dataSource.getRepository(Todo);
    
    const todo = new Todo();
    todo.title = title.trim();
    
    const errors = await validate(todo);
    if (errors.length > 0) {
      return { success: false, message: 'Validation failed' };
    }
    
    await todoRepository.save(todo);
    revalidatePath('/');
    return { success: true, message: 'Todo created successfully' };
  } catch (error) {
    console.error('Error creating todo:', error);
    return { success: false, message: 'Failed to create todo' };
  }
}

export async function getTodos(): Promise<Todo[]> {
  try {
    const dataSource = await initializeDataSource();
    const todoRepository = dataSource.getRepository(Todo);
    return await todoRepository.find({ order: { createdAt: 'DESC' } });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
}

export async function updateTodo(id: number, completed: boolean): Promise<{ success: boolean; message: string }> {
  try {
    const dataSource = await initializeDataSource();
    const todoRepository = dataSource.getRepository(Todo);
    
    const todo = await todoRepository.findOneBy({ id });
    if (!todo) {
      return { success: false, message: 'Todo not found' };
    }
    
    todo.completed = completed;
    await todoRepository.save(todo);
    revalidatePath('/');
    return { success: true, message: 'Todo updated successfully' };
  } catch (error) {
    console.error('Error updating todo:', error);
    return { success: false, message: 'Failed to update todo' };
  }
}

export async function deleteTodo(id: number): Promise<{ success: boolean; message: string }> {
  try {
    const dataSource = await initializeDataSource();
    const todoRepository = dataSource.getRepository(Todo);
    
    const todo = await todoRepository.findOneBy({ id });
    if (!todo) {
      return { success: false, message: 'Todo not found' };
    }
    
    await todoRepository.remove(todo);
    revalidatePath('/');
    return { success: true, message: 'Todo deleted successfully' };
  } catch (error) {
    console.error('Error deleting todo:', error);
    return { success: false, message: 'Failed to delete todo' };
  }
}
