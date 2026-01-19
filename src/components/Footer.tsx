import { Link } from 'react-router-dom';
import { Eye, Users } from 'lucide-react';

// Historical data offsets (data before Cloudflare tracking started)
// Last updated: Jan 19th, 2025 at 9:30 AM
const HISTORICAL_VISITORS = 232 + 4; // 236 historical visitors
const HISTORICAL_PAGEVIEWS = 1700; // 1700 historical pageviews

export const Footer = () => {
  // For now, we show historical totals
  // When Cloudflare data is available, add current amounts here
  const totalVisitors = HISTORICAL_VISITORS;
  const totalPageviews = HISTORICAL_PAGEVIEWS;

  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Stats boxes */}
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{totalVisitors.toLocaleString()} visitors</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{totalPageviews.toLocaleString()} pageviews</span>
            </div>
          </div>
          
          {/* Footer links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>This website was made with the help of Lovable</span>
              <span className="font-medium">
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};