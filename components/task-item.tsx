'use client';

import { Task } from '@/lib/db';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { deleteTask, updateTask } from '@/lib/actions';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = async (checked: boolean) => {
    const result = await updateTask(task._id!.toString(), { completed: checked });
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(`Task ${checked ? 'completed' : 'uncompleted'}`);
    }
  };

  const handleDelete = async () => {
    const result = await deleteTask(task._id!.toString());
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Task deleted');
    }
  };

  const handleUpdate = async (formData: FormData) => {
    const result = await updateTask(task._id!.toString(), {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dueDate: new Date(formData.get('dueDate') as string),
    });
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Task updated successfully');
      setIsEditing(false);
    }
  };

  return (
    <div className={`p-6 border rounded-xl shadow-sm transition-all duration-200 hover:shadow-md ${task.completed ? 'bg-muted/50' : 'bg-card'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleStatusChange}
            className="mt-1.5"
          />
          <div className="flex-1">
            <h3 className={`font-medium text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h3>
            <p className={`mt-1 text-sm ${task.completed ? 'text-muted-foreground' : 'text-foreground/80'}`}>
              {task.description}
            </p>
            <div className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(task.dueDate), 'PPP')}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <form action={handleUpdate} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Input
                    name="title"
                    placeholder="Task title"
                    defaultValue={task.title}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    name="description"
                    placeholder="Task description"
                    defaultValue={task.description}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="date"
                    name="dueDate"
                    defaultValue={format(new Date(task.dueDate), 'yyyy-MM-dd')}
                    required
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Update Task
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}