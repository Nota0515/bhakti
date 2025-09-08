import { MapView } from '@/components/MapView';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const MapPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const showToast = (message: string) => {
    toast({
      title: "Bhakti-United",
      description: message,
    });
  };

  return <MapView onBack={() => navigate('/')} onShowToast={showToast} />;
};

export default MapPage;
