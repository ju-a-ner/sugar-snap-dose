import { Activity, Settings, FileText, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">InsulinCalc</h1>
                <Badge variant="outline" className="text-xs">
                  Type 2 Diabetes
                </Badge>
              </div>
            </div>
          </div>
          
          <nav className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:flex text-xs">
              Last sync: 2m ago
            </Badge>
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};