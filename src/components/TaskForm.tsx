import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MapPin, Thermometer, Clock, Plus } from 'lucide-react';
import { Device } from '@capacitor/device';
import { useToast } from '@/hooks/use-toast';

interface TaskFormProps {
  onAddTask: (task: any) => void;
}

const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCollectingEnvData, setIsCollectingEnvData] = useState(false);
  const { toast } = useToast();
  const [category, setCategory] = useState('General'); // default category


  const collectEnvironmentData = async () => {
    setIsCollectingEnvData(true);
    try {
      const deviceInfo = await Device.getInfo();
      const deviceId = await Device.getId();
      
      return {
        device: {
          platform: deviceInfo.platform,
          model: deviceInfo.model,
          operatingSystem: deviceInfo.operatingSystem,
          osVersion: deviceInfo.osVersion,
          deviceId: deviceId.identifier
        },
        timestamp: new Date().toISOString(),
        location: navigator.geolocation ? 'Available' : 'Not available',
        batteryLevel: (navigator as any).getBattery ? 'Checking...' : 'Not available'
      };
    } catch (error) {
      console.error('Error collecting environment data:', error);
      return {
        device: { platform: 'web', model: 'unknown' },
        timestamp: new Date().toISOString(),
        location: 'Not available',
        batteryLevel: 'Not available'
      };
    } finally {
      setIsCollectingEnvData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a task title",
        variant: "destructive"
      });
      return;
    }

    const environmentData = await collectEnvironmentData();
    
    const task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      completed: false,
      environmentData,
      category,
    };

    onAddTask(task);
    
    // Reset form
    setTitle('');
    setDescription('');
    
    toast({
      title: "Task added!",
      description: "Your task has been created with environment data",
    });
  };

  return (
    <Card className="gradient-card shadow-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Plus className="h-5 w-5" />
          Add New Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="border-primary/30 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md px-3 py-2 border-primary/30 focus:border-primary bg-background"
            >
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              className="border-primary/30 focus:border-primary min-h-[80px]"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <Thermometer className="h-4 w-4" />
            <Clock className="h-4 w-4" />
            <span>Environment data will be collected automatically</span>
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-primary shadow-glow"
            disabled={isCollectingEnvData}
          >
            {isCollectingEnvData ? 'Collecting Data...' : 'Add Task'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;