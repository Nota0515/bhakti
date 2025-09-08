import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = {
  email: string;
  name: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get user from localStorage
const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on component mount
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Listen for storage events to sync auth state across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentUser') {
        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, you would validate the credentials with your backend
    // For demo purposes, we'll just create a user object
    const userData = { email, name: email.split('@')[0] };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    // In a real app, you would create the user in your backend
    // For demo purposes, we'll just create a user object
    const userData = { email, name };
    
    // Store the user in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((user: any) => user.email === email);
    
    if (userExists) {
      throw new Error('User already exists');
    }
    
    users.push({ email, password, name });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log the user in
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsAuthenticated(false);
    // Force a re-render of all components using this context
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
