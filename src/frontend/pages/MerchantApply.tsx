
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import GoBackButton from '@/components/common/GoBackButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const MerchantApply = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    website: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    expectedVolume: '',
    description: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you'd typically make an API call to submit the merchant application
      console.log('Submitting merchant application:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Application Submitted",
        description: "We'll review your application and get back to you soon.",
      });
      
      navigate('/application-submitted');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6">
        <GoBackButton />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gold">Merchant Application</h1>
        <p className="text-xl mb-8 text-white/90">
          Complete the form below to apply for a merchant account
        </p>
        
        <Card className="glass-form">
          <CardHeader>
            <CardTitle className="text-navy">Business Information</CardTitle>
            <CardDescription>
              Tell us about your business so we can customize the right solution for you.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input 
                    id="businessName" 
                    name="businessName" 
                    value={formData.businessName} 
                    onChange={handleChange} 
                    required 
                    placeholder="Your business name" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select 
                    name="businessType"
                    onValueChange={(value) => handleSelectChange('businessType', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS / Software</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="service">Service Provider</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website *</Label>
                <Input 
                  id="website" 
                  name="website" 
                  type="url" 
                  value={formData.website} 
                  onChange={handleChange} 
                  required 
                  placeholder="https://your-business.com" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input 
                    id="contactName" 
                    name="contactName" 
                    value={formData.contactName} 
                    onChange={handleChange} 
                    required 
                    placeholder="Full name" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="your-email@example.com" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    placeholder="+1 123 456 7890" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select 
                    name="country"
                    onValueChange={(value) => handleSelectChange('country', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="gb">United Kingdom</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expectedVolume">Expected Monthly Volume *</Label>
                <Select 
                  name="expectedVolume"
                  onValueChange={(value) => handleSelectChange('expectedVolume', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select expected volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<10k">Less than $10,000</SelectItem>
                    <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                    <SelectItem value=">500k">More than $500,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Business Description *</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  required 
                  placeholder="Tell us about your business and how you plan to use our services" 
                  className="min-h-[120px]" 
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <div className="flex justify-end space-x-4 w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-gold text-gold hover:bg-gold/10"
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gold text-navy hover:bg-gold/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default MerchantApply;
