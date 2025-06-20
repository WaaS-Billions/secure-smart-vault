
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const walletFormSchema = z.object({
  name: z.string().min(1, "Wallet name is required"),
});

type WalletFormValues = z.infer<typeof walletFormSchema>;

const CreateWallet = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  
  const form = useForm<WalletFormValues>({
    resolver: zodResolver(walletFormSchema),
    defaultValues: {
      name: "",
    },
  });
  
  const onSubmit = async (values: WalletFormValues) => {
    setIsCreating(true);
    
    try {
      console.log('Creating smart wallet on Base with values:', values);
      
      // Simulate smart contract deployment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockWalletAddress = "0x" + Math.random().toString(16).substring(2, 42);
      
      toast({
        title: "Smart Wallet Created Successfully",
        description: "Your new smart wallet is ready to use on Base chain.",
      });
      
      navigate(`/wallet/${mockWalletAddress}`);
    } catch (error) {
      console.error("Error creating wallet:", error);
      toast({
        title: "Failed to create wallet",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-slate-900">
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 text-gold">Create Smart Wallet</h1>
        
        <Card className="bg-white/5 backdrop-blur-sm border border-gold/20">
          <CardHeader>
            <CardTitle className="text-gold">Wallet Configuration</CardTitle>
            <CardDescription className="text-white/70">
              Set up your new smart wallet on Base chain.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Wallet Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="My Smart Wallet" 
                          {...field} 
                          className="bg-white/5 border-gold/20 text-white placeholder:text-white/50"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')}
                    className="border-gold text-gold hover:bg-gold/10"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isCreating}
                    className="bg-gold text-navy hover:bg-gold/90"
                  >
                    {isCreating ? 'Creating...' : 'Create Wallet'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateWallet;
