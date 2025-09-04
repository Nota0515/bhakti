import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';
import { Copy, CheckCircle, QrCode, CreditCard } from 'lucide-react';
import { GanpatiBappa } from './GanpatiBappa';
import QRCode from 'qrcode';

interface Order {
  id: string;
  mandal_name: string;
  items: Array<{
    item: string;
    qty: number;
    price: number;
  }>;
  subtotal: number;
  delivery_fee: number;
  total: number;
  upi_id: string;
}

interface UpiQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onPaymentComplete: () => void;
}

export const UpiQrModal: React.FC<UpiQrModalProps> = ({ 
  isOpen, 
  onClose, 
  order, 
  onPaymentComplete 
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');

  // Generate UPI URI and QR code
  useEffect(() => {
    const generateQrCode = async () => {
      const upiUri = `upi://pay?pa=${order.upi_id}&pn=Bhakti-United Mandal&tn=Bhakti-United Prasad&am=${order.total}&cu=INR`;
      
      try {
        const url = await QRCode.toDataURL(upiUri, {
          width: 256,
          margin: 2,
          color: {
            dark: '#FF6B35', // Primary color
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    if (isOpen) {
      generateQrCode();
    }
  }, [isOpen, order]);

  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(order.upi_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy UPI ID:', error);
    }
  };

  const handleMockPayment = () => {
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('completed');
      
      // Complete payment after showing success animation
      setTimeout(() => {
        onPaymentComplete();
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-primary/20 shadow-divine backdrop-blur-glass max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
            <GanpatiBappa size="sm" />
            UPI Payment
            <GanpatiBappa size="sm" />
          </DialogTitle>
        </DialogHeader>

        {paymentStatus === 'pending' && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Order Details */}
            <Card className="glass border-primary/10 p-4 shadow-glass">
              <h4 className="font-semibold text-foreground mb-2">Order Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">From:</span>
                  <span className="text-foreground font-medium">{order.mandal_name}</span>
                </div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-muted-foreground">
                    <span>{item.item} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
                {order.delivery_fee > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span>₹{order.delivery_fee}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-foreground text-lg">
                  <span>Total</span>
                  <span>₹{order.total}.00</span>
                </div>
              </div>
            </Card>

            {/* QR Code */}
            <div className="text-center space-y-4">
              <div className="mx-auto w-64 h-64 bg-white rounded-2xl p-4 shadow-divine flex items-center justify-center">
                {qrCodeUrl ? (
                  <img 
                    src={qrCodeUrl} 
                    alt="UPI QR Code" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                Scan QR code with any UPI app
              </p>
            </div>

            {/* UPI ID */}
            <Card className="glass border-primary/10 p-4 shadow-glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">UPI ID</p>
                  <p className="font-mono text-sm text-foreground">{order.upi_id}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyUpiId}
                  className="flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Mock Payment Button */}
            <div className="space-y-3">
              <Button
                variant="divine"
                size="lg"
                className="w-full"
                onClick={handleMockPayment}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Mock Paid ₹{order.total}.00
              </Button>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <p className="text-xs text-amber-800 dark:text-amber-200 text-center font-medium">
                  🚨 This is a mock payment flow — no real payment will be processed.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {paymentStatus === 'processing' && (
          <motion.div 
            className="text-center space-y-6 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Processing Payment...</h3>
              <p className="text-sm text-muted-foreground">Please wait while we confirm your order</p>
            </div>
          </motion.div>
        )}

        {paymentStatus === 'completed' && (
          <motion.div 
            className="text-center space-y-6 py-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          >
            <div className="relative">
              <motion.div
                className="w-16 h-16 bg-gradient-divine rounded-full flex items-center justify-center mx-auto shadow-glow"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 1.5 }}
              >
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </motion.div>
              
              {/* Floating particles */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [0, (i % 2 === 0 ? 40 : -40) * Math.cos(i * Math.PI / 4)],
                      y: [0, (i % 2 === 0 ? 40 : -40) * Math.sin(i * Math.PI / 4)],
                      opacity: [1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5 + i * 0.1
                    }}
                  />
                ))}
              </motion.div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-foreground">Payment Successful! 🙏</h3>
              <p className="text-sm text-muted-foreground">Your prasad order has been confirmed</p>
              <p className="text-xs text-primary font-medium mt-2">
                Ganpati Bappa Morya! May you receive his blessings.
              </p>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};