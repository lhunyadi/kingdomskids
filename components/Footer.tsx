import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Switch } from '@/components/ui/switch';
import { FaFacebookF as Facebook} from 'react-icons/fa';
import { AiFillInstagram as Instagram } from 'react-icons/ai';

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("w-full", className)}>
      <div className="mx-auto max-w-7xl p-5">
        <div className="flex justify-end items-center p-5">
          <div className="flex justify-end items-center p-2.5">
            <Switch variant="icon" size="icon" />
          </div>
        </div>
        <div className="border-t border-secondary">
          <div className="flex justify-between items-center p-5 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Kingdom's Kids Ministry
            </p>  
            <nav className="flex gap-4 items-center">
              <Button
                variant="icon"
                size="icon"
                asChild
              >
                <a 
                  href="https://facebook.com/kingdomskids" 
                  target="_blank" 
                  rel="noopener noreferrer">
                    <Facebook/>
                </a>
              </Button>
              <Button
                variant="icon"
                size="icon"
                asChild
              >
                <a 
                  href="https://instagram.com/kingdomskidsministry" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  >
                    <Instagram/>
                </a>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}