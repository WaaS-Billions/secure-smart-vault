
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import WalletTypeSelector from '@/components/wallet/WalletTypeSelector';
import MultiPartySettings from '@/components/wallet/MultiPartySettings';
import WalletNameInput from '@/components/wallet/WalletNameInput';
import WalletFormFooter from '@/components/wallet/WalletFormFooter';
import GoBackButton from '@/components/common/GoBackButton';

// Define form schema
const walletFormSchema = z.object({
  name: z.string().min(1, "Wallet name is required"),
  type: z.enum(["personal", "multisig"]),
  threshold: z.number().min(1).optional(),
  signers: z.array(z.object({
    address: z.string().min(42, "Invalid address").max(42),
    name: z.string().min(1, "Name is required"),
  })).optional(),
});

type WalletFormValues = z.infer<typeof walletFormSchema>;

const CreateWallet = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  
  // Initialize form
  const form = useForm<WalletFormValues>({
    resolver: zodResolver(walletFormSchema),
    defaultValues: {
      name: "",
      type: "personal",
      threshold: 1,
      signers: [{ address: "", name: "" }],
    },
  });

  const walletType = form.watch("type");
  
  const onSubmit = async (values: WalletFormValues) => {
    setIsCreating(true);
    
    try {
      // Simulate API call to create wallet
      console.log('Creating wallet on Sepolia testnet with values:', values);
      
      // Mock successful response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockWalletAddress = "0x" + Math.random().toString(16).substring(2, 42);
      
      toast({
        title: "Wallet created successfully",
        description: "Your new wallet is ready to use.",
      });
      
      // Redirect to wallet details page
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
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <GoBackButton />
      </div>
      
      <h1 className="text-3xl font-bold mb-8 text-gold">Create New Wallet</h1>
      
      <Card className="glass-form">
        <CardHeader>
          <CardTitle className="text-navy">Wallet Configuration</CardTitle>
          <CardDescription>
            Set up your new smart wallet with your preferred security model.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <WalletNameInput control={form.control} />
              
              <WalletTypeSelector control={form.control} />
              
              {walletType === "multisig" && (
                <MultiPartySettings 
                  control={form.control}
                  setValue={form.setValue}
                  watch={form.watch}
                />
              )}
              
              <WalletFormFooter isSubmitting={isCreating} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateWallet;
