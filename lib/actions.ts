'use server';

import { revalidatePath } from 'next/cache';
import { connectToDb } from './db';
import { ObjectId } from 'mongodb';
import { Task } from './db';

export async function createTask(formData: FormData) {
  try {
    const db = await connectToDb();
    const task = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dueDate: new Date(formData.get('dueDate') as string),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('tasks').insertOne(task);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to create task' };
  }
}

export async function getTasks() {
  try {
    const db = await connectToDb();
    const tasks = await db
      .collection('tasks')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return tasks;
  } catch (error) {
    return [];
  }
}

export async function updateTask(id: string, data: Partial<Task>) {
  try {
    const db = await connectToDb();
    await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      }
    );
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update task' };
  }
}

export async function deleteTask(id: string) {
  try {
    const db = await connectToDb();
    await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to delete task' };
  }
}