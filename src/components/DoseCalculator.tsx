import { useState } from 'react';
import { Calculator, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface DoseCalculation {
  carbs: number;
  bgLevel: number;
  correctionDose: number;
  mealDose: number;
  totalDose: number;
}

export const DoseCalculator = () => {
  const [calculation, setCalculation] = useState<DoseCalculation | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Mock user settings - would come from settings component
  const userSettings = {
    icRatio: 10, // 1 unit per 10g carbs
    correctionFactor: 2.5, // 1 unit lowers BG by 2.5 mmol/L
    targetBg: 6.0,
    maxDosePerMeal: 15,
    maxDosePerDay: 40
  };

  const calculateDose = () => {
    // Mock values - would come from other components
    const carbs = 45; // from MealCapture
    const currentBg = 8.5; // from BloodGlucoseInput
    
    const mealDose = carbs / userSettings.icRatio;
    const bgAboveTarget = currentBg - userSettings.targetBg;
    const correctionDose = bgAboveTarget > 0 ? bgAboveTarget / userSettings.correctionFactor : 0;
    
    let totalDose = mealDose + correctionDose;
    
    // Apply safety caps
    if (totalDose > userSettings.maxDosePerMeal) {
      totalDose = userSettings.maxDosePerMeal;
    }
    
    // Round to nearest 0.5 unit
    totalDose = Math.round(totalDose * 2) / 2;

    setCalculation({
      carbs,
      bgLevel: currentBg,
      correctionDose,
      mealDose,
      totalDose
    });
  };

  const confirmDose = () => {
    setIsConfirmed(true);
    // Log the dose
    console.log('Dose confirmed:', calculation);
  };

  return (
    <Card className="p-6 bg-gradient-subtle border-0 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Dose Calculation</h3>
        </div>

        {!calculation ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground mb-4">
                Complete meal capture and blood glucose entry to calculate your insulin dose
              </p>
              <Button onClick={calculateDose}>
                Calculate Dose
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-sm text-muted-foreground">Carbohydrates</div>
                <div className="text-lg font-bold text-primary">{calculation.carbs}g</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-sm text-muted-foreground">Blood Glucose</div>
                <div className="text-lg font-bold text-secondary">{calculation.bgLevel} mmol/L</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Meal dose (1:{userSettings.icRatio} ratio):</span>
                <span className="font-medium">{calculation.mealDose.toFixed(1)} units</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Correction dose:</span>
                <span className="font-medium">{calculation.correctionDose.toFixed(1)} units</span>
              </div>
            </div>

            <Separator />

            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Recommended Dose</div>
              <div className="text-3xl font-bold text-primary">{calculation.totalDose}</div>
              <div className="text-sm text-muted-foreground">units</div>
              <Badge variant="outline" className="mt-2">
                Within safe limits
              </Badge>
            </div>

            {!isConfirmed ? (
              <div className="space-y-3">
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-warning-foreground">
                    <strong>Medical Disclaimer:</strong> This calculation is for informational purposes only. 
                    Always consult your healthcare provider before making insulin dose adjustments. 
                    Monitor your blood glucose regularly and seek immediate medical attention if you experience 
                    symptoms of hypoglycemia or hyperglycemia.
                  </div>
                </div>
                <Button 
                  onClick={confirmDose}
                  className="w-full"
                  size="lg"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Confirm & Log Dose
                </Button>
              </div>
            ) : (
              <div className="text-center p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-secondary mb-2">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Dose Logged</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Logged at {new Date().toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};