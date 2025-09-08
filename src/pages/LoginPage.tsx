import { useLocation, useNavigate } from 'react-router-dom';
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUp = location.pathname === '/signup';

  const onSuccess = () => {
    navigate('/'); // Redirect to home after successful login/signup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <AuthForm 
            mode={isSignUp ? 'signup' : 'login'} 
            onSuccess={onSuccess} 
          />
        </div>
      </div>
    </div>
  );
}
