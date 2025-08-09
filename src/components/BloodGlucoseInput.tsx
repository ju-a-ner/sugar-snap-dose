import { useState } from 'react';
import { Activity, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export const BloodGlucoseInput = () => {
  const [bgValue, setBgValue] = useState<number | null>(null);
  const [source, setSource] = useState<'manual' | 'cgm'>('manual');
  const [timestamp] = useState(new Date());

  const handleBgSubmit = () => {
    if (bgValue) {
      // Process BG value
      console.log('BG submitted:', bgValue, source);
    }
  };

  const getBgColor = (value: number | null) => {
    if (!value) return 'text-muted-foreground';
    if (value < 4.0) return 'text-destructive';
    if (value > 10.0) return 'text-warning';
    return 'text-secondary';
  };

  const getBgStatus = (value: number | null) => {
    if (!value) return null;
    if (value < 4.0) return 'Low';
    if (value > 10.0) return 'High';
    return 'In Range';
  };

  return (
    <Card className="p-6 bg-gradient-subtle border-0 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Blood Glucose</h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={source === 'manual' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSource('manual')}
          >
            Manual Entry
          </Button>
          <Button
            variant={source === 'cgm' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSource('cgm')}
            disabled
          >
            CGM (Coming Soon)
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{timestamp.toLocaleTimeString()}</span>
            <Badge variant="outline" className="text-xs">
              {source.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bg-value">Current Blood Glucose (mmol/L)</Label>
            <Input
              id="bg-value"
              type="number"
              step="0.1"
              value={bgValue || ''}
              onChange={(e) => setBgValue(Number(e.target.value))}
              placeholder="e.g., 7.2"
              className="text-center text-xl font-bold"
            />
          </div>

          {bgValue && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Status:</span>
              <div className="text-right">
                <div className={`text-lg font-bold ${getBgColor(bgValue)}`}>
                  {bgValue.toFixed(1)} mmol/L
                </div>
                <div className={`text-xs font-medium ${getBgColor(bgValue)}`}>
                  {getBgStatus(bgValue)}
                </div>
              </div>
            </div>
          )}

          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-xs text-warning-foreground font-medium">
              ⚠️ Required: Blood glucose must be entered before any dose calculation
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};