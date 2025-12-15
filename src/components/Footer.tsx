import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="ira-container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="font-serif text-2xl text-foreground">
              Ira
            </Link>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              A gentle space for emotional awareness and self-understanding.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-foreground mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/how-ira-helps" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    How Ira Helps
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-4">Trust</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/ethics-safety" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    Ethics & Safety
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Message */}
          <div className="md:text-right">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Remember: Ira is not a replacement for professional support. 
              If you're in crisis, please reach out to a mental health professional.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Ira. Made with care.
          </p>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>Created with</span>
            <Heart className="w-4 h-4 text-ira-terracotta fill-current" />
            <span>for your wellbeing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
