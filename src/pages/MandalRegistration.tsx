import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { MandalRegistrationForm } from '@/components/MandalRegistrationForm';

export const MandalRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBack = () => {
    navigate('/');
  };

  const handleRegistrationComplete = () => {
    // The actual form submission is handled in MandalRegistrationForm
    // This callback is just for navigation after successful submission
    toast({
      title: 'Registration Successful!',
      description: 'Your mandal has been registered successfully.',
    });
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Mandal Registration</h1>
      <MandalRegistrationForm 
        onBack={handleBack}
        onRegistrationComplete={handleRegistrationComplete}
      />
    </div>
  );
};

export default MandalRegistration;
