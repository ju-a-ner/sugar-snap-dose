import { useState } from 'react';
import { Heart, Moon, Smile, Meh, Frown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

export const MoodSleepTracker = () => {
  const [mood, setMood] = useState<number>(3);
  const [sleepHours, setSleepHours] = useState<number[]>([7]);
  const [sleepQuality, setSleepQuality] = useState<number[]>([3]);
  const [isLogged, setIsLogged] = useState(false);

  const getMoodIcon = (value: number) => {
    if (value <= 1) return <Frown className="h-6 w-6 text-destructive" />;
    if (value <= 2) return <Meh className="h-6 w-6 text-warning" />;
    if (value <= 3) return <Smile className="h-6 w-6 text-muted-foreground" />;
    if (value <= 4) return <Smile className="h-6 w-6 text-secondary" />;
    return <Smile className="h-6 w-6 text-primary" />;
  };

  const getMoodLabel = (value: number) => {
    const labels = ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent'];
    return labels[value - 1] || 'Neutral';
  };

  const handleLogData = () => {
    setIsLogged(true);
    console.log('Mood & sleep logged:', {
      mood,
      sleepHours: sleepHours[0],
      sleepQuality: sleepQuality[0]
    });
  };

  return (
    <Card className="p-6 bg-gradient-subtle border-0 shadow-card">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Mood & Sleep</h3>
        </div>

        {!isLogged ? (
          <div className="space-y-6">
            {/* Mood Tracking */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">How are you feeling?</label>
                <div className="flex items-center gap-2">
                  {getMoodIcon(mood)}
                  <Badge variant="outline">{getMoodLabel(mood)}</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Button
                    key={value}
                    variant={mood === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMood(value)}
                    className="aspect-square p-0"
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sleep Duration */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Sleep Duration</label>
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-primary" />
                  <Badge variant="outline">{sleepHours[0]} hours</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <Slider
                  value={sleepHours}
                  onValueChange={setSleepHours}
                  max={12}
                  min={3}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>3h</span>
                  <span>12h</span>
                </div>
              </div>
            </div>

            {/* Sleep Quality */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Sleep Quality</label>
                <Badge variant="outline">
                  {sleepQuality[0] <= 2 ? 'Poor' : sleepQuality[0] <= 3 ? 'Fair' : 'Good'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Slider
                  value={sleepQuality}
                  onValueChange={setSleepQuality}
                  max={5}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>

            <Button onClick={handleLogData} className="w-full">
              Log Mood & Sleep
            </Button>
          </div>
        ) : (
          <div className="text-center p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-secondary mb-2">
              <Heart className="h-5 w-5" />
              <span className="font-medium">Data Logged</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Mood: {getMoodLabel(mood)} • Sleep: {sleepHours[0]}h
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsLogged(false)}
              className="mt-2"
            >
              Update Entry
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
          💡 Mood and sleep patterns can affect blood glucose levels and insulin sensitivity. 
          Regular tracking helps identify patterns in your diabetes management.
        </div>
      </div>
    </Card>
  );
};