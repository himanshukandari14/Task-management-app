import { getTasks } from '@/lib/actions';
import { CreateTask } from '@/components/create-task';
import { TaskItem } from '@/components/task-item';
import { Toaster } from '@/components/ui/sonner';

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Task Manager
            </h1>
            <p className="text-muted-foreground mt-2">
              Stay organized and boost your productivity
            </p>
          </div>
          <CreateTask />
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-16 rounded-xl border border-dashed">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No tasks yet
              </h3>
              <p className="text-sm text-muted-foreground/80">
                Create your first task to get started
              </p>
            </div>
          ) : (
            //@ts-ignore
            tasks.map((task) => <TaskItem key={task._id.toString()} task={task} />)
          )}
        </div>
      </div>
      <Toaster />
    </main>
  );
}