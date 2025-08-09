import { AlertTriangle, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const SafetyDisclaimer = () => {
  return (
    <Card className="p-4 bg-destructive/5 border-destructive/20 border">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
          <Shield className="h-4 w-4 text-destructive" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-destructive">Medical Disclaimer</h4>
            <Badge variant="outline" className="text-xs border-destructive/20">
              Important
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>This app is for informational purposes only.</strong> Always consult your healthcare 
              provider before making insulin dose adjustments.
            </p>
            <p>
              Monitor your blood glucose regularly and seek immediate medical attention if you experience 
              symptoms of hypoglycemia or hyperglycemia.
            </p>
            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-destructive/10">
              <AlertTriangle className="h-3 w-3 text-warning" />
              <span className="text-xs font-medium">Emergency: Contact your doctor or emergency services immediately for severe symptoms</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};