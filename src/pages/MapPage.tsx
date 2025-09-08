import { MapView } from '@/components/MapView';
import { useNavigate } from 'react-router-dom';

const MapPage = () => {
  const navigate = useNavigate();

  return <MapView onBack={() => navigate('/')} />;
};

export default MapPage;
