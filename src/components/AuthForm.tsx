import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

type AuthMode = 'login' | 'signup';

interface AuthFormProps {
  mode?: AuthMode;
  onSuccess: () => void;
}

export function AuthForm({ mode = 'login', onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === 'signup') {
        await signup(email, password, name);
        toast({
          title: 'Account created!',
          description: 'Your account has been created successfully.',
        });
      } else {
        // For login, we only need email and password
        await login(email, password);
        toast({
          title: 'Welcome back!',
          description: 'You have been successfully logged in.',
        });
      }
      onSuccess();
      if (mode === 'signup') {
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some((user: any) => user.email === email);
        
        if (userExists) {
          toast({
            title: 'Error',
            description: 'User already exists',
            variant: 'destructive',
          });
          return;
        }
        
        // Create new user
        const newUser = { email, password, name };
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        
        // Use the login function from auth context
        await login(email, password);
        
        toast({
          title: 'Success',
          description: 'Account created and logged in successfully!',
        });
        
      } else {
        // Login logic
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (user) {
          // Use the login function with email and password
          await login(email, password);
          
          toast({
            title: 'Success',
            description: 'Logged in successfully!',
          });
        } else {
          throw new Error('Invalid email or password');
        }
      }
      
      // Small delay to ensure state updates before navigation
      setTimeout(() => {
        onSuccess();
      }, 100);
      
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">
          {mode === 'login' ? 'Login to your account' : 'Create an account'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === 'login' 
            ? "Enter your email and password to sign in"
            : "Fill in your details to create an account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === 'login' ? 'Signing in...' : 'Creating account...'}
            </span>
          ) : mode === 'login' ? 'Sign in' : 'Sign up'}
        </Button>
      </form>

      <div className="text-center text-sm">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <a 
              href="/signup" 
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a 
              href="/login" 
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </a>
          </>
        )}
      </div>
    </div>
  );
}
