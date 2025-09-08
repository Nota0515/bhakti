import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import mandalsData from '@/data/seed-mandals.json';
import { MapPin } from './MapPin';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PrasadOrderModal } from './PrasadOrderModal';
import { MapPin as MapPinIcon, Star, Phone, Navigation, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Google Maps API Key - In production, store this as environment variable
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

interface Mandal {
  id: string;
  name: string;
  est_year: number;
  location: string;
  lat: number;
  lng: number;
  contact_phone: string;
  upi_id: string;
  delivery_available: boolean;
  verified: boolean;
  description?: string;
  specialties?: string[];
  votes?: number;
}

interface MapViewProps {
  onBack?: () => void;
}

export const MapView: React.FC<MapViewProps> = ({ onBack }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [selectedMandal, setSelectedMandal] = useState<Mandal | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showPrasadModal, setShowPrasadModal] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      const loader = new Loader({
        apiKey: "AIzaSyAvOlU6uEZycjphIYj1TMIYO1t_k6pTGj4",
        version: "weekly",
        libraries: ["places", "geometry"]
      });

      try {
        const google = await loader.load();
        
        // Center the map on Mumbai
        const mumbaiCenter = { lat: 18.9750, lng: 72.8258 };
        
        const map = new google.maps.Map(mapRef.current, {
          center: mumbaiCenter,
          zoom: 12,
          styles: [
            // Custom map styling for devotional theme
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ saturation: -20 }, { lightness: 20 }]
            },
            {
              featureType: "water", 
              elementType: "geometry.fill",
              stylers: [{ color: "#4a90e2" }]
            },
            {
              featureType: "landscape",
              elementType: "geometry.fill", 
              stylers: [{ color: "#f7f3e9" }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true
        });

        googleMapRef.current = map;

        // Add markers for each mandal with staggered animation
        mandalsData.forEach((mandal, index) => {
          setTimeout(() => {
            const marker = new google.maps.Marker({
              position: { lat: mandal.lat, lng: mandal.lng },
              map: map,
              title: mandal.name,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 0, // Hide default marker, we'll use custom overlay
              },
              animation: google.maps.Animation.DROP
            });

            // Create custom marker element
            const markerElement = document.createElement('div');
            markerElement.innerHTML = `
              <div class="relative">
                <div class="${mandal.verified 
                  ? 'w-8 h-10 bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-400/50' 
                  : 'w-8 h-10 bg-gradient-to-br from-orange-300 to-red-500 shadow-lg'
                } rounded-full rounded-b-none border-2 border-white relative cursor-pointer transform hover:scale-110 transition-all duration-300">
                  <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-orange-500"></div>
                  <div class="absolute inset-0 flex items-center justify-center text-white text-xs">🕉</div>
                  ${mandal.verified ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>' : ''}
                </div>
              </div>
            `;

            const overlay = new google.maps.OverlayView();
            overlay.setMap(map);
            overlay.draw = function() {
              const divs = this.getPanes()?.overlayMouseTarget;
              if (divs && !markerElement.parentNode) {
                divs.appendChild(markerElement);
              }
              const point = this.getProjection()?.fromLatLngToDivPixel(marker.getPosition()!);
              if (point && markerElement.parentNode) {
                markerElement.style.position = 'absolute';
                markerElement.style.left = (point.x - 16) + 'px';
                markerElement.style.top = (point.y - 40) + 'px';
              }
            };

            markerElement.addEventListener('click', () => {
              setSelectedMandal(mandal);
              map.panTo({ lat: mandal.lat, lng: mandal.lng });
              map.setZoom(15);
            });

            markersRef.current.push(marker);
          }, index * 100); // Stagger pin drops
        });

        setIsMapLoaded(true);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  const handleVote = (mandalId: string) => {
    // Mock voting implementation
    console.log('Voting for mandal:', mandalId);
  };

  return (
    <div className="relative w-full h-screen bg-background">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Loading Overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 glass flex items-center justify-center z-50">
          <div className="text-center space-y-4">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-primary font-medium">Loading Sacred Map...</p>
          </div>
        </div>
      )}

      {/* Navbar Toggle Button */}
      <div className="absolute top-4 left-4 z-40">
        <Button
          variant="holy"
          size="icon"
          onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          className="shadow-divine"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation and Search Bar */}
      <AnimatePresence>
        {isNavbarOpen && (
          <motion.div
            className="absolute top-4 left-16 right-4 z-30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="glass rounded-2xl p-4 shadow-divine">
              <div className="flex items-center gap-3 mb-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack} 
                  className="text-primary hover:text-primary-foreground hover:bg-primary/20"
                >
                  ← Back to Home
                </Button>
                <div className="text-sm font-semibold text-primary">Discover Mandals</div>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="text-primary" size={20} />
                <input 
                  type="text" 
                  placeholder="Search mandals by name or location..."
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-medium"
                />
                <Button variant="divine" size="sm">Search</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mandal Detail Panel */}
      {selectedMandal && (
        <div className="absolute bottom-4 left-4 right-4 z-20 md:right-auto md:w-96">
          <Card className="glass border-primary/20 shadow-divine p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-foreground">{selectedMandal.name}</h3>
                  {selectedMandal.verified && (
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Est. {selectedMandal.est_year}</p>
                <p className="text-sm text-muted-foreground">{selectedMandal.location}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedMandal(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            {selectedMandal.description && (
              <p className="text-sm text-muted-foreground">{selectedMandal.description}</p>
            )}

            {selectedMandal.specialties && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Prasad Specialties:</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedMandal.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent" />
                  <span>{selectedMandal.votes || 0} votes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{selectedMandal.contact_phone}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="vote" 
                size="sm" 
                className="flex-1 bg-black hover:bg-black"
                onClick={() => handleVote(selectedMandal.id)}
              >
                <Star className="w-4 h-4" />
                Vote
              </Button>
              
              {selectedMandal.delivery_available && (
                <Button 
                  variant="prasad" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setShowPrasadModal(true)}
                >
                  Order Prasad
                </Button>
              )}

              <Button variant="ghost" size="sm">
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 z-10">
        <Card className="glass border-primary/20 shadow-glass p-3 space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Legend</h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 bg-gradient-saffron rounded-full border border-primary-foreground/20"></div>
            <span>Verified Mandal</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 bg-gradient-sunset rounded-full border border-primary-foreground/20"></div>
            <span>Mandal</span>
          </div>
        </Card>
      </div>

      {/* Prasad Order Modal */}
      {selectedMandal && showPrasadModal && (
        <PrasadOrderModal
          isOpen={showPrasadModal}
          onClose={() => setShowPrasadModal(false)}
          mandal={{
            id: selectedMandal.id,
            name: selectedMandal.name,
            location: selectedMandal.location,
            upi_id: selectedMandal.upi_id,
            delivery_available: selectedMandal.delivery_available
          }}
          onPaymentComplete={() => {
            setShowPrasadModal(false);
          }}
        />
      )}
    </div>
  );
};