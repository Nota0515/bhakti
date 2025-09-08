import { MandalRegistrationForm } from '@/components/MandalRegistrationForm';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegistrationComplete = () => {
    toast({
      title: "Registration Submitted",
      description: "We\'ll review and contact you soon. 🙏",
    });
    navigate('/');
  };

  return (
    <MandalRegistrationForm
      onBack={() => navigate('/')}
      onRegistrationComplete={handleRegistrationComplete}
    />
  );
};

export default RegistrationPage;
