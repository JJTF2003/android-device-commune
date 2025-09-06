import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, List, BarChart3, Smartphone, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/hooks/useTasks';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { tasks, loading: tasksLoading, addTask, toggleComplete, deleteTask } = useTasks();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect unauthenticated users to auth page
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully"
      });
    }
  };

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Smartphone className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl gradient-primary shadow-glow">
              <Smartphone className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Task Tracker
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="border-primary/30 hover:border-primary"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
          <p className="text-muted-foreground text-lg">
            Mobile-ready task management with environment data collection
          </p>
          
          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="secondary" className="px-4 py-2">
              <List className="h-4 w-4 mr-2" />
              {tasks.length} Total
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {completedTasks.length} Done
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="add">Add Task</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            {tasksLoading ? (
              <Card className="gradient-card shadow-card border-primary/20">
                <CardContent className="p-8 text-center">
                  <Smartphone className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
                  <p className="text-muted-foreground">Loading your tasks...</p>
                </CardContent>
              </Card>
            ) : (
              <TaskList 
                tasks={tasks.map(task => ({
                  id: task.id,
                  title: task.title,
                  description: task.description,
                  completed: task.completed,
                  createdAt: task.created_at,
                  environmentData: task.environment_data
                }))}
                onToggleComplete={toggleComplete}
                onDeleteTask={deleteTask}
              />
            )}
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <TaskForm onAddTask={(taskData) => addTask(taskData)} />
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            {/* Statistics Card */}
            <Card className="gradient-card shadow-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{tasks.length}</div>
                    <div className="text-sm text-muted-foreground">Total Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{completedTasks.length}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{pendingTasks.length}</div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Mobile deployment info */}
        <Card className="mt-8 gradient-accent border-primary/20">
          <CardContent className="p-6">
            <div className="text-center">
              <Smartphone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Ready for Mobile Deployment</h3>
              <p className="text-sm text-muted-foreground">
                This app is built with Capacitor and ready to be deployed to Android and iOS devices.
                Environment data collection includes device info, platform details, and more.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;