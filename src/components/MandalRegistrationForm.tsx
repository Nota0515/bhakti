import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Users, 
  MapPin, 
  Phone, 
  Calendar,
  Check,
  Building2,
  Truck,
  Star,
  Upload
} from 'lucide-react';
import { GanpatiBappa } from './GanpatiBappa';

interface MandalRegistrationFormProps {
  onBack: () => void;
  onRegistrationComplete: () => void;
}

interface FormData {
  name: string;
  establishedYear: string;
  location: string;
  address: string;
  contactName: string;
  contactPhone: string;
  upiId: string;
  description: string;
  specialties: string;
  deliveryAvailable: boolean;
  pandal_theme: string;
  cultural_programs: string;
  previous_awards: string;
}

export const MandalRegistrationForm: React.FC<MandalRegistrationFormProps> = ({ 
  onBack, 
  onRegistrationComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    establishedYear: '',
    location: '',
    address: '',
    contactName: '',
    contactPhone: '',
    upiId: '',
    description: '',
    specialties: '',
    deliveryAvailable: false,
    pandal_theme: '',
    cultural_programs: '',
    previous_awards: ''
  });

  const totalSteps = 4;

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Save registration data to local storage
      const mandals = JSON.parse(localStorage.getItem('mandals') || '[]');
      localStorage.setItem('mandals', JSON.stringify([...mandals, formData]));
      
      // Try to send email notification, but don't let it block registration
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: formData.contactPhone.includes('@') ? formData.contactPhone : 'admin@ganpatimandalapp.com',
            subject: `Thank you for registering ${formData.name} with Ganpati Mandal App`,
            text: `Dear ${formData.contactName || 'Valued Mandal Member'},

Thank you for registering ${formData.name} with Ganpati Mandal App! We're thrilled to have you on board.

Here are your registration details:
- Mandal Name: ${formData.name}
- Location: ${formData.location}
- Contact: ${formData.contactName} (${formData.contactPhone})

Our team will review your registration and get in touch with you shortly. In the meantime, feel free to explore our platform and let us know if you have any questions.

Best regards,
The Ganpati Mandal App Team`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="color: #4CAF50;">Welcome to Ganpati Mandal App!</h1>
                  <p>Thank you for registering your mandal with us.</p>
                </div>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                  <h2 style="color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Registration Details</h2>
                  <p><strong>Mandal Name:</strong> ${formData.name}</p>
                  <p><strong>Established Year:</strong> ${formData.establishedYear}</p>
                  <p><strong>Location:</strong> ${formData.location}</p>
                  <p><strong>Contact Person:</strong> ${formData.contactName}</p>
                  <p><strong>Contact Number:</strong> ${formData.contactPhone}</p>
                  ${formData.address ? `<p><strong>Address:</strong> ${formData.address}</p>` : ''}
                  ${formData.description ? `<p><strong>Description:</strong> ${formData.description}</p>` : ''}
                </div>
                
                <div style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">
                  <p>Our team will review your registration and get in touch with you shortly.</p>
                  <p>If you have any questions, please don't hesitate to contact us.</p>
                  <p style="margin-top: 20px;">Best regards,<br>The Ganpati Mandal App Team</p>
                </div>
              </div>
            `
          }),
        });

        if (!response.ok) {
          console.warn('Email notification could not be sent, but registration was successful');
        } else {
          console.log('Email sent successfully');
        }
      } catch (emailError) {
        console.warn('Error sending email notification:', emailError);
        // Continue with registration even if email fails
      }
      
      // Complete registration
      onRegistrationComplete();
    } catch (error) {
      console.error('Error during registration:', error);
      // Show error message to user
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-saffron rounded-full flex items-center justify-center shadow-divine">
                  <Building2 className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Basic Information</h2>
              <p className="text-muted-foreground">Tell us about your mandal</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Mandal Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your mandal's full name"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="glass border-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="establishedYear" className="text-foreground font-medium">Established Year *</Label>
                  <Input
                    id="establishedYear"
                    type="number"
                    placeholder="1950"
                    value={formData.establishedYear}
                    onChange={(e) => updateFormData('establishedYear', e.target.value)}
                    className="glass border-primary/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-foreground font-medium">Contact Number *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.contactPhone}
                    onChange={(e) => updateFormData('contactPhone', e.target.value)}
                    className="glass border-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-foreground font-medium">Primary Contact Person *</Label>
                <Input
                  id="contactName"
                  placeholder="Contact person's full name"
                  value={formData.contactName}
                  onChange={(e) => updateFormData('contactName', e.target.value)}
                  className="glass border-primary/20"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center shadow-divine">
                  <MapPin className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Location Details</h2>
              <p className="text-muted-foreground">Where is your mandal located?</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-foreground font-medium">Area/Neighborhood *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Lalbaug, Parel, Mumbai"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="glass border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground font-medium">Complete Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter the complete address with landmarks"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  className="glass border-primary/20 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground font-medium">Mandal Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your mandal's history and significance"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="glass border-primary/20 min-h-[120px]"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-divine rounded-full flex items-center justify-center shadow-divine">
                  <Star className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Celebration Details</h2>
              <p className="text-muted-foreground">Tell us about your celebrations</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pandal_theme" className="text-foreground font-medium">This Year's Pandal Theme</Label>
                <Input
                  id="pandal_theme"
                  placeholder="e.g., Traditional, Eco-friendly, Historical, etc."
                  value={formData.pandal_theme}
                  onChange={(e) => updateFormData('pandal_theme', e.target.value)}
                  className="glass border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cultural_programs" className="text-foreground font-medium">Cultural Programs</Label>
                <Textarea
                  id="cultural_programs"
                  placeholder="List cultural programs, performances, and activities"
                  value={formData.cultural_programs}
                  onChange={(e) => updateFormData('cultural_programs', e.target.value)}
                  className="glass border-primary/20 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previous_awards" className="text-foreground font-medium">Awards & Recognition</Label>
                <Input
                  id="previous_awards"
                  placeholder="Any awards or recognition received"
                  value={formData.previous_awards}
                  onChange={(e) => updateFormData('previous_awards', e.target.value)}
                  className="glass border-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialties" className="text-foreground font-medium">Prasad Specialties</Label>
                <Input
                  id="specialties"
                  placeholder="e.g., Traditional Modak, Special Ladoo (comma separated)"
                  value={formData.specialties}
                  onChange={(e) => updateFormData('specialties', e.target.value)}
                  className="glass border-primary/20"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-saffron rounded-full flex items-center justify-center shadow-divine">
                  <Truck className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Services & Payment</h2>
              <p className="text-muted-foreground">Setup your services</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="upiId" className="text-foreground font-medium">UPI ID for Donations *</Label>
                <Input
                  id="upiId"
                  placeholder="your-mandal@upi"
                  value={formData.upiId}
                  onChange={(e) => updateFormData('upiId', e.target.value)}
                  className="glass border-primary/20"
                />
              </div>

              <Card className="glass border-primary/20 p-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="delivery"
                    checked={formData.deliveryAvailable}
                    onCheckedChange={(checked) => updateFormData('deliveryAvailable', checked as boolean)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="delivery" className="text-foreground font-medium cursor-pointer">
                      Offer Prasad Delivery Service
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow devotees to order prasad for home delivery
                    </p>
                  </div>
                </div>
              </Card>

              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Documents Required
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Mandal registration certificate</li>
                  <li>• Identity proof of contact person</li>
                  <li>• Address proof</li>
                  <li>• Bank account details</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Documents can be uploaded after initial registration approval
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 overflow-auto">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <GanpatiBappa size="lg" className="animate-glow-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-divine bg-clip-text text-transparent">
              Mandal Registration
            </h1>
            <GanpatiBappa size="lg" className="animate-glow-pulse" />
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  currentStep > i + 1 
                    ? 'bg-primary text-primary-foreground shadow-divine' 
                    : currentStep === i + 1
                    ? 'bg-gradient-saffron text-primary-foreground shadow-glow animate-pulse'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`w-8 h-0.5 mx-1 ${currentStep > i + 1 ? 'bg-primary' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>
          
          <Badge variant="outline" className="text-xs">
            Step {currentStep} of {totalSteps}
          </Badge>
        </motion.div>

        {/* Form Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass border-primary/20 shadow-divine p-6 md:p-8">
            {renderStep()}

            <Separator className="my-6" />

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 1 ? 'Back to Home' : 'Previous'}
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  variant="divine"
                  onClick={handleNext}
                  disabled={!formData.name || !formData.contactPhone}
                >
                  Continue
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              ) : (
                <Button
                  variant="mandal"
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.contactPhone || !formData.upiId}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Register Mandal
                </Button>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Help Card */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="glass border-secondary/20 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Need help with registration? Contact us at{' '}
              <span className="text-primary font-medium">support@bhakti-united.com</span>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};