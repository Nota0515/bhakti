import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';
import { Plus, Minus, ShoppingCart, X, MapPin, Truck } from 'lucide-react';
import { GanpatiBappa } from './GanpatiBappa';
import { UpiQrModal } from './UpiQrModal';

interface PrasadItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

interface CartItem extends PrasadItem {
  quantity: number;
}

interface Mandal {
  id: string;
  name: string;
  location: string;
  upi_id: string;
  delivery_available: boolean;
}

interface PrasadOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    phone: string;
    deliveryAddress: string;
    notes: string;
  }) => Promise<void>;
  mandal: Mandal;
  userPhone?: string;
  onPaymentComplete?: () => void;
}

const PRASAD_ITEMS: PrasadItem[] = [
  {
    id: 'modak',
    name: 'Traditional Modak',
    price: 30,
    description: 'Steamed rice dumplings filled with jaggery and coconut'
  },
  {
    id: 'ladoo',
    name: 'Sacred Ladoo',
    price: 50,
    description: 'Sweet coconut and sesame balls blessed by Ganpati Bappa'
  },
  {
    id: 'special',
    name: 'Special Prasad',
    price: 100,
    description: 'Premium blessed offering with dry fruits and pure ghee'
  }
];

export const PrasadOrderModal: React.FC<PrasadOrderModalProps> = ({ 
  isOpen, 
  onClose, 
  mandal,
  userPhone,
  onSubmit,
  onPaymentComplete 
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [includeDelivery, setIncludeDelivery] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [formData, setFormData] = useState({
    phone: userPhone || '',
    deliveryAddress: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = 200;

  const addToCart = (item: PrasadItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId 
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter(cartItem => cartItem.id !== itemId);
      }
    });
  };

  const getItemQuantity = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + (includeDelivery ? deliveryFee : 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOrderPrasad = () => {
    if (cart.length === 0) return;

    const order = {
      id: `order-${Date.now()}`,
      mandal_id: mandal.id,
      mandal_name: mandal.name,
      items: cart.map(item => ({
        item: item.name,
        qty: item.quantity,
        price: item.price
      })),
      subtotal: subtotal,
      delivery_fee: includeDelivery ? deliveryFee : 0,
      total: total,
      upi_id: mandal.upi_id,
      status: 'created',
      created_at: new Date().toISOString()
    };

    setCurrentOrder(order);
    setShowUpiModal(true);
  };

  const handlePaymentComplete = () => {
    // Mock payment completion
    setCart([]);
    setIncludeDelivery(false);
    setShowUpiModal(false);
    setCurrentOrder(null);
    onClose();
    
    // Show success message
    if (onPaymentComplete) {
      onPaymentComplete();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.deliveryAddress) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit({
        phone: formData.phone,
        deliveryAddress: formData.deliveryAddress,
        notes: formData.notes
      });
      
      if (onPaymentComplete) {
        onPaymentComplete();
      }
      onClose();
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="glass border-primary/20 shadow-divine backdrop-blur-glass max-w-md mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
              <GanpatiBappa size="sm" />
              Order Prasad
              <GanpatiBappa size="sm" />
            </DialogTitle>
            <p className="text-sm text-muted-foreground">From {mandal.name}</p>
          </DialogHeader>

          <div className="space-y-6">
            {/* Prasad Menu */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Sacred Offerings</h3>
              {PRASAD_ITEMS.map((item) => (
                <Card key={item.id} className="glass border-primary/10 p-4 shadow-glass">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">₹{item.price}</span>
                        <Badge variant="outline" className="text-xs">Blessed</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {getItemQuantity(item.id) > 0 ? (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <span className="w-8 text-center font-medium text-foreground">
                            {getItemQuantity(item.id)}
                          </span>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="prasad"
                          size="sm"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Delivery Option */}
            {mandal.delivery_available && (
              <Card className="glass border-primary/10 p-4 shadow-glass">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Home Delivery</p>
                      <p className="text-xs text-muted-foreground">Delivered to your doorstep</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary">+₹{deliveryFee}</span>
                    <Button
                      variant={includeDelivery ? "divine" : "ghost"}
                      size="sm"
                      onClick={() => setIncludeDelivery(!includeDelivery)}
                    >
                      {includeDelivery ? 'Added' : 'Add'}
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Cart Summary */}
            {cart.length > 0 && (
              <Card className="glass border-accent/20 shadow-divine p-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Order Summary ({totalItems} items)
                </h4>
                
                <div className="space-y-2 text-sm">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-muted-foreground">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  
                  {includeDelivery && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-bold text-foreground text-base">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </Card>
            )}

            {/* Order Button */}
            <div className="space-y-3">
              <Button
                variant="divine"
                size="lg"
                className="w-full"
                disabled={cart.length === 0}
                onClick={handleOrderPrasad}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order Prasad - ₹{total}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                🙏 This is a mock payment flow — no real payment will be processed
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* UPI Payment Modal */}
      {showUpiModal && currentOrder && (
        <UpiQrModal
          isOpen={showUpiModal}
          onClose={() => setShowUpiModal(false)}
          order={currentOrder}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </>
  );
};