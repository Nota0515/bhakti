import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Home, UserCircle, Gift } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { user, profile, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/ganpati.png" alt="Ganpati Mandal" className="h-10 w-10" />
          <h1 className="text-xl font-semibold">Ganpati Mandal</h1>
        </div>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            {profile?.has_ordered_prasad && (
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate('/map')}
                title="View Prasad Collection"
              >
                <Gift className="h-5 w-5 text-yellow-600" />
                <span className="sr-only">Prasad Ordered</span>
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-auto rounded-full">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5" />
                    <span className="hidden sm:inline">{profile?.full_name || user?.email?.split('@')[0]}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem 
                  onClick={() => navigate('/profile')} 
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                {!profile?.has_ordered_prasad && (
                  <DropdownMenuItem 
                    onClick={() => navigate('/map')} 
                    className="cursor-pointer"
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    <span>Order Prasad</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="cursor-pointer text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
