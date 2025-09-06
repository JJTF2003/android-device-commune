import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Smartphone, Calendar, MapPin, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  environmentData?: {
    device: {
      platform: string;
      model: string;
      operatingSystem?: string;
      osVersion?: string;
    };
    timestamp: string;
    location: string;
    batteryLevel: string;
  };
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList = ({ tasks, onToggleComplete, onDeleteTask }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <Card className="gradient-card shadow-card border-primary/20">
        <CardContent className="p-8 text-center">
          <Circle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
          <p className="text-muted-foreground">Add your first task to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card 
          key={task.id} 
          className={`gradient-card shadow-card border-primary/20 transition-all duration-300 ${
            task.completed ? 'opacity-75' : 'hover:shadow-glow'
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleComplete(task.id)}
                  className="p-0 h-auto hover:bg-transparent"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground hover:text-primary" />
                  )}
                </Button>
                
                <div className="flex-1">
                  <CardTitle 
                    className={`text-lg ${
                      task.completed 
                        ? 'line-through text-muted-foreground' 
                        : 'text-foreground'
                    }`}
                  >
                    {task.title}
                  </CardTitle>
                  {task.description && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteTask(task.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(task.createdAt), 'PPp')}</span>
            </div>
            
            {task.environmentData && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Environment Data</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Badge variant="secondary" className="justify-start">
                    Platform: {task.environmentData.device.platform}
                  </Badge>
                  
                  {task.environmentData.device.model && (
                    <Badge variant="secondary" className="justify-start">
                      Model: {task.environmentData.device.model}
                    </Badge>
                  )}
                  
                  {task.environmentData.device.osVersion && (
                    <Badge variant="secondary" className="justify-start">
                      OS: {task.environmentData.device.osVersion}
                    </Badge>
                  )}
                  
                  <Badge variant="secondary" className="justify-start">
                    <MapPin className="h-3 w-3 mr-1" />
                    Location: {task.environmentData.location}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;