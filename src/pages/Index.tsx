import { Header } from '@/components/Header';
import { SafetyDisclaimer } from '@/components/SafetyDisclaimer';
import { MealCapture } from '@/components/MealCapture';
import { BloodGlucoseInput } from '@/components/BloodGlucoseInput';
import { DoseCalculator } from '@/components/DoseCalculator';
import { MoodSleepTracker } from '@/components/MoodSleepTracker';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Good morning, Maria 🌱
            </h1>
            <p className="text-muted-foreground">
              Let's manage your insulin dose safely and effectively
            </p>
          </div>

          {/* Safety Disclaimer */}
          <SafetyDisclaimer />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <MealCapture />
              <BloodGlucoseInput />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <DoseCalculator />
              <MoodSleepTracker />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-card rounded-lg shadow-card text-center">
              <div className="text-2xl font-bold text-primary">7.2</div>
              <div className="text-xs text-muted-foreground">Avg BG (7 days)</div>
            </div>
            <div className="p-4 bg-card rounded-lg shadow-card text-center">
              <div className="text-2xl font-bold text-secondary">28</div>
              <div className="text-xs text-muted-foreground">Doses logged</div>
            </div>
            <div className="p-4 bg-card rounded-lg shadow-card text-center">
              <div className="text-2xl font-bold text-warning">2</div>
              <div className="text-xs text-muted-foreground">Low alerts</div>
            </div>
            <div className="p-4 bg-card rounded-lg shadow-card text-center">
              <div className="text-2xl font-bold text-primary">85%</div>
              <div className="text-xs text-muted-foreground">In range</div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground pt-8 border-t">
            <p>
              InsulinCalc • Australian Privacy Act Compliant • Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
