'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { createTask } from '@/lib/actions';
import { toast } from 'sonner';
import { useState } from 'react';

export function CreateTask() {
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await createTask(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Task created successfully');
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              name="title"
              placeholder="Task title"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Textarea
              name="description"
              placeholder="Task description"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="date"
              name="dueDate"
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}