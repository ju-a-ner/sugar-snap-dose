import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const MealCapture = () => {
  const [carbsEstimate, setCarbsEstimate] = useState<number | null>(null);
  const [adjustedCarbs, setAdjustedCarbs] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        // Simulate AI carb estimation
        const estimate = Math.floor(Math.random() * 50) + 15;
        setCarbsEstimate(estimate);
        setAdjustedCarbs(estimate);
        toast({
          title: "Meal analyzed",
          description: `Estimated ${estimate}g carbs. You can adjust this estimate below.`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6 bg-gradient-subtle border-0 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Meal Capture</h3>
        </div>
        
        <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
          {imagePreview ? (
            <div className="space-y-4">
              <img
                src={imagePreview}
                alt="Captured meal"
                className="max-w-full h-48 object-cover rounded-lg mx-auto"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setImagePreview(null);
                  setCarbsEstimate(null);
                  setAdjustedCarbs(null);
                }}
              >
                Take New Photo
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <Label htmlFor="meal-photo" className="cursor-pointer">
                  <Button asChild variant="default">
                    <span>Take Photo</span>
                  </Button>
                </Label>
                <Input
                  id="meal-photo"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageCapture}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Snap a photo of your meal for carb estimation
              </p>
            </div>
          )}
        </div>

        {carbsEstimate && (
          <div className="space-y-3 p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Estimate:</span>
              <span className="text-lg font-bold text-primary">{carbsEstimate}g carbs</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carb-adjustment">Adjust if needed:</Label>
              <Input
                id="carb-adjustment"
                type="number"
                value={adjustedCarbs || ''}
                onChange={(e) => setAdjustedCarbs(Number(e.target.value))}
                placeholder="Carbs in grams"
                className="text-center text-lg font-semibold"
              />
            </div>
            
            <p className="text-xs text-muted-foreground">
              Review and adjust the carb estimate based on your knowledge of the meal
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};