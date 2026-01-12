import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Credits:</span>
            {/* Add credits manually here */}
            <span className="font-medium">Abilash Jovan</span>
            {/* Example: <span className="font-medium">• Name Here</span> */}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
