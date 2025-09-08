import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

type AuthMode = 'login' | 'signup';

interface AuthFormProps {
  onSuccess: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
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
        login({ email, name });
        
        toast({
          title: 'Success',
          description: 'Account created successfully!',
        });
        
      } else {
        // Login logic
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (user) {
          const { password, ...userData } = user; // Don't store password in user context
          login(userData);
          
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
        
        <Button type="submit" className="w-full">
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </Button>
      </form>

      <div className="text-center text-sm">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <button 
              onClick={() => setMode('signup')} 
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button 
              onClick={() => setMode('login')} 
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
